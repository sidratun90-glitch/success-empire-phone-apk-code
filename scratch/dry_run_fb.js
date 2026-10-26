import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find occurrences of premium_plus_lesson_fb
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_fb"') && !line.includes('premium_plus_lesson_fb_')) {
    occurrences.push(idx);
  }
});

console.log(`Found occurrences of lesson 0 at lines: ${occurrences.map(o => o + 1).join(', ')}`);

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of premium_plus_lesson_fb, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  // Find start of lesson 0 object
  let startIdx = occIdx;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  
  // Find lesson 14
  let lesson14IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_fb_14"')) {
      lesson14IdIdx = j;
      break;
    }
  }
  if (lesson14IdIdx === -1) {
    throw new Error(`Could not find lesson 14 for occurrence at line ${occIdx + 1}`);
  }
  
  // Find start of lesson 14 object
  let lesson14Start = lesson14IdIdx;
  while (lesson14Start >= 0 && !lines[lesson14Start].includes('{')) {
    lesson14Start--;
  }
  
  // Trace closing brace of lesson 14 using brace tracking
  let endIdx = lesson14Start;
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
  
  // Count how many lesson objects ({ ... }) are in this range
  let objCount = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (lines[i].trim() === '{') {
      objCount++;
    }
  }
  if (objCount !== 14) {
    throw new Error(`Expected exactly 14 lesson objects in range, found ${objCount} for occurrence ${occNum + 1}`);
  }
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Found valid block ranges:");
blockRanges.forEach((range, idx) => {
  console.log(`  Block ${idx + 1}: lines ${range.startIdx + 1} to ${range.endIdx + 1}`);
});
