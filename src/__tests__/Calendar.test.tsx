// these test might be written inspired by gpt-4.1 
// testing the somewhat calendar flow

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from '../components/Calendar';

// let's try to free time so it becomes more predictable
beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date(2024, 3, 15));
});
afterAll(() => {
  jest.useRealTimers();
});

describe('Calendar', () => {
  it('renders calendar with current month', () => {
    render(<Calendar />);
    
    // making sure the nav button shows up
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    
    // days of week = always visible
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
    
    // mock events on the calendar shown up
    expect(screen.getByText('Team Standup')).toBeInTheDocument();
    expect(screen.getByText('Project Review')).toBeInTheDocument();
    expect(screen.getByText('Submit Report')).toBeInTheDocument();
  });

  it('navigates between months', () => {
    render(<Calendar />);
    
    // grab the 1 for the curr month so we can check if it disappears
    const currentMonthFirstDay = screen.getByText('1');
    
    // try going onto the next month
    fireEvent.click(screen.getByText('Next'));
    
    // 1st day of prev month NOT visible no more
    expect(currentMonthFirstDay).not.toBeInTheDocument();
    
    // now go back to prev month
    fireEvent.click(screen.getByText('Previous'));
    
    // we should see 1 again for OG month
    expect(screen.getByText('1')).toBeInTheDocument();
  });
}); 