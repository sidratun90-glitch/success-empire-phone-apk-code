import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

// We extract all unique courseName values from lines 21053 to 29155
const courseNames = new Set();
for (let i = 21052; i < 29155; i++) {
  const line = lines[i];
  const match = /courseName:\s*["']([^"']+)["']/.exec(line);
  if (match) {
    courseNames.add(match[1]);
  }
}

// Check Canva and Mobile Video Editing array scopes as well
for (let i = 700; i < 1875; i++) {
  const line = lines[i];
  const match = /courseName:\s*["']([^"']+)["']/.exec(line);
  if (match) {
    courseNames.add(match[1]);
  }
}

console.log("Unique hardcoded course names:");
console.log(Array.from(courseNames).sort());
