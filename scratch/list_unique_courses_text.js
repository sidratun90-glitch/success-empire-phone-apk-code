import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');

// Match: courseName: "..." or courseName: '...'
const courseNames = new Set();
const matches = content.matchAll(/courseName:\s*["']([^"']+)["']/g);
for (const match of matches) {
  courseNames.add(match[1]);
}

console.log("All Unique Course Names found in futureLessonsData:");
const sortedCourses = Array.from(courseNames).sort();
sortedCourses.forEach(name => {
  console.log(`- "${name}"`);
});
