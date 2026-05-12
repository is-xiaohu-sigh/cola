import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToModelMessages, wrapLanguageModel, extractReasoningMiddleware } from 'ai';
import { getModelConfig, type AIProvider } from '@/lib/ai-providers';

export async function POST(req: Request) {
  const parsed = await req.json();
  console.log('[DEBUG] Request keys:', Object.keys(parsed).join(', '));
  const { messages, provider: providerName = 'bailian', deepThink = false, webSearch = false } = parsed;
  const config = getModelConfig(providerName as AIProvider);

  // Intercept raw SSE response to extract reasoning_content and inject as thinking tags.
  // The SDK's zod schema strips delta.reasoning_content, so we capture it from the raw
  // stream and inject it into delta.content as <think>...</think> tags,
  // then use extractReasoningMiddleware to convert them to reasoning parts.
  const fetchWithReasoning: typeof fetch = async (url, init) => {
    if (init?.body) {
      try {
        const body = JSON.parse(init.body as string);
        body.enable_thinking = !!deepThink;
        if (deepThink && webSearch) {
          body.tools = [
            ...(body.tools || []),
            { type: 'web_search' },
            { type: 'web_extractor' },
          ];
        }
        console.log('[DEBUG] Request body enable_thinking:', body.enable_thinking, 'model:', body.model);
        if (body.tools) console.log('[DEBUG] Request tools:', JSON.stringify(body.tools));
        init.body = JSON.stringify(body);
      } catch { /* skip non-JSON */ }
    }

    const response = await fetch(url, init);
    if (!deepThink || !response.body) return response;

    // JSON-string escape helper for injecting into JSON values
    function jsonEscape(s: string): string {
      return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
        .replace(/\n/g, '\\n').replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
    }

    let reasoningAccumulated = '';
    let reasoningInjected = false;
    let buffer = '';
    let chunkCount = 0;
    let hasReasoning = false;

    const transform = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        // Debug: log raw SSE chunk
        if (text.includes('reasoning_content')) {
          hasReasoning = true;
          console.log('[DEBUG] Found reasoning_content in SSE chunk');
        }
        buffer += text;
        chunkCount++;
        if (chunkCount <= 5) {
          console.log('[DEBUG] SSE chunk', chunkCount, ':', text.slice(0, 300));
        }
        let lineEnd = buffer.indexOf('\n');
        let remaining = '';

        while (lineEnd !== -1) {
          let line = buffer.slice(0, lineEnd);
          buffer = buffer.slice(lineEnd + 1);

          // Check for data line with reasoning_content
          if (line.startsWith('data:') && line.length > 5) {
            const jsonStr = line.slice(5).trimStart();
            if (jsonStr.startsWith('{')) {
              try {
                const data = JSON.parse(jsonStr);
                const delta = data.choices?.[0]?.delta;
                if (delta?.reasoning_content) {
                  reasoningAccumulated += delta.reasoning_content;
                  // Remove reasoning_content from the response to prevent SDK confusion
                  delete delta.reasoning_content;
                  line = `data:${JSON.stringify(data)}`;
                }
                // Inject accumulated reasoning into first content chunk
                if (!reasoningInjected && reasoningAccumulated && delta?.content) {
                  delta.content = `<think>${reasoningAccumulated}</think>${delta.content}`;
                  reasoningInjected = true;
                  line = `data:${JSON.stringify(data)}`;
                }
              } catch { /* not valid JSON, pass through */ }
            }
          }

          remaining += line + '\n';
          lineEnd = buffer.indexOf('\n');
        }

        if (remaining) controller.enqueue(new TextEncoder().encode(remaining));
      },
      flush(controller) {
        console.log('[DEBUG] reasoningAccumulated length:', reasoningAccumulated.length, 'hasReasoning:', hasReasoning, 'reasoningInjected:', reasoningInjected);
        if (reasoningAccumulated.length > 0) {
          console.log('[DEBUG] reasoningAccumulated sample:', reasoningAccumulated.slice(0, 100));
        }
        if (buffer) {
          let line = buffer;
          if (line.startsWith('data:') && line.length > 5) {
            const jsonStr = line.slice(5).trimStart();
            if (jsonStr.startsWith('{')) {
              try {
                const data = JSON.parse(jsonStr);
                const delta = data.choices?.[0]?.delta;
                if (delta?.reasoning_content) {
                  reasoningAccumulated += delta.reasoning_content;
                  delete delta.reasoning_content;
                  line = `data:${JSON.stringify(data)}`;
                }
                if (!reasoningInjected && reasoningAccumulated && delta?.content) {
                  delta.content = `<think>${reasoningAccumulated}</think>${delta.content}`;
                  reasoningInjected = true;
                  line = `data:${JSON.stringify(data)}`;
                }
              } catch { /* pass through */ }
            }
          }
          controller.enqueue(new TextEncoder().encode(line));
        }
      },
    });

    return new Response(response.body.pipeThrough(transform), {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  };

  const provider = createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
    fetch: fetchWithReasoning,
  });

  let model = provider(config.model);
  if (deepThink) {
    model = wrapLanguageModel({
      model,
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    });
  }

  const systemParts: string[] = [];
  if (webSearch) systemParts.push('请结合联网搜索的结果来回答问题。');
  const system = systemParts.length > 0 ? systemParts.join('\n') : undefined;

  const coreMessages = await convertToModelMessages(messages);

  const result = streamText({
    model,
    system,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}
