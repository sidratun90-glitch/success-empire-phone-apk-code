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

async function run() {
  const querySnapshot = await getDocs(collection(db, "packages"));
  console.log(`Found ${querySnapshot.size} packages in Firestore:`);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`- Document ID: ${doc.id}`);
    console.log(`  id field: ${data.id} (type: ${typeof data.id})`);
    console.log(`  title: ${data.title}`);
    console.log(`  lessons length: ${data.lessons ? data.lessons.length : 'undefined'}`);
  });
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
