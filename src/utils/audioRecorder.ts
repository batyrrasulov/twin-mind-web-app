// src/utils/audioRecorder.ts
import { v4 as uuidv4 } from 'uuid';

export class AudioRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private chunkInterval: number = 30000; // 30 seconds
  private timer: NodeJS.Timeout | null = null;
  private onChunkCallback: (blob: Blob) => void;

  constructor(onChunkCallback: (blob: Blob) => void) {
    this.onChunkCallback = onChunkCallback;
  }

  async start(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
          const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
          this.onChunkCallback(blob);
          // Clear chunks for next interval
          this.audioChunks = [];
        }
      };
      
      this.mediaRecorder.start();
      
      // Set up interval to stop and restart recorder every 30 seconds
      this.timer = setInterval(() => {
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
          this.mediaRecorder.stop();
          this.mediaRecorder.start();
        }
      }, this.chunkInterval);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    this.mediaRecorder = null;
  }

  isRecording(): boolean {
    return !!this.mediaRecorder && this.mediaRecorder.state === 'recording';
  }
}

// Mock functions for handling transcription
export async function mockTranscribeAudio(blob: Blob): Promise<string> {
  // In a real app, this would send the audio to a transcription service
  // For MVP, we'll return mock transcriptions
  
  const mockTranscriptions = [
    "Let's discuss the new feature requirements for the mobile app.",
    "I think we should prioritize the user authentication flow first.",
    "The dashboard needs to show real-time analytics data.",
    "We need to ensure the app works well on both iOS and Android platforms.",
    "Testing should begin by next week to meet our deadline.",
    "The design team has provided new mockups for the landing page.",
    "We should schedule a follow-up meeting to review progress."
  ];
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a random transcription
  return mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
}