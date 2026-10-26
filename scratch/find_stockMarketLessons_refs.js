import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('stockMarketLessons')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
