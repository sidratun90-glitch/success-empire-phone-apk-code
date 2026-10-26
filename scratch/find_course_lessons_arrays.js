import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const keywords = ["grammar", "Freelance", "Foundations"];

lines.forEach((line, idx) => {
  keywords.forEach(keyword => {
    if (line.includes(keyword) && (line.includes('const ') || line.includes('let '))) {
      console.log(`${idx + 1}: ${line}`);
    }
  });
});
