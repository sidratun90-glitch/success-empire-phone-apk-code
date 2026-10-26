import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'Lessons' tab or options in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('Lessons') || line.includes('lessons') || line.includes('Curriculum') || line.includes('curriculum')) {
    if (idx > 5000 && idx < 12000) { // common component definitions range
      if (line.includes('button') || line.includes('tab') || line.includes('active') || line.includes('span') || line.includes('flex')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
      }
    }
  }
});
