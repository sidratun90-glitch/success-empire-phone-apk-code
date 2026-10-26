import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for ProfileScreen definition and its props in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('const ProfileScreen =') || line.includes('function ProfileScreen')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 20 lines after it
    for (let i = 1; i <= 25; i++) {
      if (lines[idx + i] !== undefined) {
        console.log(`  +${i}: ${lines[idx + i]}`);
      }
    }
  }
});
