// src/utils/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace with your actual Firebase config when deploying
const firebaseConfig = {
  apiKey: "AIzaSyCwHm9gJJStepSSJl-KC1_dZlftXZFGa_Q",
  authDomain: "test-twin-mind-web-app.firebaseapp.com",
  projectId: "test-twin-mind-web-app",
  storageBucket: "test-twin-mind-web-app.firebasestorage.app",
  messagingSenderId: "138501918326",
  appId: "1:138501918326:web:fe0cbbfcd76dfac9a25957",
  measurementId: "G-XRBNK4F61N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };