// these test might be written inspired by gpt-4.1 
// testing the somewhat summary view right

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SummaryView from '../components/SummaryView';

// just sum summary daya to use in tests
const mockSummary = {
  keyPoints: ['Key point 1', 'Key point 2'],
  actionItems: ['Action 1', 'Action 2'],
  decisions: ['Decision 1', 'Decision 2'],
  highlights: ['Highlight 1', 'Highlight 2']
};

describe('SummaryView', () => {
  beforeEach(() => {
    // clipboard API to test copy functionality
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    });
  });

  it('renders all summary sections', () => {
    render(<SummaryView summary={mockSummary} />);
    
    // should show all section headers
    expect(screen.getByText('Key Points')).toBeInTheDocument();
    expect(screen.getByText('Action Items')).toBeInTheDocument();
    expect(screen.getByText('Decisions')).toBeInTheDocument();
    expect(screen.getByText('Highlights')).toBeInTheDocument();
  });

  it('displays all summary items', () => {
    render(<SummaryView summary={mockSummary} />);
    
    // making sure every item from our mock summary show up
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

    // clicking copy btn
    await act(async () => {
      fireEvent.click(screen.getByText('Copy to Clipboard'));
      jest.runAllTimers();
    });

    // check if clipboard API called
    expect(navigator.clipboard.writeText).toHaveBeenCalled();

    // btn txt change to Copied after click
    expect(await screen.findByText('✓ Copied!')).toBeInTheDocument();
    jest.useRealTimers();
  });
}); 