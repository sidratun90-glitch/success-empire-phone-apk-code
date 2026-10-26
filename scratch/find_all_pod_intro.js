import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'premium_plus_lesson_pod_intro':");
lines.forEach((line, idx) => {
  if (line.includes('premium_plus_lesson_pod_intro')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
