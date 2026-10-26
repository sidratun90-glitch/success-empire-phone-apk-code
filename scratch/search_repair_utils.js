import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for keywords related to database initialize/sync/repair in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('repair') || line.includes('sync') || line.includes('upload') || line.includes('initial') || line.includes('restore')) {
    if (line.includes('pkg') || line.includes('pack') || line.includes('db') || line.includes('Fire')) {
      console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
  }
});
