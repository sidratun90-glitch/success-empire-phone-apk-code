import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for lucide-react imports in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('lucide-react')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 10 lines after
    for (let i = 1; i <= 10; i++) {
      if (lines[idx + i] !== undefined) {
        console.log(`  +${i}: ${lines[idx + i]}`);
      }
    }
  }
});
