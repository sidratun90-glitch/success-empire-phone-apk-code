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

// We need to parse futureLessons and hardcoded lessons from App.jsx or simulate them.
// Let's load futureLessons
import { futureLessons } from '../src/data/futureCourses.js';

// Let's simulate targetCourses and globalLessonsList.
// We can extract lessonsList from App.jsx dynamically.
const appContent = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

// We can extract all hardcoded lessons using regex or by running a quick parser.
// Let's extract the list of hardcoded lessons.
// They are defined as array literals.
// Let's find: const lessonsList = [ ... ]; or just extract standardHardcoded by filtering the lists.
// Better: we can extract standardPkg and plusPkg from Firestore and see what is currently in standardPkg.lessons.
async function run() {
  const stdDoc = await getDoc(doc(db, "packages", "2000000000000"));
  const plusDoc = await getDoc(doc(db, "packages", "2000000000003"));
  
  const dbStandardLessons = stdDoc.exists() ? stdDoc.data().lessons || [] : [];
  const dbPlusLessons = plusDoc.exists() ? plusDoc.data().lessons || [] : [];
  
  console.log(`dbStandardLessons length: ${dbStandardLessons.length}`);
  console.log(`dbPlusLessons length: ${dbPlusLessons.length}`);
  
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
