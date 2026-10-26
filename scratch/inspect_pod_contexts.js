import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function printRange(start, count, title) {
  console.log(`\n=== ${title} (Lines ${start} to ${start + count}) ===`);
  for (let i = 0; i < count; i++) {
    const idx = start - 1 + i;
    if (lines[idx] !== undefined) {
      console.log(`${idx + 1}: ${lines[idx]}`);
    }
  }
}

printRange(2325, 20, "Context around line 2335");
printRange(20895, 20, "Context around line 20901");
printRange(28610, 20, "Context around line 28620");
printRange(33775, 20, "Context around line 33786");
