import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for player-related keywords in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('quality') || line.includes('videoUrls') || line.includes('videoPlayer') || line.includes('activeQuality') || line.includes('selectedQuality')) {
    if (idx > 5000 && idx < 20000) { // Let's check common component render ranges
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
