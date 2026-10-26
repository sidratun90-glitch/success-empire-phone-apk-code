import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

const arrays = [
  "canvaLessons",
  "mobileVideoLessons",
  "aiFoundations",
  "freelanceHindi",
  "englishGrammar",
  "lessonsList"
];

arrays.forEach(arr => {
  console.log(`\nUsage of array: "${arr}"`);
  lines.forEach((line, idx) => {
    if (line.includes(arr) && !line.includes(`const ${arr} =`)) {
      console.log(`  Line ${idx + 1}: ${line.trim()}`);
    }
  });
});
