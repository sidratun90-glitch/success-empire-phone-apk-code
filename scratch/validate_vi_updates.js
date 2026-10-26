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

console.log(`Current occurrences of lesson 0 at lines: ${occurrences.map(o => o + 1).join(', ')}`);

occurrences.forEach((occIdx, occNum) => {
  console.log(`\n=================== OCCURRENCE ${occNum + 1} ===================`);
  
  // Lesson 0
  let startIdx = occIdx;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  let endIdx = startIdx;
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
  console.log(`Lesson 0 (Line ${startIdx + 1} to ${endIdx + 1}):`);
  for (let j = startIdx; j <= endIdx; j++) {
    console.log(`  ${lines[j]}`);
  }
  
  // Lesson 6 (More Ratio & Concepts - Part 1)
  let lesson6Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_value_investing_6"')) {
      lesson6Occ = j;
      break;
    }
  }
  if (lesson6Occ !== -1) {
    let startIdx6 = lesson6Occ;
    while (startIdx6 >= 0 && !lines[startIdx6].includes('{')) {
      startIdx6--;
    }
    let endIdx6 = startIdx6;
    let braceCount6 = 0;
    while (endIdx6 < lines.length) {
      const openBraces = (lines[endIdx6].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx6].match(/}/g) || []).length;
      braceCount6 += openBraces - closeBraces;
      if (braceCount6 === 0) {
        break;
      }
      endIdx6++;
    }
    console.log(`Lesson 6 (Line ${startIdx6 + 1} to ${endIdx6 + 1}):`);
    for (let j = startIdx6; j <= endIdx6; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
  
  // Lesson 17 (Building a Strong Value Investing Portfolio)
  let lesson17Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_value_investing_17"')) {
      lesson17Occ = j;
      break;
    }
  }
  if (lesson17Occ !== -1) {
    let startIdx17 = lesson17Occ;
    while (startIdx17 >= 0 && !lines[startIdx17].includes('{')) {
      startIdx17--;
    }
    let endIdx17 = startIdx17;
    let braceCount17 = 0;
    while (endIdx17 < lines.length) {
      const openBraces = (lines[endIdx17].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx17].match(/}/g) || []).length;
      braceCount17 += openBraces - closeBraces;
      if (braceCount17 === 0) {
        break;
      }
      endIdx17++;
    }
    console.log(`Lesson 17 (Line ${startIdx17 + 1} to ${endIdx17 + 1}):`);
    for (let j = startIdx17; j <= endIdx17; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
});

// Print the database auto-sync code block to verify viNeeds was inserted correctly
console.log("\n=================== DATABASE AUTO-SYNC BLOCK ===================");
const syncStartIdx = lines.findIndex(l => l.includes('// 1. Sync Premium Plus Package (2000000000003)'));
if (syncStartIdx !== -1) {
  for (let k = syncStartIdx - 12; k < syncStartIdx + 20; k++) {
    console.log(`${k + 1}: ${lines[k]}`);
  }
}
