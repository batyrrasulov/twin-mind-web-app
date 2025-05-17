
// src/components/AuthGuard.tsx by rasulov

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {

  // grab the curr user & loading state from FB
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {

    // if we done loading & no user => send to login
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    
    // while we checking auth show a loadin spinner 
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!user) {
    
    // hate this
    return null;
  }

  // hopefully they authenticated so we can just render the kids
  return <>{children}</>;
};

export default AuthGuard;