// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getAuth } from "firebase/auth"; // Authentication
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCdUzdz_gQQUkNPdcxHdK7xOFgKQqYtvyQ",
  authDomain: "rose-encyclopedia.firebaseapp.com",
  projectId: "rose-encyclopedia",
  storageBucket: "rose-encyclopedia.firebasestorage.app",
  messagingSenderId: "517079473470",
  appId: "1:517079473470:web:88838be88253439fa1606f",
  measurementId: "G-XXFL4XRG5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);      // Firestore instance
const auth = getAuth(app);         // Auth instance
const analytics = getAnalytics(app);

export { db, auth };
