import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function printRange(start, end) {
  console.log(`\n=== Lines ${start} to ${end} ===`);
  for (let i = start; i <= end; i++) {
    console.log(`${i}: ${lines[i - 1]}`);
  }
}

// GoPro lessons in block 1: we know line 22120 is lesson 11, so lesson 0 is around line 22000
printRange(22000, 22050);

// GoPro lessons in block 2 start at 29473. Let's see what is before it.
printRange(29450, 29475);

// GoPro lessons in block 3 start at 34230. Let's see what is before it.
printRange(34210, 34235);
