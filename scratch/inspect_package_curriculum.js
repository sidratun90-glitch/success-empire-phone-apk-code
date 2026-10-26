import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'curriculum' render logic inside PackageDetailScreen in App.jsx:");
let count = 0;
lines.forEach((line, idx) => {
  if (idx >= 5770 && idx < 6700) {
    if (line.includes('activeTab ===') || line.includes('curriculum')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
      count++;
      if (count < 10) {
        // Print 30 lines after it
        for (let i = 1; i <= 35; i++) {
          if (lines[idx + i] !== undefined) {
            console.log(`  +${i}: ${lines[idx + i]}`);
          }
        }
      }
    }
  }
});
