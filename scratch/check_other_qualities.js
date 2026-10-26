import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'videoUrls' in App.jsx:");
let count = 0;
lines.forEach((line, idx) => {
  if (line.includes('videoUrls:')) {
    count++;
    if (count <= 10) {
      console.log(`\n--- Match ${count} (Line ${idx + 1}) ---`);
      for (let i = 0; i < 6; i++) {
        if (lines[idx + i]) {
          console.log(lines[idx + i].trim());
        }
      }
    }
  }
});
