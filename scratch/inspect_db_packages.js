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

async function inspect() {
  const stdDoc = await getDoc(doc(db, "packages", "2000000000000"));
  const plusDoc = await getDoc(doc(db, "packages", "2000000000003"));
  
  if (stdDoc.exists()) {
    const data = stdDoc.data();
    console.log("=== Standard Package (2000000000000) ===");
    console.log(`Lessons count: ${data.lessons ? data.lessons.length : 0}`);
    if (data.lessons) {
      console.log("Lessons preview:", data.lessons.slice(0, 5).map(l => ({ id: l.id, courseName: l.courseName })));
    }
  } else {
    console.log("Standard Package doc does not exist!");
  }
  
  if (plusDoc.exists()) {
    const data = plusDoc.data();
    console.log("=== Premium Plus Package (2000000000003) ===");
    console.log(`Lessons count: ${data.lessons ? data.lessons.length : 0}`);
    if (data.lessons) {
      console.log("Lessons preview:", data.lessons.slice(0, 5).map(l => ({ id: l.id, courseName: l.courseName })));
    }
  } else {
    console.log("Premium Plus Package doc does not exist!");
  }
  
  process.exit(0);
}

inspect().catch(err => {
  console.error(err);
  process.exit(1);
});
