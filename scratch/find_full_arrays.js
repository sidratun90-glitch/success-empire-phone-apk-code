import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const targets = [24084, 32682, 38578];

targets.forEach(lineNo => {
  console.log(`\n--- Looking around line ${lineNo} ---`);
  let found = false;
  for (let idx = lineNo - 1; idx >= 0; idx--) {
    const line = lines[idx];
    const match = line.match(/^\s*(let|const|var)\s+(\w+)\s*=/);
    if (match) {
      console.log(`Found declaration above: Line ${idx + 1}: ${line.trim()}`);
      found = true;
      break;
    }
  }
  if (!found) {
    console.log("No declaration found.");
  }
});
