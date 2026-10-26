import fs from 'fs';

const courses = new Set();

// 1. Parse futureCourses.js
const futureContent = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');
const coursePkgRegex = /"([^"]+)":\s*2000000000\d{3}/g;
let match;
while ((match = coursePkgRegex.exec(futureContent)) !== null) {
  courses.add(match[1]);
}

// 2. Parse App.jsx course names
const appContent = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const courseNameRegex = /courseName:\s*"([^"]+)"/g;
while ((match = courseNameRegex.exec(appContent)) !== null) {
  courses.add(match[1]);
}

console.log("All Unique Course Names in Codebase:");
console.log(Array.from(courses).sort());
