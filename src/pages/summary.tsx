
// src/pages/summary.tsx by rasulov

// this was not intended to be like this

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthGuard from '../components/AuthGuard';
import SummaryView from '../components/SummaryView';
import TranscriptionView from '../components/TranscriptionView';
import ErrorToast from '../components/ErrorToast';
import { TranscriptionChunk, Summary } from '../types';
import { mockSummary } from '../utils/mockData';

const SummaryPage: React.FC = () => {
  const [transcriptionChunks, setTranscriptionChunks] = useState<TranscriptionChunk[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load transcription from localStorage (in a real app, would fetch from backend)
    const savedTranscript = localStorage.getItem('meetingTranscript');
    if (savedTranscript) {
      try {
        setTranscriptionChunks(JSON.parse(savedTranscript));
      } catch (err) {
        console.error('Error parsing saved transcript:', err);
        setError('Failed to load meeting transcript');
      }
    }
    
    // Simulate API call to generate summary
    setTimeout(() => {
      setSummary(mockSummary);
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <AuthGuard>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Meeting Summary</h1>
            <p className="text-text-secondary">AI-generated summary and transcript</p>
          </div>
          
          <Link href="/" className="btn btn-outline">
            Back to Dashboard
          </Link>
        </div>
        
        {isLoading ? (
          <div className="card py-12 flex justify-center items-center">
            <div className="loader"></div>
            <span className="ml-3 text-text-secondary">Generating summary...</span>
          </div>
        ) : (
          <>
            {summary && <SummaryView summary={summary} />}
            
            <div className="mt-8">
              <h2 className="text-xl font-medium mb-4">Full Transcript</h2>
              <TranscriptionView chunks={transcriptionChunks} />
            </div>
          </>
        )}
        
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

export default SummaryPage;