// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatRequest = {
  messages: ChatMessage[];
  transcription?: string;
};

type ChatResponse = {
  reply: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, transcription } = req.body as ChatRequest;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    // For MVP, we'll use a simple mock response system
    // In a real implementation, this would call an AI service like OpenAI
    
    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    
    // Generate mock response based on input
    let reply = '';
    
    if (transcription) {
      // If there's a transcription, generate a response about the audio
      reply = `I've analyzed the audio transcription: "${transcription.substring(0, 50)}${transcription.length > 50 ? '...' : ''}". ` + 
              `Based on this, I would recommend focusing on improving your pronunciation of key terms.`;
    } else if (lastUserMessage) {
      // Generate a response based on the last user message
      const content = lastUserMessage.content.toLowerCase();
      
      if (content.includes('hello') || content.includes('hi')) {
        reply = 'Hello! How can I help you with your language learning today?';
      } else if (content.includes('help')) {
        reply = 'I can help you practice conversations, correct your grammar, or explain language concepts. What would you like to work on?';
      } else if (content.includes('grammar') || content.includes('correct')) {
        reply = 'I noticed a few grammar points we could work on. Let\'s focus on verb tenses in your sentences.';
      } else if (content.includes('vocabulary')) {
        reply = 'To expand your vocabulary, let\'s practice synonyms for common words you used. For example, instead of "good" you could use "excellent" or "wonderful".';
      } else {
        reply = 'That\'s an interesting point! Let\'s explore this topic further. Can you tell me more about what you\'re trying to learn?';
      }
    } else {
      reply = 'Hello! How can I assist with your language learning today?';
    }

    // In a real implementation, we would:
    // 1. Send the messages to an AI service
    // 2. Stream the response back to the client
    // 3. Handle rate limiting, errors, etc.

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Failed to process chat request' });
  }
}