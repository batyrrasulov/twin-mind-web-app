// src/pages/index.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthGuard from '../components/AuthGuard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';
import { mockCalendarEvents } from '../utils/mockData';
import ErrorToast from '../components/ErrorToast';

const DashboardPage: React.FC = () => {
  const [user] = useAuthState(auth);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Simulate calendar connection check
  useEffect(() => {
    // In a real app, check if the user has connected Google Calendar
    const timer = setTimeout(() => {
      setIsCalendarConnected(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleConnectCalendar = () => {
    // In a real app, redirect to Google OAuth flow
    setIsCalendarConnected(true);
  };

  const handleStartMeeting = (eventId: string) => {
    // Navigate to meeting page
    router.push(`/meeting?id=${eventId}`);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <AuthGuard>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome, {user?.displayName}</h1>
          
          {!isCalendarConnected && (
            <button 
              onClick={handleConnectCalendar}
              className="btn btn-primary"
            >
              Connect Google Calendar
            </button>
          )}
        </div>
        
        {!isCalendarConnected ? (
          <div className="card text-center py-12">
            <h2 className="text-xl font-medium mb-2">Connect Your Calendar</h2>
            <p className="text-text-secondary mb-6">
              Connect your Google Calendar to view and record your scheduled meetings
            </p>
            <button 
              onClick={handleConnectCalendar}
              className="btn btn-primary"
            >
              Connect Google Calendar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-medium mb-4">Upcoming Meetings</h2>
            
            <div className="space-y-4">
              {mockCalendarEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="card flex flex-col sm:flex-row sm:items-center justify-between"
                >
                  <div className="mb-4 sm:mb-0">
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-text-secondary">{formatDate(event.date)}</p>
                    <p className="text-sm text-text-secondary">
                      {event.attendees.length} attendees
                    </p>
                  </div>
                  
                  <button 
                    onClick={() => handleStartMeeting(event.id)}
                    className="btn btn-primary"
                  >
                    Start Meeting
                  </button>
                </div>
              ))}
              
              <div className="card bg-gray-50 border border-dashed border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-100">
                <p className="text-text-secondary">
                  + Create New Quick Meeting
                </p>
              </div>
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

export default DashboardPage;