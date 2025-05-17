
// src/components/AudioRecorder.tsx by rasulov

import React, { useState, useEffect, useCallback } from 'react';
import { AudioRecorder as AudioRecorderUtil, mockTranscribeAudio } from '../utils/audioRecorder';
import { TranscriptionChunk } from '../types';

interface AudioRecorderProps {
  onTranscriptionUpdate: (chunk: TranscriptionChunk) => void;
  onError: (message: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ 
  onTranscriptionUpdate,
  onError
}) => {

  // are we currently recording (track it)
  const [isRecording, setIsRecording] = useState(false);

  // store reorder instance so we can start/stop anytime
  const [recorder, setRecorder] = useState<AudioRecorderUtil | null>(null);

  // keep track of how long we been recording
  const [elapsedTime, setElapsedTime] = useState(0);

  // use to show if we recording processing or idle
  const [recordingState, setRecordingState] = useState<'inactive' | 'recording' | 'processing'>('inactive');
  
  // whenever audio chunk come in => transcribe & update parent
  const handleAudioChunk = useCallback(async (blob: Blob) => {
    try {
      setRecordingState('processing');

      // for real time app we would send DIS BLOB to API for transcription
      const transcription = await mockTranscribeAudio(blob);
      
      // build a chunk object to send up
      const chunk: TranscriptionChunk = {
        id: Date.now().toString(),
        text: transcription,
        timestamp: Date.now()
      };
      
      onTranscriptionUpdate(chunk);
      setRecordingState('recording');
    } catch (error) {
      console.error('Transcription error:', error);
      onError('Failed to transcribe audio. Please try again.');
      setRecordingState('recording');
    }
  }, [onTranscriptionUpdate, onError]);
  
  // start recording audio
  const startRecording = async () => {
    try {

      // create new recorder & start it (auto)
      const newRecorder = new AudioRecorderUtil(handleAudioChunk);
      await newRecorder.start();
      setRecorder(newRecorder);
      setIsRecording(true);
      setRecordingState('recording');
      setElapsedTime(0);
    } catch (error) {
      console.error('Failed to start recording:', error);
      onError('Failed to access microphone. Please check browser permissions.');
    }
  };
  
  // stop recording audip
  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      setRecorder(null);
      setIsRecording(false);
      setRecordingState('inactive');
    }
  };
  
  // keep a time while recording
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRecording) {
      interval = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);
  
  // formatting (mm:ss referenced by for display)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  return (
    <div className="card my-4">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h3 className="font-medium text-lg">Meeting Audio</h3>
          {isRecording && (
            <div className="text-text-secondary mt-1">
              Recording: {formatTime(elapsedTime)}
              {recordingState === 'processing' && (
                <span className="ml-2 text-primary animate-pulse">
                  Processing...
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          {/* show tha right btn depending on what we doing*/}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="btn btn-primary flex items-center"
            >
              <span className="mr-2">●</span> Start Recording
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="btn bg-red-500 text-white hover:bg-opacity-90 flex items-center"
            >
              <span className="mr-2">■</span> Stop Recording
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;