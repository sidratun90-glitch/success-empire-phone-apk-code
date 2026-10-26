import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'Content Marketing' lessons in App.jsx:");

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('courseName:') && line.includes('Content Marketing')) {
    // Let's trace backwards to find where the object starts (usually '{')
    let startIdx = i;
    while (startIdx >= 0 && !lines[startIdx].includes('{')) {
      startIdx--;
    }
    // Let's trace forwards to find where the object ends (usually '}')
    let endIdx = i;
    let braceCount = 0;
    while (endIdx < lines.length) {
      const openBraces = (lines[endIdx].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx].match(/}/g) || []).length;
      braceCount += openBraces - closeBraces;
      if (braceCount <= 0 && endIdx > startIdx) {
        break;
      }
      endIdx++;
    }
    console.log(`\nLesson block at lines ${startIdx + 1} to ${endIdx + 1}:`);
    for (let j = startIdx; j <= endIdx; j++) {
      console.log(`${j + 1}: ${lines[j]}`);
    }
  }
}
