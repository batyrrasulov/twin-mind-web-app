
// src/pages/meeting.tsx by rasulov

// the whole thing started from here

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../components/AuthGuard';
import AudioRecorder from '../components/AudioRecorder';
import TranscriptionView from '../components/TranscriptionView';
import ChatInterface from '../components/ChatInterface';
import ErrorToast from '../components/ErrorToast';
import { TranscriptionChunk, ChatMessage } from '../types';
import { mockCalendarEvents, mockSummary } from '../utils/mockData';

const MeetingPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [meetingTitle, setMeetingTitle] = useState('');
  const [transcriptionChunks, setTranscriptionChunks] = useState<TranscriptionChunk[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMeetingEnded, setIsMeetingEnded] = useState(false);

  // Load meeting data
  useEffect(() => {
    if (id) {
      // In a real app, fetch meeting details from API
      const meeting = mockCalendarEvents.find(event => event.id === id);
      if (meeting) {
        setMeetingTitle(meeting.title);
      }
    }
  }, [id]);

  // Handle new transcription chunk
  const handleTranscriptionUpdate = (chunk: TranscriptionChunk) => {
    setTranscriptionChunks(prev => [...prev, chunk]);
    
    // In a real app, save to backend
    // saveTranscriptionToBackend(chunk);
  };

  // Handle new chat message
  const handleNewChatMessage = (message: ChatMessage) => {
    setChatMessages(prev => [...prev, message]);
    
    // In a real app, save to backend
    // saveChatMessageToBackend(message);
  };

  // Handle ending the meeting
  const handleEndMeeting = () => {
    // In a real app, this would trigger summary generation API call
    setIsMeetingEnded(true);
    
    // Save current state to localStorage for persistence between pages
    localStorage.setItem('meetingTranscript', JSON.stringify(transcriptionChunks));
    localStorage.setItem('meetingChat', JSON.stringify(chatMessages));
    
    // Navigate to summary page
    router.push('/summary');
  };

  return (
    <AuthGuard>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">{meetingTitle || 'Meeting'}</h1>
            <p className="text-text-secondary">Recording and transcribing in real-time</p>
          </div>
          
          <button 
            onClick={handleEndMeeting}
            className="btn bg-red-500 text-white hover:bg-opacity-90"
          >
            End Meeting
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <AudioRecorder
              onTranscriptionUpdate={handleTranscriptionUpdate}
              onError={setError}
            />
            
            <TranscriptionView chunks={transcriptionChunks} />
          </div>
          
          <div>
            <ChatInterface
              transcription={transcriptionChunks}
              onNewMessage={handleNewChatMessage}
              messages={chatMessages}
            />
          </div>
        </div>
        
        {error && (
          <ErrorToast 
            message={error} 
            onClose={() => setError(null)} 
          />
        )}
      </div>
    </AuthGuard>
  );
};

export default MeetingPage;