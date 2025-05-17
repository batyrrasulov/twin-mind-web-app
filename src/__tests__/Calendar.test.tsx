import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar';

beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date(2024, 3, 15));
});
afterAll(() => {
  jest.useRealTimers();
});

describe('Calendar', () => {
  it('renders calendar with current month', () => {
    render(<Calendar />);
    
    // Check if month navigation buttons are present
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    
    // Check if days of week are present
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('displays mock events correctly', () => {
    render(<Calendar />);
    
    // Check if mock events are displayed
    expect(screen.getByText('Team Standup')).toBeInTheDocument();
    expect(screen.getByText('Project Review')).toBeInTheDocument();
    expect(screen.getByText('Submit Report')).toBeInTheDocument();
  });

  it('navigates between months', () => {
    render(<Calendar />);
    
    // Get current month's first day
    const currentMonthFirstDay = screen.getByText('1');
    
    // Click next month
    fireEvent.click(screen.getByText('Next'));
    
    // Check if the view has changed
    expect(currentMonthFirstDay).not.toBeInTheDocument();
    
    // Click previous month
    fireEvent.click(screen.getByText('Previous'));
    
    // Check if we're back to the original month
    expect(screen.getByText('1')).toBeInTheDocument();
  });
}); 