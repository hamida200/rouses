import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCdUzdz_gQQUkNPdcxHdK7xOFgKQqYtvyQ",
  authDomain: "rose-encyclopedia.firebaseapp.com",
  projectId: "rose-encyclopedia",
  storageBucket: "rose-encyclopedia.appspot.com",
  messagingSenderId: "517079473470",
  appId: "1:517079473470:web:88838be88253439fa1606f",
  measurementId: "G-XXFL4XRG5X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
