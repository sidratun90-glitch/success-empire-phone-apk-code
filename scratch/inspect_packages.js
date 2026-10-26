import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'const PACKAGES =' or similar in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('const PACKAGES') || line.includes('let PACKAGES') || line.includes('var PACKAGES')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 15 lines after it
    for (let i = 1; i <= 25; i++) {
      if (lines[idx + i] !== undefined) {
        console.log(`  +${i}: ${lines[idx + i]}`);
      }
    }
  }
});
