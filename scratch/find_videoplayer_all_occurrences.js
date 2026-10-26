import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for VideoPlayer occurrences in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('VideoPlayer')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
