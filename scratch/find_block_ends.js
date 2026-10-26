import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find all matches for "let lessonsList = [" or "pkgData.lessons = ["
console.log("Searching for array starts:");
lines.forEach((line, idx) => {
  if (line.includes('let lessonsList = [') || (line.includes('pkgData.lessons = [') && !line.includes('//'))) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
