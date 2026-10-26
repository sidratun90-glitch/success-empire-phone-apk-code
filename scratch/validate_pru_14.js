import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_premiere_pro_unlocked_0"')) {
    occurrences.push(idx);
  }
});

console.log(`Current occurrences of lesson 0 at lines: ${occurrences.map(o => o + 1).join(', ')}`);

occurrences.forEach((occIdx, occNum) => {
  console.log(`\n=================== OCCURRENCE ${occNum + 1} ===================`);
  
  // Print lesson 2
  let lesson2Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_2"')) {
      lesson2Occ = j;
      break;
    }
  }
  if (lesson2Occ !== -1) {
    let startIdx = lesson2Occ;
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
    console.log(`Lesson 2 (Line ${startIdx + 1} to ${endIdx + 1}):`);
    for (let j = startIdx; j <= endIdx; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
  
  // Print lesson 3
  let lesson3Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_3"')) {
      lesson3Occ = j;
      break;
    }
  }
  if (lesson3Occ !== -1) {
    let startIdx = lesson3Occ;
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
    console.log(`Lesson 3 (Line ${startIdx + 1} to ${endIdx + 1}):`);
    for (let j = startIdx; j <= endIdx; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
  
  // Print lesson 13
  let lesson13Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_13"')) {
      lesson13Occ = j;
      break;
    }
  }
  if (lesson13Occ !== -1) {
    let startIdx = lesson13Occ;
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
    console.log(`Lesson 13 (Line ${startIdx + 1} to ${endIdx + 1}):`);
    for (let j = startIdx; j <= endIdx; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
});
