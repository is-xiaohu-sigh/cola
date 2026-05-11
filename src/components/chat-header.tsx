'use client';

import ModelSelector from './model-selector';
import { type ModelProvider } from '@/lib/types';

interface ChatHeaderProps {
  provider: ModelProvider;
  onProviderChange: (value: ModelProvider) => void;
}

export default function ChatHeader({ provider, onProviderChange }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-3">
      <h1 className="text-lg font-semibold text-white">AI 对话</h1>
      <ModelSelector value={provider} onChange={onProviderChange} />
    </div>
  );
}
