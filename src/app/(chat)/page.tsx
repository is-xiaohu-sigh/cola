'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import ChatMessage from '@/components/chat-message';
import ChatInput from '@/components/chat-input';
import ChatHeader from '@/components/chat-header';
import { type ModelProvider } from '@/lib/types';

export default function ChatPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [provider, setProvider] = useState<ModelProvider>('bailian');

  const transport = new DefaultChatTransport({
    api: '/api/chat',
    body: { provider },
  });

  const { messages, sendMessage, status: chatStatus, setMessages } =
    useChat({ transport });

  const isLoading = chatStatus === 'streaming' || chatStatus === 'submitted';

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (text: string) => {
    sendMessage({ text });
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950">
      <ChatHeader
        provider={provider}
        onProviderChange={(newProvider) => {
          setProvider(newProvider);
          setMessages([]);
        }}
      />
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-zinc-500">
              {provider === 'bailian' ? '阿里百炼' : 'Ollama 本地'}模型已就绪，开始对话吧
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl">
            {messages.map((msg) => {
              const text = msg.parts
                .filter((p) => p.type === 'text')
                .map((p) => (p as { text: string }).text)
                .join('');
              return (
                <ChatMessage key={msg.id} role={msg.role} content={text} />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
}
