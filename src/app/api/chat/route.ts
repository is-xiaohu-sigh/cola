import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { getModelConfig, type AIProvider } from '@/lib/ai-providers';

export async function POST(req: Request) {
  const { messages, provider: providerName = 'bailian' } = await req.json();
  const config = getModelConfig(providerName as AIProvider);

  const provider = createOpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
  });

  const result = streamText({
    model: provider(config.model),
    messages: messages.map((message: any) => {
      console.debug({
        role: message.role,
        content: message.parts[0].text,
      });
      return {
        role: message.role,
        content: message.parts[0].text,
      }
    }),
  });

  return result.toUIMessageStreamResponse();
}
