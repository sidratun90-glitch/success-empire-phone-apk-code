import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for showToast in VideoPlayerScreen component:");
lines.forEach((line, idx) => {
  if (idx >= 7446 && idx < 7800) {
    if (line.includes('showToast') && (line.includes('const') || line.includes('function') || line.includes('let'))) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
