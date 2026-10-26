import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Real Firebase Web App Config pointing to course-app-d2a50
const firebaseConfig = {
    apiKey: "AIzaSyBcCkt2pjrxYNZT8m1b57EYcDmkKJNJJ2s",
    authDomain: "course-app-d2a50.firebaseapp.com",
    databaseURL: "https://course-app-d2a50-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "course-app-d2a50",
    storageBucket: "course-app-d2a50.firebasestorage.app",
    messagingSenderId: "74614309865",
    appId: "1:74614309865:web:5ec42d3b78717da9a0c178",
    measurementId: "G-V9027QKYC6"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const getFirebaseConfig = () => firebaseConfig;

export { app, auth, db, googleProvider, getFirebaseConfig };
