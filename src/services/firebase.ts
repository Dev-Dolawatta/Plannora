import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDh8S6AuzyBZ0VpFJafZQLHP-1sGPkFzrk",
  authDomain: "personaleventplanner.firebaseapp.com",
  projectId: "personaleventplanner",
  storageBucket: "personaleventplanner.firebasestorage.app",
  messagingSenderId: "547966590519",
  appId: "1:547966590519:web:b7cd774351527c402be9b2",
  measurementId: "G-TP1CKBBB98"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;

