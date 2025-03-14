import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

// Cleanup function to format AI response properly
function cleanContent(content: string) {
  return content
    .replace(/\*\*/g, '') // Remove bold markdown (**)
    .replace(/(?:^|\n)\s*-\s*/g, ' ') // Remove list dashes (-) and newlines
    .replace(/(?:^|\n)\s*\*\s*/g, ' ') // Remove bullet points (*)
    .replace(/\n+/g, ' ') // Convert multiple newlines into spaces
    .trim(); // Trim extra spaces
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div className={`flex gap-4 p-4 ${isBot ? 'bg-gray-50' : ''}`}>
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-500 mb-1">
          {isBot ? 'AI Assistant' : 'You'}
        </div>
        <p className="prose prose-sm max-w-none">
          {cleanContent(message.content)}
        </p>
      </div>
    </div>
  );
}
