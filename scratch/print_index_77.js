import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import fs from 'fs';

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

async function run() {
  const plusDoc = await getDoc(doc(db, "packages", "2000000000003"));
  const dbLessons = plusDoc.exists() ? plusDoc.data().lessons || [] : [];
  
  console.log(`dbLessons size: ${dbLessons.length}`);
  if (dbLessons.length > 77) {
    console.log("dbLessons[77]:", dbLessons[77]);
    console.log("dbLessons[78]:", dbLessons[78]);
  }
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
