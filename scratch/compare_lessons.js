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
  const stdDoc = await getDoc(doc(db, "packages", "2000000000000"));
  const plusDoc = await getDoc(doc(db, "packages", "2000000000003"));
  
  const stdLessons = stdDoc.exists() ? stdDoc.data().lessons || [] : [];
  const plusLessons = plusDoc.exists() ? plusDoc.data().lessons || [] : [];
  
  console.log(`Firestore Standard count: ${stdLessons.length}`);
  console.log(`Firestore Premium Plus count: ${plusLessons.length}`);
  
  // Let's print out the courses in Standard package in Firestore
  const stdCourses = new Set(stdLessons.map(l => l.courseName));
  console.log("Courses in Firestore Standard package:", Array.from(stdCourses));

  // Let's print out the courses in Premium Plus package in Firestore
  const plusCourses = new Set(plusLessons.map(l => l.courseName));
  console.log("Courses in Firestore Premium Plus package:", Array.from(plusCourses).slice(0, 10), `(Total unique courses: ${plusCourses.size})`);
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
