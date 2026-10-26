import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

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
  if (stdDoc.exists()) {
    const data = stdDoc.data();
    const lessons = data.lessons || [];
    console.log(`Standard lessons count: ${lessons.length}`);
    const courseNames = new Set(lessons.filter(l => l).map(l => l.courseName));
    console.log("Course names in Standard package in Firestore:");
    console.log(Array.from(courseNames).sort());
  } else {
    console.log("Standard package not found!");
  }
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
