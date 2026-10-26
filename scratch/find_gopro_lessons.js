import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'GoPro with After Effects' in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('GoPro with After Effects')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
