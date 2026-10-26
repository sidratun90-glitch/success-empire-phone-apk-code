import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'navigateTo(\"package\"' or similar package view in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('navigateTo(\'package\'') || line.includes('navigateTo("package"') || line.includes('case \'package\'')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Print 30 lines after it
    for (let i = 1; i <= 30; i++) {
      if (lines[idx + i] !== undefined) {
        console.log(`  +${i}: ${lines[idx + i]}`);
      }
    }
  }
});
