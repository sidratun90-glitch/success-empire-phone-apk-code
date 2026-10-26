import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'lessonsList =' in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('lessonsList =') || line.includes('lessonsList:')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
