'use client';

import { useState } from 'react';

interface DeepThinkingIndicatorProps {
  reasoning: string;
}

export default function DeepThinkingIndicator({ reasoning }: DeepThinkingIndicatorProps) {
  const [collapsed, setCollapsed] = useState(false);

  if (!reasoning) return null;

  return (
    <div className="mx-auto max-w-3xl px-4">
      <div className="mb-2 rounded-xl border border-purple-500/20 bg-purple-500/5">
        {/* Header */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-between px-4 py-2 text-xs text-purple-400 hover:bg-purple-500/10 transition"
        >
          <div className="flex items-center gap-2">
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
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="font-medium">深度思考</span>
          </div>
          <svg
            className={`h-4 w-4 transition-transform ${collapsed ? '-rotate-90' : 'rotate-0'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Collapsible content */}
        {!collapsed && (
          <div className="border-t border-purple-500/10 px-4 py-3">
            <div className="font-mono text-xs text-purple-300/80 whitespace-pre-wrap">
              {reasoning}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
