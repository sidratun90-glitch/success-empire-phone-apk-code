import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for showToast declaration inside VideoPlayerScreen:");
for (let idx = 7446; idx < 10789; idx++) {
  const line = lines[idx];
  if (line.includes('showToast') && (line.includes('const') || line.includes('function') || line.includes('let') || line.includes('='))) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
}
