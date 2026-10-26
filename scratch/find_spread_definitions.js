import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const targets = ["promptEngLessons", "cloudKitchenLessons", "stockMarketLessons"];

lines.forEach((line, idx) => {
  targets.forEach(t => {
    if (line.includes(`const ${t}`) || line.includes(`let ${t}`)) {
      console.log(`${t} starts at line ${idx + 1}`);
    }
  });
});
