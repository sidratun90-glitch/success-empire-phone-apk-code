import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for player UI elements / rendering in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('playerRef') || line.includes('VideoPlayer') || line.includes('activeVideoSession') || line.includes('playerViewMode')) {
    if (idx > 10000 && idx < 12000) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
