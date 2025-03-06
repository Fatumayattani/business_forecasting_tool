import React, { useState } from 'react';
import { Message } from './types';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Header } from './components/Header';
import { generateResponse } from './lib/gemini';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI business forecasting assistant. I can help you with financial insights, market trends, and business predictions. What would you like to know?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // State to store error messages

  const handleSendMessage = async (content: string) => {
    if (isLoading) return; // Prevent multiple requests at once

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const aiResponse = await fetchWithRetry(content); // Call function with retry logic

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to retry API calls when hitting rate limits
  const fetchWithRetry = async (content: string, retries = 3, delay = 3000): Promise<string> => {
    for (let i = 0; i < retries; i++) {
      try {
        return await generateResponse(content);
      } catch (error: any) {
        if (error.message.includes('429') && i < retries - 1) {
          console.warn(`Rate limit exceeded. Retrying in ${delay / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw new Error('API quota exceeded. Please try again later.');
        }
      }
    }
    throw new Error('Failed to get response from AI.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="p-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200" />
              </div>
            )}
            {error && (
              <div className="p-4 text-red-500 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>
        </div>
      </main>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}

export default App;
