import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("=== All Mastery of Stock Market Course lessons in App.jsx ===");
lines.forEach((line, idx) => {
  if (line.includes('courseName: "Mastery of Stock Market Course"') || line.includes("courseName: 'Mastery of Stock Market Course'")) {
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
    console.log(`Line ${startIdx + 1}-${endIdx + 1} | ${id} | ${title}`);
  }
});
