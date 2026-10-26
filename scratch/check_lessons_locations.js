import fs from 'fs';

const futureCoursesContent = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
const appJsxContent = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');

const userCourses = [
  "AI Foundations",
  "AI Master Class 1.0",
  "AI Foundations (Telugu)",
  "Design Smarter with Canva",
  "Design Smarter with Canva (Tamil)",
  "Freelance Course (Hindi)",
  "Mobile Video Editing",
  "Mobile Video Editing (Kannada)",
  "Wondershare Filmora",
  "UGC Course",
  "Ultimate Instagram Growth",
  "english grammar"
];

console.log("Analyzing Course Definitions in futureCourses.js vs App.jsx:");

userCourses.forEach(uc => {
  console.log(`\nCourse: "${uc}"`);
  
  // Search in futureCourses.js
  const fcMatches = [...futureCoursesContent.matchAll(new RegExp(`courseName:\\s*["']${uc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'))];
  // Search in coursePackages map of futureCourses.js
  const inFcPackagesMap = futureCoursesContent.includes(`"${uc}":`) || futureCoursesContent.includes(`'${uc}':`);
  
  // Search in App.jsx
  const appMatches = [...appJsxContent.matchAll(new RegExp(`courseName:\\s*["']${uc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'g'))];
  
  console.log(`  - futureCourses.js:`);
  console.log(`    - Has lessons: ${fcMatches.length > 0} (${fcMatches.length} occurrences)`);
  console.log(`    - In coursePackages map: ${inFcPackagesMap}`);
  
  console.log(`  - App.jsx:`);
  console.log(`    - Has lessons: ${appMatches.length > 0} (${appMatches.length} occurrences)`);
});
