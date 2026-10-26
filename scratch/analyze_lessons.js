import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for course names in lessonsList (lines 18985 onwards):");
const courseNames = new Set();
let inLessonsList = false;
let braceCount = 0;
let arrayBraceCount = 0;

for (let i = 18984; i < 40000; i++) {
  const line = lines[i];
  if (!line) continue;
  if (line.includes('let lessonsList = [')) {
    inLessonsList = true;
    continue;
  }
  if (inLessonsList) {
    // Check if we hit the end of lessonsList
    // lessonsList is a Javascript array of objects, ending with ];
    if (line.trim() === '];') {
      console.log("Found end of lessonsList at line", i + 1);
      break;
    }
    const match = line.match(/courseName:\s*["']([^"']+)["']/);
    if (match) {
      courseNames.add(match[1]);
    }
  }
}

console.log("Distinct courseNames in lessonsList:");
console.log(Array.from(courseNames));
