import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function verifyLesson(startLine, blockName) {
  console.log(`\n=== Verifying ${blockName} starting around line ${startLine} ===`);
  for (let i = 0; i < 25; i++) {
    console.log(`${startLine + i}: ${lines[startLine - 1 + i]}`);
  }
}

// Locate Block 1
const b1Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx < 25000) - 1;
verifyLesson(b1Start + 1, "Block 1");

// Locate Block 2
const b2Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx > 25000 && idx < 32000) - 1;
verifyLesson(b2Start + 1, "Block 2");

// Locate Block 3
const b3Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx > 32000) - 1;
verifyLesson(b3Start + 1, "Block 3");
