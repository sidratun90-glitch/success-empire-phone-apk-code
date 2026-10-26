import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

async function checkAll() {
  const snapshot = await getDocs(collection(db, "packages"));
  const sorted = snapshot.docs
    .map(doc => doc.data())
    .sort((a, b) => (Number(a.id) || 0) - (Number(b.id) || 0));

  console.log("Current Firestore Package Status:");
  sorted.forEach(pkg => {
    const lessons = pkg.lessons || [];
    // Extract unique courses
    const courses = new Set(lessons.map(l => l?.courseName).filter(Boolean));
    console.log(`Package: "${pkg.title}" (ID: ${pkg.id}) | Lessons: ${lessons.length} | Courses: ${courses.size}`);
    if (courses.size > 0) {
      console.log("Courses:", Array.from(courses).sort());
    }
    console.log("----------------------------------------");
  });
  process.exit(0);
}

checkAll().catch(err => {
  console.error(err);
  process.exit(1);
});
