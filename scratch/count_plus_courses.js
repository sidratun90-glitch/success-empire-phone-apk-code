import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

// Extract unique courseName values from hardcoded lessons in App.jsx
const hardcodedCourses = new Set();
for (let i = 21052; i < 29155; i++) {
  const line = lines[i];
  const match = /courseName:\s*["']([^"']+)["']/.exec(line);
  if (match) {
    hardcodedCourses.add(match[1]);
  }
}
for (let i = 700; i < 1875; i++) {
  const line = lines[i];
  const match = /courseName:\s*["']([^"']+)["']/.exec(line);
  if (match) {
    hardcodedCourses.add(match[1]);
  }
}

// Load future lessons from futureCourses.js
let futureCoursesJs = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
futureCoursesJs = futureCoursesJs.split('\n').filter(line => !line.trim().startsWith('import ')).join('\n');
futureCoursesJs = futureCoursesJs.replace(/thumbnail:\s*[A-Za-z0-9_]+/g, 'thumbnail: ""');
futureCoursesJs = futureCoursesJs.replace(/export const/g, 'const');
futureCoursesJs += '\nexport { coursePackages, futureLessonsData };';
fs.writeFileSync('c:/course app 3/scratch/temp_future_count.js', futureCoursesJs);
const { coursePackages, futureLessonsData } = await import('./temp_future_count.js');

const targetCourses = new Set([
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
]);

// Courses in standard package: targetCourses
// Premium Plus package has all courses EXCEPT targetCourses
const allPlusCourses = new Set();

// 1. Add all hardcoded courses except targetCourses
hardcodedCourses.forEach(c => {
  if (!targetCourses.has(c)) {
    allPlusCourses.add(c);
  }
});

// 2. Add all future courses mapped to Premium Plus (packageId = 2000000000003)
futureLessonsData.forEach(l => {
  const pkgId = Number(coursePackages[l.courseName] ?? l.packageId);
  if (pkgId === 2000000000003 && !targetCourses.has(l.courseName)) {
    allPlusCourses.add(l.courseName);
  }
});

console.log("Expected Premium Plus unique courses count:", allPlusCourses.size);
console.log("Expected Standard unique courses count:", targetCourses.size);
console.log("Expected Premium Plus courses list:", Array.from(allPlusCourses).sort());
process.exit(0);
