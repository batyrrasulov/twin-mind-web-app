
// src/components/TranscriptionView.tsx by rasulov

import React from 'react';
import { TranscriptionChunk } from '../types';

interface TranscriptionViewProps {
  chunks: TranscriptionChunk[];
}

const TranscriptionView: React.FC<TranscriptionViewProps> = ({ chunks }) => {
  // format timestamp
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card my-4">
      <h3 className="font-medium text-lg mb-4">Live Transcription</h3>
      
      <div className="border rounded-md bg-gray-50 p-4 max-h-80 overflow-y-auto">
        {chunks.length === 0 ? (
          // no transcription chunks? => show sum msg
          <p className="text-text-secondary text-center py-8">
            Recording will appear here. Start recording to begin transcription.
          </p>
        ) : (
          <div className="space-y-4">
            {chunks.map((chunk) => (
              <div key={chunk.id} className="pb-3 border-b border-gray-200 last:border-0">
                <div className="text-sm text-gray-500 mb-1">
                  {formatTime(chunk.timestamp)}
                </div>
                <p>{chunk.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionView;