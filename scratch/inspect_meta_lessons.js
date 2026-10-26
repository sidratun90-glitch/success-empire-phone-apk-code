import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

function inspectBlock(startLine, endLine, blockName) {
  console.log(`\n=== Inspecting ${blockName} (Lines ${startLine} to ${endLine}) ===`);
  let count = 0;
  for (let i = startLine - 1; i < endLine; i++) {
    const line = lines[i];
    if (line.includes('id:') && line.includes('premium_plus_lesson_meta_ads_')) {
      count++;
      const matchId = line.match(/id:\s*["']([^"']+)["']/);
      const titleLine = lines[i + 1].includes('title:') ? lines[i + 1] : lines[i + 2];
      const matchTitle = titleLine.match(/title:\s*["']([^"']+)["']/);
      console.log(`  Lesson ${count}: ID=${matchId ? matchId[1] : 'N/A'}, Title="${matchTitle ? matchTitle[1] : 'N/A'}"`);
    }
  }
}

// Block 1 (around lines 24000 to 24400)
inspectBlock(24000, 24450, "Block 1 (lessonsList)");

// Block 2 (around lines 31900 to 32250)
inspectBlock(31900, 32250, "Block 2 (Firestore default packages)");

// Block 3 (around lines 37050 to 37480)
inspectBlock(37050, 37480, "Block 3 (ignored pull refresh)");
