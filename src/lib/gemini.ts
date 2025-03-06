import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error('VITE_GOOGLE_GENAI_API_KEY in .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

interface GenerateResponseOptions {
  prompt: string;
  onMessageChunk?: (message: string) => void;
}

export async function generateResponse({ prompt, onMessageChunk }: GenerateResponseOptions): Promise<void> {
  try {
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result) {
      const text = chunk.text();
      if (onMessageChunk) {
        onMessageChunk(text);
      }
    }
  } catch (error) {
    console.error('Error generating response:', error);
    if (onMessageChunk) {
      onMessageChunk('I apologize, but I encountered an error processing your request. Please try again.');
    }
  }
}
