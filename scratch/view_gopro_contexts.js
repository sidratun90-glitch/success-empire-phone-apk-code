import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function printRange(start, count) {
  console.log(`--- Lines ${start} to ${start + count} ---`);
  for (let i = 0; i < count; i++) {
    const idx = start - 1 + i;
    if (lines[idx] !== undefined) {
      console.log(`${idx + 1}: ${lines[idx]}`);
    }
  }
}

// Context around line 22122
printRange(22115, 30);

// Context around line 29475
printRange(29465, 30);

// Context around line 34231
printRange(34220, 30);
