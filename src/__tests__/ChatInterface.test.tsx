// these test might be written inspired by gpt-4.1 
// testing the somewhat chat interface

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatInterface from '../components/ChatInterface';
import { mockStreamingResponse } from '../utils/mockData';
import { ChatMessage, TranscriptionChunk } from '../types';

// we gon mock streaming response here
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

    // show a prompt when no messages yet
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

    // find input & send btn
    const input = screen.getByPlaceholderText('Ask about the meeting transcript...');
    const sendButton = screen.getByText('Send');

    // type & click send a msg
    await userEvent.type(input, 'Test message');
    fireEvent.click(sendButton);

    // check if user msg  added
    expect(mockOnNewMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Test message',
        sender: 'user'
      })
    );

    // wait for AI response to come thru
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

    // again type & send a message
    await userEvent.type(input, 'Test message');
    fireEvent.click(sendButton);

    // btns be disabled when waiting
    expect(input).toBeDisabled();
    expect(sendButton).toBeDisabled();

    // after response done => they should be re-enabled
    await waitFor(() => {
      expect(input).not.toBeDisabled();
      expect(sendButton).not.toBeDisabled();
    }, { timeout: 3000 });
  });
}); 