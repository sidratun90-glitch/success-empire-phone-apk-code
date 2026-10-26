import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/data/futureCourses.js', 'utf8');

// Match all packageId occurrences in futureLessonsData
const matches = [...content.matchAll(/packageId:\s*(\d+)/g)];
console.log(`Found ${matches.length} packageId declarations inside lessons:`);

const nonPlusIds = new Set();
matches.forEach(m => {
  const pid = m[1];
  if (pid !== '2000000000003') {
    nonPlusIds.add(pid);
  }
});

console.log("Distinct packageIds (other than 2000000000003) declared in lessons:", Array.from(nonPlusIds));
