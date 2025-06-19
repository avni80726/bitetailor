
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:  "AIzaSyCMONbg-kjrfk5yMseiC6-78g8ALfkPTuA",
  authDomain: "bitetailor.firebaseapp.com",
  projectId: "bitetailor",
  storageBucket: "bitetailor.firebasestorage.app",
  messagingSenderId: "19286032142",
  appId: "1:19286032142:web:836bd3b28110bbfd8de15f",
   measurementId: "G-EZV0VEQJ42"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
