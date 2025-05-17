
// src/pages/_app.tsx by help from looking at other exsiting AI tools 
// and tryna replicat em

import React from 'react';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure Firebase auth is only loaded client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;