import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'learning_history' or similar profile layout in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('learning_history') || line.includes('packageHistory') || line.includes('learningHistory')) {
    if (idx < 20000) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
