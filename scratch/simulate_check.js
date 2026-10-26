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
  
  const stdLessonsFromDb = stdDoc.exists() ? stdDoc.data().lessons || [] : [];
  const plusLessonsFromDb = plusDoc.exists() ? plusDoc.data().lessons || [] : [];
  
  // Let's load futureLessonsData
  let futureCoursesJs = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
  futureCoursesJs = futureCoursesJs.split('\n').filter(line => !line.trim().startsWith('import ')).join('\n');
  futureCoursesJs = futureCoursesJs.replace(/thumbnail:\s*[A-Za-z0-9_]+/g, 'thumbnail: ""');
  futureCoursesJs = futureCoursesJs.replace(/export const/g, 'const');
  futureCoursesJs += '\nexport { coursePackages, futureLessonsData };';
  fs.writeFileSync('c:/course app 3/scratch/temp_future_sim.js', futureCoursesJs);
  const { coursePackages, futureLessonsData } = await import('./temp_future_sim.js');
  
  const futureLessons = futureLessonsData.map(lesson => ({
    ...lesson,
    packageId: coursePackages[lesson.courseName] ?? lesson.packageId
  }));

  // Let's print out if standard package needs update
  // We need globalLessonsList. Let's get it from Firestore Plus package (which was synced with it).
  const globalLessonsList = plusLessonsFromDb;
  
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
  
  console.log(`dbLessons standard length: ${stdLessonsFromDb.length}`);
  console.log(`combinedStandardLessons length: ${combinedStandardLessons.length}`);
  
  if (stdLessonsFromDb.length !== combinedStandardLessons.length) {
    console.log("Standard length mismatch!");
  } else {
    for (let i = 0; i < stdLessonsFromDb.length; i++) {
      const dbL = stdLessonsFromDb[i];
      const combL = combinedStandardLessons[i];
      if (!dbL || !combL || dbL.id !== combL.id) {
        console.log(`Standard mismatch at index ${i}: db ID = ${dbL?.id}, comb ID = ${combL?.id}`);
      }
    }
  }

  // Premium Plus check
  // dbLessons of Plus is plusLessonsFromDb
  // globalLessonsList is plusLessonsFromDb
  const plusNeedsUpdate = plusLessonsFromDb.length !== globalLessonsList.length ||
                          plusLessonsFromDb.some((l, idx) => !l || !globalLessonsList[idx] || l.id !== globalLessonsList[idx].id);
  console.log(`plusNeedsUpdate evaluated to: ${plusNeedsUpdate}`);

  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
