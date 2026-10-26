import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'My Learning History' or similar keys in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('My Learning History') || line.includes('learning_history') || line.includes('packageHistory')) {
    if (idx > 10000 && idx < 15000) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
