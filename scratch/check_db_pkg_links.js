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

async function check() {
  const pkgsSnap = await getDocs(collection(db, "packages"));
  pkgsSnap.forEach(d => {
    const data = d.data();
    console.log("Pkg:", d.id, data.title);
    console.log("  paymentLink:", data.paymentLink);
    console.log("  enrollLink:", data.enrollLink);
    for (let k of Object.keys(data)) {
      if (typeof data[k] === 'string' && (data[k].includes('idigitalpreneur') || data[k].includes('http'))) {
        console.log(`  ${k}:`, data[k]);
      }
    }
  });
  process.exit(0);
}

check().catch(err => {
  console.error(err);
  process.exit(1);
});
