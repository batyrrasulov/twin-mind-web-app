import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SummaryView from '../components/SummaryView';

const mockSummary = {
  keyPoints: ['Key point 1', 'Key point 2'],
  actionItems: ['Action 1', 'Action 2'],
  decisions: ['Decision 1', 'Decision 2'],
  highlights: ['Highlight 1', 'Highlight 2']
};

describe('SummaryView', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });
  });

  it('renders all summary sections', () => {
    render(<SummaryView summary={mockSummary} />);
    
    // Check if all sections are rendered
    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('Action Items')).toBeInTheDocument();
    expect(screen.getByText('Decisions')).toBeInTheDocument();
    expect(screen.getByText('Highlights')).toBeInTheDocument();
  });

  it('displays all summary items', () => {
    render(<SummaryView summary={mockSummary} />);
    
    // Check if all items are displayed
    mockSummary.keyPoints.forEach(point => {
      expect(screen.getByText(point)).toBeInTheDocument();
    });
    
    mockSummary.actionItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
    
    mockSummary.decisions.forEach(decision => {
      expect(screen.getByText(decision)).toBeInTheDocument();
    });
    
    mockSummary.highlights.forEach(highlight => {
      expect(screen.getByText(highlight)).toBeInTheDocument();
    });
  });

  it('handles copy to clipboard', async () => {
    jest.useFakeTimers();
    render(<SummaryView summary={mockSummary} />);
    // Click copy button
    await act(async () => {
      fireEvent.click(screen.getByText('Copy to Clipboard'));
      jest.runAllTimers();
    });
    // Check if clipboard API was called
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    // Check if button text changes to "Copied!"
    expect(await screen.findByText('✓ Copied!')).toBeInTheDocument();
    jest.useRealTimers();
  });
}); 