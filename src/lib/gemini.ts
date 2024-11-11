import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyD18TAcRg-FDj6uQHVzFM7I6Oru4h7F1oQ');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

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