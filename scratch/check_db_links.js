import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";

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

async function check() {
  const docRef = doc(db, "settings", "app");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Settings keys:", Object.keys(docSnap.data()));
    console.log("Settings app:", docSnap.data());
  }
  const pkgsSnap = await getDocs(collection(db, "packages"));
  pkgsSnap.forEach(d => {
    const data = d.data();
    console.log("Pkg:", d.id, data.title, "keys:", Object.keys(data).filter(k => k.toLowerCase().includes('link') || k.toLowerCase().includes('url') || k.toLowerCase().includes('enroll')));
  });
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
