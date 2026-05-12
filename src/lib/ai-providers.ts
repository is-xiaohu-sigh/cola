export type AIProvider = 'bailian' | 'ollama';

const envMap: Record<AIProvider, { prefix: string; defaultModel: string }> = {
  bailian: { prefix: 'BAILIAN', defaultModel: 'glm-5' },
  ollama: { prefix: 'OLLAMA', defaultModel: 'llama3.2' },
};

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
  apiKey?: string;
  baseUrl: string;
}

export function getModelConfig(provider: AIProvider): AIModelConfig {
  const { prefix, defaultModel } = envMap[provider];
  return {
    provider,
    model: process.env[`${prefix}_MODEL`] || defaultModel,
    apiKey: process.env[`${prefix}_API_KEY`],
    baseUrl: process.env[`${prefix}_BASE_URL`]!,
  };
}
