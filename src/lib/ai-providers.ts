export type AIProvider = 'bailian' | 'ollama';

export interface AIModelConfig {
  provider: AIProvider;
  model: string;
  apiKey?: string;
  baseUrl: string;
}

export const providers: Record<AIProvider, AIModelConfig> = {
  bailian: {
    provider: 'bailian',
    model: process.env.BAILIAN_MODEL || 'glm-5',
    apiKey: process.env.BAILIAN_API_KEY,
    baseUrl: process.env.BAILIAN_BASE_URL || 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  },
  ollama: {
    provider: 'ollama',
    model: process.env.OLLAMA_MODEL || 'llama3.2',
    baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
  },
};

export function getModelConfig(provider: AIProvider): AIModelConfig {
  return providers[provider];
}
