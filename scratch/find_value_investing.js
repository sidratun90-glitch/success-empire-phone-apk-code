import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for 'Guide to Value Investing' lessons in App.jsx:");

let matches = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('courseName:') && line.includes('Guide to Value Investing')) {
    let startIdx = i;
    while (startIdx >= 0 && !lines[startIdx].includes('{')) {
      startIdx--;
    }
    let endIdx = i;
    let braceCount = 0;
    while (endIdx < lines.length) {
      const openBraces = (lines[endIdx].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx].match(/}/g) || []).length;
      braceCount += openBraces - closeBraces;
      if (braceCount <= 0 && endIdx > startIdx) {
        break;
      }
      endIdx++;
    }
    matches.push({ start: startIdx, end: endIdx, lineNo: i });
  }
}

console.log(`Found ${matches.length} lesson objects.`);

// Group them by range
let currentBlock = [];
let blocks = [];
for (let m of matches) {
  if (currentBlock.length === 0) {
    currentBlock.push(m);
  } else {
    let last = currentBlock[currentBlock.length - 1];
    if (m.start - last.end < 20) {
      currentBlock.push(m);
    } else {
      blocks.push(currentBlock);
      currentBlock = [m];
    }
  }
}
if (currentBlock.length > 0) {
  blocks.push(currentBlock);
}

blocks.forEach((block, idx) => {
  const start = block[0].start;
  const end = block[block.length - 1].end;
  console.log(`\nBlock ${idx + 1}: Lines ${start + 1} to ${end + 1} (${block.length} lessons)`);
  console.log(`  First lesson:`);
  for (let j = block[0].start; j <= block[0].end; j++) {
    console.log(`    ${lines[j].trim()}`);
  }
  console.log(`  Last lesson:`);
  for (let j = block[block.length - 1].start; j <= block[block.length - 1].end; j++) {
    console.log(`    ${lines[j].trim()}`);
  }
});
