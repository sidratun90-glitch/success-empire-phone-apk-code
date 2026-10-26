import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_content_marketing_0"')) {
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
  
  // Find lesson 4
  let lesson4Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_content_marketing_4"')) {
      lesson4Occ = j;
      break;
    }
  }
  if (lesson4Occ !== -1) {
    let startIdx4 = lesson4Occ;
    while (startIdx4 >= 0 && !lines[startIdx4].includes('{')) {
      startIdx4--;
    }
    let endIdx4 = startIdx4;
    let braceCount4 = 0;
    while (endIdx4 < lines.length) {
      const openBraces = (lines[endIdx4].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx4].match(/}/g) || []).length;
      braceCount4 += openBraces - closeBraces;
      if (braceCount4 === 0) {
        break;
      }
      endIdx4++;
    }
    console.log(`Lesson 4 (Line ${startIdx4 + 1} to ${endIdx4 + 1}):`);
    for (let j = startIdx4; j <= endIdx4; j++) {
      console.log(`  ${lines[j]}`);
    }
  }
});
