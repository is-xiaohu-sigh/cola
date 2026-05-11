'use client';

import { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-end gap-2 p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="输入消息... (Shift+Enter 换行)"
        rows={1}
        className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 outline-none focus:border-zinc-500"
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !input.trim()}
        className="rounded-xl bg-white px-4 py-2.5 font-medium text-zinc-900 transition enabled:hover:bg-zinc-200 disabled:opacity-40"
      >
        {isLoading ? (
          <span className="inline-block animate-pulse">发送中...</span>
        ) : (
          '发送'
        )}
      </button>
    </div>
  );
}
