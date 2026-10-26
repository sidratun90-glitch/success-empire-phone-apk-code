import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_value_investing_0"')) {
    occurrences.push(idx);
  }
});

console.log(`Found occurrences of lesson 0 at lines: ${occurrences.map(o => o + 1).join(', ')}`);

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of premium_plus_lesson_value_investing_0, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  let startIdx = occIdx;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  
  let lesson17IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_value_investing_17"')) {
      lesson17IdIdx = j;
      break;
    }
  }
  if (lesson17IdIdx === -1) {
    throw new Error(`Could not find lesson 17 for occurrence at line ${occIdx + 1}`);
  }
  
  let lesson17Start = lesson17IdIdx;
  while (lesson17Start >= 0 && !lines[lesson17Start].includes('{')) {
    lesson17Start--;
  }
  
  let endIdx = lesson17Start;
  let braceCount = 0;
  while (endIdx < lines.length) {
    const openBraces = (lines[endIdx].match(/{/g) || []).length;
    const closeBraces = (lines[endIdx].match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;
    if (braceCount === 0) {
      break;
    }
    endIdx++;
  }
  
  let objCount = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (lines[i].trim() === '{') {
      objCount++;
    }
  }
  if (objCount !== 18) {
    throw new Error(`Expected exactly 18 lesson objects in range, found ${objCount} for occurrence ${occNum + 1}`);
  }
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Found valid block ranges:");
blockRanges.forEach((range, idx) => {
  console.log(`  Block ${idx + 1}: lines ${range.startIdx + 1} to ${range.endIdx + 1}`);
});
