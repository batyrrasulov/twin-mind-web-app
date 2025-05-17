// src/pages/api/transcribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  transcription?: string;
  error?: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  // In a real implementation, this would:
  // 1. Receive audio data
  // 2. Send to OpenAI Whisper or Google Speech-to-Text API
  // 3. Return transcription result

  // For MVP, we'll return mock transcriptions
  const mockTranscriptions = [
    "Let's move on to the next agenda item regarding the product roadmap.",
    "I think we should prioritize the mobile features in the upcoming sprint.",
    "The data from our user testing shows that the new interface is more intuitive.",
    "We need to address the performance issues before the next release.",
    "Does anyone have questions about the implementation timeline?",
    "The design team will provide updated mockups by the end of the week.",
    "Let's schedule a follow-up meeting to review progress next Tuesday."
  ];

  // Simulate API processing time
  setTimeout(() => {
    // Randomly select a transcription
    const randomIndex = Math.floor(Math.random() * mockTranscriptions.length);
    const transcription = mockTranscriptions[randomIndex];
    
    res.status(200).json({ 
      success: true,
      transcription
    });
  }, 1000); // Simulate 1 second processing time
}