import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const block1SearchStart = 20990;
const block1SearchEnd = 27766;

console.log("=== Blender Lessons in lessonsList ===");
let count = 0;
for (let idx = block1SearchStart - 1; idx < block1SearchEnd; idx++) {
  const line = lines[idx];
  if (!line) continue;
  if (line.includes('courseName: "Blender Megacourse"') || line.includes("courseName: 'Blender Megacourse'")) {
    let startIdx = idx;
    for (let j = idx; j >= 0; j--) {
      if (lines[j].trim() === '{') {
        startIdx = j;
        break;
      }
    }
    let endIdx = idx;
    for (let j = idx; j < lines.length; j++) {
      if (lines[j].trim() === '},' || lines[j].trim() === '}') {
        endIdx = j;
        break;
      }
    }
    const lessonLines = lines.slice(startIdx, endIdx + 1);
    const id = lessonLines.find(l => l.includes('id:')).trim();
    const title = lessonLines.find(l => l.includes('title:')).trim();
    console.log(`  ${count}: Line ${startIdx + 1}-${endIdx + 1} | ${id} | ${title}`);
    count++;
  }
}
