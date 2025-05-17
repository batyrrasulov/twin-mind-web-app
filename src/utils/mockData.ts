
// src/utils/mockData.ts by rasulov

// u know that this has been reworked but still good

import { Meeting, TranscriptionChunk, ChatMessage, Summary } from '../types';

// Mock calendar events
export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Product Strategy Meeting',
    date: '2023-11-20T14:00:00.000Z',
    attendees: ['john@example.com', 'sarah@example.com', 'mike@example.com']
  },
  {
    id: '2',
    title: 'Design Review',
    date: '2023-11-21T10:00:00.000Z',
    attendees: ['design@example.com', 'product@example.com']
  },
  {
    id: '3',
    title: 'Sprint Planning',
    date: '2023-11-22T15:30:00.000Z',
    attendees: ['team@example.com']
  }
];

// Mock transcription chunks
export const mockTranscriptionChunks: TranscriptionChunk[] = [
  {
    id: '1',
    text: "Hello everyone, thanks for joining today's product strategy meeting. We'll be discussing the roadmap for Q1 2024.",
    timestamp: Date.now() - 60000
  },
  {
    id: '2',
    text: "Let's start by reviewing our progress from last quarter. We successfully launched the new dashboard interface which has received positive feedback from users.",
    timestamp: Date.now() - 30000
  },
  {
    id: '3',
    text: "For Q1, we're planning to implement the chat feature that's been highly requested. We need to decide on the tech stack and timeline.",
    timestamp: Date.now()
  }
];

// Mock chat responses
export const mockChatResponses: { [key: string]: string } = {
  "what were the key points": "The key points discussed were: 1) Review of Q4 achievements, including the dashboard launch, 2) Planning for Q1 2024 with focus on implementing a new chat feature, 3) Need to decide on tech stack and timeline for the chat feature implementation.",
  "who is responsible": "Based on the transcript, specific responsibilities weren't explicitly assigned yet. The discussion was primarily about planning the chat feature implementation, but the team still needs to decide on roles and responsibilities.",
  "summarize the meeting": "This was a product strategy meeting focusing on Q1 2024 planning. The team reviewed last quarter's successful dashboard launch and is now planning to implement a chat feature that customers have been requesting. They need to make decisions about technology stack and project timeline.",
  "action items": "The action items from this meeting appear to be: 1) Decide on the tech stack for the chat feature, 2) Create a timeline for the Q1 chat feature implementation, 3) Potentially assign team responsibilities for the project."
};

// Function to generate streaming response
export function mockStreamingResponse(query: string): string[] {
  // Find the closest matching response or default to generic
  const bestMatch = Object.keys(mockChatResponses).find(key => 
    query.toLowerCase().includes(key.toLowerCase())
  ) || "summarize the meeting";
  
  const response = mockChatResponses[bestMatch];
  
  // Split the response into word chunks to simulate streaming
  return response.split(' ');
}

// Mock meeting summary
export const mockSummary: Summary = {
  keyPoints: [
    "Reviewed Q4 achievements including successful dashboard launch",
    "Planning to implement chat feature in Q1 2024",
    "Need to decide on tech stack and implementation timeline",
    "Chat feature has been highly requested by users"
  ],
  actionItems: [
    "Select tech stack for chat feature",
    "Create implementation timeline",
    "Assign team responsibilities",
    "Schedule follow-up meeting to track progress"
  ],
  decisions: [
    "Focus Q1 efforts on chat feature implementation",
    "Use user feedback to prioritize feature enhancements"
  ],
  highlights: [
    "Dashboard launch received positive user feedback",
    "Chat feature is the highest priority for Q1"
  ]
};