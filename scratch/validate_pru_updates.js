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
  
  // Find lesson 2
  let lesson2Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_2"')) {
      lesson2Occ = j;
      break;
    }
  }
  if (lesson2Occ !== -1) {
    let startIdx2 = lesson2Occ;
    while (startIdx2 >= 0 && !lines[startIdx2].includes('{')) {
      startIdx2--;
    }
    let endIdx2 = startIdx2;
    let braceCount2 = 0;
    while (endIdx2 < lines.length) {
      const openBraces = (lines[endIdx2].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx2].match(/}/g) || []).length;
      braceCount2 += openBraces - closeBraces;
      if (braceCount2 === 0) {
        break;
      }
      endIdx2++;
    }
    console.log(`Lesson 2 (Line ${startIdx2 + 1} to ${endIdx2 + 1}):`);
    for (let j = startIdx2; j <= endIdx2; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
});
