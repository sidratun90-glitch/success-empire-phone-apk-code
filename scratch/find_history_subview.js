import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'history' view rendering in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes("case 'history'") || line.includes("activeView === 'history'") || line.includes("activeView === \"history\"")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 50 lines after it
    for (let i = 1; i <= 50; i++) {
      if (lines[idx + i] !== undefined) {
        console.log(`  +${i}: ${lines[idx + i]}`);
      }
    }
  }
});
