import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const lineNumbers = [25159, 33174, 38601];

lineNumbers.forEach((lineNum, blockIdx) => {
  console.log(`\nBlock ${blockIdx + 1} fields:`);
  let start = -1;
  let end = -1;
  // Scan backwards to find {
  for (let idx = lineNum - 1; idx >= 0; idx--) {
    if (lines[idx].trim() === '{') {
      start = idx;
      break;
    }
  }
  // Scan forwards to find }
  for (let idx = lineNum - 1; idx < lines.length; idx++) {
    if (lines[idx].trim() === '},' || lines[idx].trim() === '}') {
      end = idx;
      break;
    }
  }
  if (start !== -1 && end !== -1) {
    for (let i = start; i <= end; i++) {
      console.log(`  ${lines[i].trim()}`);
    }
  } else {
    console.log("Could not find bounds");
  }
});
