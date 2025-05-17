// src/utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual Firebase config when deploying
const firebaseConfig = {
  apiKey: "AIzaSyA1234567890-EXAMPLE-KEY",
  authDomain: "meeting-transcription-app.firebaseapp.com",
  projectId: "meeting-transcription-app",
  storageBucket: "meeting-transcription-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };