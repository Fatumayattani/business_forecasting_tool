import { GoogleGenerativeAI } from '@google/generative-ai';

// Use Vite's environment variable system
const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  throw new Error('Missing VITE_GOOGLE_GENAI_API_KEY in .env file');
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function generateResponse(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return 'I apologize, but I encountered an error processing your request. Please try again.';
  }
}
