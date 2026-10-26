import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';

const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find all lines containing "id: 200000" or similar package IDs
// or "name:" near packages
console.log("Searching for package-like definitions in the file...");
lines.forEach((line, idx) => {
  if (line.includes('2000000000000') || line.includes('2000000000001') || line.includes('2000000000002') || line.includes('2000000000003')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // print 5 lines after it
    for (let i = 1; i <= 10; i++) {
      if (lines[idx + i]) {
        console.log(`  +${i}: ${lines[idx + i].trim()}`);
      }
    }
  }
});
