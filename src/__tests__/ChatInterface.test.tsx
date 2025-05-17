import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInterface from '../components/ChatInterface';
import { mockStreamingResponse } from '../utils/mockData';
import { ChatMessage, TranscriptionChunk } from '../types';

// Mock the mockStreamingResponse function
jest.mock('../utils/mockData', () => ({
  mockStreamingResponse: jest.fn(() => ['Hello', 'this', 'is', 'a', 'test', 'response'])
}));

describe('ChatInterface', () => {
  const mockOnNewMessage = jest.fn();
  const mockTranscription: TranscriptionChunk[] = [];
  const mockMessages: ChatMessage[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state correctly', () => {
    render(
      <ChatInterface
        transcription={mockTranscription}
        onNewMessage={mockOnNewMessage}
        messages={mockMessages}
      />
    );

    expect(screen.getByText('Ask questions about the meeting transcript.')).toBeInTheDocument();
  });

  it('handles user input and submission', async () => {
    render(
      <ChatInterface
        transcription={mockTranscription}
        onNewMessage={mockOnNewMessage}
        messages={mockMessages}
      />
    );

    const input = screen.getByPlaceholderText('Ask about the meeting transcript...');
    const sendButton = screen.getByText('Send');

    // Type and submit a message
    await userEvent.type(input, 'Test message');
    fireEvent.click(sendButton);

    // Check if user message was added
    expect(mockOnNewMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Test message',
        sender: 'user'
      })
    );

    // Wait for AI response
    await waitFor(() => {
      expect(mockOnNewMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Hello this is a test response',
          sender: 'ai'
        })
      );
    }, { timeout: 3000 });
  });

  it('disables input while generating response', async () => {
    render(
      <ChatInterface
        transcription={mockTranscription}
        onNewMessage={mockOnNewMessage}
        messages={mockMessages}
      />
    );

    const input = screen.getByPlaceholderText('Ask about the meeting transcript...');
    const sendButton = screen.getByText('Send');

    // Submit a message
    await userEvent.type(input, 'Test message');
    fireEvent.click(sendButton);

    // Check if input is disabled
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // Wait for response to complete
    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(sendButton).not.toBeDisabled();
    }, { timeout: 3000 });
  });
}); 