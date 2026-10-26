import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_fb"') && !line.includes('premium_plus_lesson_fb_')) {
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
  
  // Lesson 5
  let lesson5Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_fb_6"')) { // fb_6 is index 5
      lesson5Occ = j;
      break;
    }
  }
  if (lesson5Occ !== -1) {
    let startIdx5 = lesson5Occ;
    while (startIdx5 >= 0 && !lines[startIdx5].includes('{')) {
      startIdx5--;
    }
    let endIdx5 = startIdx5;
    let braceCount5 = 0;
    while (endIdx5 < lines.length) {
      const openBraces = (lines[endIdx5].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx5].match(/}/g) || []).length;
      braceCount5 += openBraces - closeBraces;
      if (braceCount5 === 0) {
        break;
      }
      endIdx5++;
    }
    console.log(`Lesson 5 (Line ${startIdx5 + 1} to ${endIdx5 + 1}):`);
    for (let j = startIdx5; j <= endIdx5; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
  
  // Lesson 13
  let lesson13Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_fb_14"')) { // fb_14 is index 13
      lesson13Occ = j;
      break;
    }
  }
  if (lesson13Occ !== -1) {
    let startIdx13 = lesson13Occ;
    while (startIdx13 >= 0 && !lines[startIdx13].includes('{')) {
      startIdx13--;
    }
    let endIdx13 = startIdx13;
    let braceCount13 = 0;
    while (endIdx13 < lines.length) {
      const openBraces = (lines[endIdx13].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx13].match(/}/g) || []).length;
      braceCount13 += openBraces - closeBraces;
      if (braceCount13 === 0) {
        break;
      }
      endIdx13++;
    }
    console.log(`Lesson 13 (Line ${startIdx13 + 1} to ${endIdx13 + 1}):`);
    for (let j = startIdx13; j <= endIdx13; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
});
