import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function verifyLesson(startLine, blockName) {
  console.log(`\n=== Verifying ${blockName} starting around line ${startLine} ===`);
  for (let i = 0; i < 30; i++) {
    console.log(`${startLine + i}: ${lines[startLine - 1 + i]}`);
  }
}

// Locate Block 1
const b1Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_meta_ads_sell_0"') && idx < 25000) - 1;
verifyLesson(b1Start + 1, "Block 1");

// Let's print out lines around premium_plus_lesson_meta_ads_sell_25 (to make sure it's unchanged) and premium_plus_lesson_meta_ads_sell_26 (to make sure it's updated) in Block 1
const idx25 = lines.findIndex(l => l.includes('id: "premium_plus_lesson_meta_ads_sell_25"'));
if (idx25 >= 0) {
  console.log(`\n=== Checking index 25 & 26 inside Block 1 ===`);
  for (let i = -1; i < 20; i++) {
    console.log(`${idx25 + i + 1}: ${lines[idx25 + i]}`);
  }
}
