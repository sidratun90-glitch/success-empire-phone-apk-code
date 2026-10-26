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

console.log(`Occurrences of lesson 0 at lines: ${occurrences.map(o => o + 1).join(', ')}`);

occurrences.forEach((occIdx, occNum) => {
  console.log(`\n=================== OCCURRENCE ${occNum + 1} ===================`);
  // Print 20 lines after the end of lesson 13 (or search for premium_plus_lesson_premiere_pro_unlocked_13)
  let lesson13Occ = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_13"')) {
      lesson13Occ = j;
      break;
    }
  }
  if (lesson13Occ !== -1) {
    console.log(`Found lesson 13 at line ${lesson13Occ + 1}`);
    for (let k = lesson13Occ; k < lesson13Occ + 25; k++) {
      console.log(`  ${k + 1}: ${lines[k]}`);
    }
  }
});
