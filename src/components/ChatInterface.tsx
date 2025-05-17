// src/components/ChatInterface.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, TranscriptionChunk } from '../types';
import { mockStreamingResponse } from '../utils/mockData';

interface ChatInterfaceProps {
  transcription: TranscriptionChunk[];
  onNewMessage: (message: ChatMessage) => void;
  messages: ChatMessage[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  transcription, 
  onNewMessage,
  messages
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [typingIndicator, setTypingIndicator] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  const simulateTyping = async (text: string) => {
    setTypingIndicator(true);
    let currentText = '';
    
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 20)); // Adjust speed here
      currentText += text[i];
      setStreamingText(currentText);
    }
    
    setTypingIndicator(false);
    return currentText;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isGenerating) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: Date.now()
    };
    
    onNewMessage(userMessage);
    setInputValue('');
    
    // Start AI response generation
    setIsGenerating(true);
    setStreamingText('');
    
    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get streaming response
    const responseText = mockStreamingResponse(inputValue).join(' ');
    
    // Simulate typing the response
    const fullResponse = await simulateTyping(responseText);
    
    // Add final AI message
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: fullResponse,
      sender: 'ai',
      timestamp: Date.now()
    };
    
    onNewMessage(aiMessage);
    setIsGenerating(false);
    setStreamingText('');
  };

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // Cleanup typing timeout
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="card my-4">
      <h3 className="font-medium text-lg mb-4">Chat with Transcript</h3>
      
      <div className="border rounded-md bg-gray-50 h-80 flex flex-col">
        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.length === 0 && !isGenerating ? (
            <p className="text-text-secondary text-center py-8">
              Ask questions about the meeting transcript.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-3/4 rounded-lg px-4 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {/* Streaming response */}
              {isGenerating && streamingText && (
                <div className="flex justify-start">
                  <div className="max-w-3/4 rounded-lg px-4 py-2 bg-white border border-gray-200">
                    {streamingText}
                    {typingIndicator && (
                      <span className="inline-block w-2 h-4 ml-1 bg-gray-400 animate-pulse"></span>
                    )}
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about the meeting transcript..."
              className="input flex-1"
              disabled={isGenerating}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;