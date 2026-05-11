'use client';

import { type ModelProvider } from '@/lib/types';

const models: { value: ModelProvider; label: string }[] = [
  { value: 'bailian', label: '阿里百炼' },
  { value: 'ollama', label: 'Ollama 本地' },
];

interface ModelSelectorProps {
  value: ModelProvider;
  onChange: (value: ModelProvider) => void;
}

export default function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ModelProvider)}
      className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm text-white outline-none focus:border-zinc-500"
    >
      {models.map((m) => (
        <option key={m.value} value={m.value}>
          {m.label}
        </option>
      ))}
    </select>
  );
}
