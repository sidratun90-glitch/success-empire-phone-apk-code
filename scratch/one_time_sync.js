import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

// Helper function to extract and evaluate lessonsList from App.jsx
function extractGlobalLessonsList() {
  const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
  const lines = content.split('\n');
  
  // Extract lines 21053 to 29155 (0-indexed: 21052 to 29154)
  let code = lines.slice(21052, 29155).join('\n');
  code = code.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');
  
  // stockMarketLessons: lines 102 to 510
  let stockMarketCode = lines.slice(101, 510).join('\n');
  stockMarketCode = stockMarketCode.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');

  // cloudKitchenLessons: lines 511 to 700
  let cloudKitchenCode = lines.slice(510, 700).join('\n');
  cloudKitchenCode = cloudKitchenCode.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');

  // canvaLessons: lines 701 to 1077
  let canvaCode = lines.slice(700, 1077).join('\n');
  canvaCode = canvaCode.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');

  // promptEngLessons: lines 1078 to 1433
  let promptEngCode = lines.slice(1077, 1433).join('\n');
  promptEngCode = promptEngCode.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');

  // mobileVideoLessons: lines 1434 to 1875
  let mobileVideoCode = lines.slice(1433, 1875).join('\n');
  mobileVideoCode = mobileVideoCode.replace(/\b[A-Za-z0-9_]+Img\b/g, '""');
  
  // Create a function string that we can evaluate
  const evalCode = `
    ${stockMarketCode}
    ${cloudKitchenCode}
    ${canvaCode}
    ${promptEngCode}
    ${mobileVideoCode}
    ${code}
    lessonsList;
  `;
  
  const lessonsList = eval(evalCode);
  return lessonsList;
}

async function sync() {
  console.log("Extracting global lessons list from App.jsx...");
  const globalLessonsList = extractGlobalLessonsList();
  console.log(`Successfully extracted ${globalLessonsList.length} hardcoded lessons.`);
  
  console.log("Loading future lessons...");
  // Read and parse futureCourses.js
  let futureCoursesJs = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
  futureCoursesJs = futureCoursesJs.split('\n').filter(line => !line.trim().startsWith('import ')).join('\n');
  futureCoursesJs = futureCoursesJs.replace(/thumbnail:\s*[A-Za-z0-9_]+/g, 'thumbnail: ""');
  futureCoursesJs = futureCoursesJs.replace(/export const/g, 'const');
  futureCoursesJs += '\nexport { coursePackages, futureLessonsData };';
  fs.writeFileSync('c:/course app 3/scratch/temp_future_sync.js', futureCoursesJs);
  const { coursePackages, futureLessonsData } = await import('./temp_future_sync.js');
  
  const futureLessons = futureLessonsData.map(lesson => ({
    ...lesson,
    packageId: coursePackages[lesson.courseName] ?? lesson.packageId
  }));
  console.log(`Loaded ${futureLessons.length} future lessons.`);
  
  // 1. Prepare Standard Package lessons
  const targetCourses = new Set([
    "AI Foundations",
    "Design Smarter with Canva",
    "Freelance Course (Hindi)",
    "Mobile Video Editing",
    "english grammar"
  ]);
  const standardHardcoded = globalLessonsList.filter(l => l && targetCourses.has(l.courseName));
  const standardFuture = futureLessons.filter(l => l && Number(l.packageId) === 2000000000000);
  const combinedStandardLessons = [...standardHardcoded, ...standardFuture];
  console.log(`Standard Package lessons size: ${combinedStandardLessons.length}`);
  
  // 2. Fetch package templates from Firestore to preserve other metadata
  const stdSnap = await getDoc(doc(db, "packages", "2000000000000"));
  const supremeSnap = await getDoc(doc(db, "packages", "2000000000001"));
  const premiumSnap = await getDoc(doc(db, "packages", "2000000000002"));
  const plusSnap = await getDoc(doc(db, "packages", "2000000000003"));
  
  const standardPkg = stdSnap.exists() ? stdSnap.data() : { id: "2000000000000", title: "Standard Package", level: 1 };
  const supremePkg = supremeSnap.exists() ? supremeSnap.data() : { id: "2000000000001", title: "Supreme Package", level: 2 };
  const premiumPkg = premiumSnap.exists() ? premiumSnap.data() : { id: "2000000000002", title: "Premium Package", level: 3 };
  const plusPkg = plusSnap.exists() ? plusSnap.data() : { id: "2000000000003", title: "Premium Plus Package", level: 4 };
  
  // 3. Perform One-time Sync writes to Firestore
  console.log("Writing Standard Package to Firestore...");
  await setDoc(doc(db, "packages", "2000000000000"), {
    ...standardPkg,
    lessons: combinedStandardLessons,
    thumbnail: standardPkg.thumbnail || "/src/assets/standard.jpg"
  });
  
  console.log("Writing Premium Plus Package to Firestore...");
  await setDoc(doc(db, "packages", "2000000000003"), {
    ...plusPkg,
    lessons: globalLessonsList,
    thumbnail: plusPkg.thumbnail || "/src/assets/premium_plus.jpg"
  });
  
  console.log("Clearing Supreme Package lessons...");
  await setDoc(doc(db, "packages", "2000000000001"), {
    ...supremePkg,
    lessons: [],
    thumbnail: supremePkg.thumbnail || "/src/assets/supreme.jpg"
  });
  
  console.log("Clearing Premium Package lessons...");
  await setDoc(doc(db, "packages", "2000000000002"), {
    ...premiumPkg,
    lessons: [],
    thumbnail: premiumPkg.thumbnail || "/src/assets/premium.jpg"
  });
  
  console.log("One-time Firestore Sync complete!");
  process.exit(0);
}

sync().catch(err => {
  console.error(err);
  process.exit(1);
});
