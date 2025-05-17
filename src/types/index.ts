// src/types/index.ts

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export interface TranscriptionChunk {
  id: string;
  text: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  transcription: TranscriptionChunk[];
  summary?: Summary;
  chat: ChatMessage[];
}

export interface Summary {
  keyPoints: string[];
  actionItems: string[];
  decisions: string[];
  highlights: string[];
}