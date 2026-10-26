import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for Learning History in App.jsx:");
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('learning') || line.toLowerCase().includes('history')) {
    if (line.includes('history') || line.includes('History') || line.includes('learning') || line.includes('Learning')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
