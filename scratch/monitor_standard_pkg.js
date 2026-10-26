import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Starting Standard Package monitor...");

const unsub = onSnapshot(doc(db, "packages", "2000000000000"), (docSnap) => {
  const now = new Date().toISOString();
  if (docSnap.exists()) {
    const data = docSnap.data();
    const lessons = data.lessons || [];
    console.log(`[${now}] Standard Package updated in DB. Lessons count: ${lessons.length}`);
  } else {
    console.log(`[${now}] Standard Package document does not exist in DB.`);
  }
}, (err) => {
  console.error("Monitor Error:", err);
});
