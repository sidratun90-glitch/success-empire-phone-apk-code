import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for Instagram/insta references in App.jsx:");
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('instagram course') || line.toLowerCase().includes('insta_1') || line.toLowerCase().includes('insta_2')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
