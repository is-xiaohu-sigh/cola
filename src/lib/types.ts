export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export type ModelProvider = 'bailian' | 'ollama';
