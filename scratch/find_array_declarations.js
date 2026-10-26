import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Analyzing arrays containing Content Marketing lessons:");

const targets = [24084, 32682, 38578];

targets.forEach(lineNo => {
  console.log(`\n--- Looking around line ${lineNo} ---`);
  // scan upwards to find array declaration
  let foundDecl = null;
  for (let idx = lineNo; idx >= Math.max(0, lineNo - 500); idx--) {
    const line = lines[idx];
    if (line.includes('const ') || line.includes('let ') || line.includes('var ')) {
      if (line.includes('[') || line.includes('=')) {
        foundDecl = { lineNo: idx + 1, content: line.trim() };
        break;
      }
    }
  }
  if (foundDecl) {
    console.log(`Found declaration at line ${foundDecl.lineNo}: ${foundDecl.content}`);
  } else {
    console.log("No declaration found in the 500 lines above.");
  }
  
  // Also print the lesson object at that lineNo to see the exact keys
  let startIdx = lineNo - 1;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  let endIdx = lineNo - 1;
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
  console.log(`Lesson content:`);
  for (let j = startIdx; j <= endIdx; j++) {
    console.log(`  ${j+1}: ${lines[j]}`);
  }
});
