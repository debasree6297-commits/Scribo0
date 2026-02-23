import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5IdgBRDh3QjJUpsOMUJXs24SLMjO_LyM",
  authDomain: "scribo-ai-99eeb.firebaseapp.com",
  projectId: "scribo-ai-99eeb",
  storageBucket: "scribo-ai-99eeb.firebasestorage.app",
  messagingSenderId: "69014787122",
  appId: "1:69014787122:web:7f712aa7b09c216f88182b",
  measurementId: "G-S5SJ1D17W6"
};

// Prevent duplicate initialization
const firebaseApp = getApps().length === 0 
  ? initializeApp(firebaseConfig)
  : getApps()[0];

const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);

// Set persistence
setPersistence(auth, browserLocalPersistence)
  .catch(console.error);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export {
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
};
