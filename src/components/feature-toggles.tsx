'use client';

import { type ChatOptions } from '@/lib/types';

interface FeatureTogglesProps {
  options: ChatOptions;
  onChange: (options: ChatOptions) => void;
}

export default function FeatureToggles({ options, onChange }: FeatureTogglesProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onChange({ ...options, webSearch: !options.webSearch })}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
          options.webSearch
            ? 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
            : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700 hover:text-zinc-300'
        }`}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        联网搜索
      </button>

      <button
        onClick={() => onChange({ ...options, deepThink: !options.deepThink })}
        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
          options.deepThink
            ? 'bg-purple-500/20 text-purple-400 ring-1 ring-purple-500/30'
            : 'bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700 hover:text-zinc-300'
        }`}
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        深度思考
      </button>
    </div>
  );
}
