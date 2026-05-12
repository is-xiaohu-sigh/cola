import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  reasoning?: string;
}

export default function ChatMessage({ role, content, reasoning }: ChatMessageProps) {
  if (role === 'system') return null;

  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          role === 'user'
            ? 'bg-white text-zinc-900'
            : 'bg-zinc-800 text-zinc-100'
        }`}
      >
        {role === 'assistant' ? (
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{content}</p>
        )}
      </div>
    </div>
  );
}
