
// src/pages/login.tsx by rasulov

// if u wondering who rasulov is that's just my last name

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../utils/firebase';
import ErrorToast from '../components/ErrorToast';

const LoginPage: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError('Failed to sign in with Google. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="loader"></div>
      </div>
    );
  }

  if (user) {
    return null; // will be redirected
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)]">
      <div className="card max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-primary mb-2">Welcome to MeetingScribe</h1>
        <p className="text-text-secondary mb-8">
          Record, transcribe, and summarize your meetings with AI assistance
        </p>
        
        <button 
          onClick={handleGoogleSignIn}
          className="btn btn-primary w-full flex items-center justify-center"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              fill="#ffffff" 
              d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
            />
          </svg>
          Sign in with Google
        </button>
        
        <p className="mt-6 text-sm text-text-secondary">
          Sign in to connect your Google Calendar and start recording meetings
        </p>
      </div>
      
      {error && (
        <ErrorToast 
          message={error} 
          onClose={() => setError(null)} 
        />
      )}
    </div>
  );
};

export default LoginPage;