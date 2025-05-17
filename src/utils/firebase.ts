
// src/utils/firebase.ts by rasulov

// pretty simple ngl

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// my web app's Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCwHm9gJJStepSSJl-KC1_dZlftXZFGa_Q",
  authDomain: "test-twin-mind-web-app.firebaseapp.com",
  projectId: "test-twin-mind-web-app",
  storageBucket: "test-twin-mind-web-app.firebasestorage.app",
  messagingSenderId: "138501918326",
  appId: "1:138501918326:web:fe0cbbfcd76dfac9a25957",
  measurementId: "G-XRBNK4F61N"
};

// init FB
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };