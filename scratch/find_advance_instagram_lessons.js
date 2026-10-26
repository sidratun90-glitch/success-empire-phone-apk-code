import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let inLessonsList = false;
let matchingLessons = [];

for (let i = 18984; i < 26350; i++) {
  const line = lines[i];
  if (line.includes('let lessonsList = [')) {
    inLessonsList = true;
    continue;
  }
  if (inLessonsList) {
    if (line.includes('courseName:') && (line.includes('advance Instagram course 2.0') || line.includes('Advanced Instagram Course 2.0'))) {
      // Find start of this object
      let lessonStart = -1;
      for (let j = i; j >= 18985; j--) {
        if (lines[j].trim().startsWith('{')) {
          lessonStart = j; // 0-based index
          break;
        }
      }
      // Find end of this object
      let lessonEnd = -1;
      for (let j = i; j < 26350; j++) {
        if (lines[j].trim().startsWith('},')) {
          lessonEnd = j; // 0-based index
          break;
        }
      }
      matchingLessons.push({
        courseName: line.trim(),
        title: lines[lessonStart + 2].trim(), // likely title
        startLine: lessonStart + 1, // 1-based
        endLine: lessonEnd + 1 // 1-based
      });
    }
  }
}

console.log(`Found ${matchingLessons.length} lessons:`);
matchingLessons.forEach((m, idx) => {
  console.log(`Lesson ${idx + 1}: ${m.title} | ${m.courseName} | Lines ${m.startLine} to ${m.endLine}`);
});
