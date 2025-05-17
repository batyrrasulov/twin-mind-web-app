// src/components/Header.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header: React.FC = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-primary">
          MeetingScribe
        </Link>
        
        <nav className="flex items-center space-x-4">
          {!loading && user && (
            <>
              <Link href="/" className="text-text-secondary hover:text-primary">
                Dashboard
              </Link>
              <div className="flex items-center space-x-3">
                {user.photoURL && (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'User'} 
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <button 
                  onClick={handleSignOut}
                  className="text-text-secondary hover:text-primary"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
          
          {!loading && !user && (
            <Link href="/login" className="text-text-secondary hover:text-primary">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;