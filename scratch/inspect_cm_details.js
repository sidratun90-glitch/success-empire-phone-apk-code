import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Analyzing all matches for 'Content Marketing' courseName in App.jsx:");

let matches = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('courseName:') && line.includes('Content Marketing')) {
    // trace start
    let startIdx = i;
    while (startIdx >= 0 && !lines[startIdx].includes('{')) {
      startIdx--;
    }
    // trace end
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
// Since they appear in blocks, we can see if they are in contiguous lists.
let currentBlock = [];
for (let m of matches) {
  if (currentBlock.length === 0) {
    currentBlock.push(m);
  } else {
    let last = currentBlock[currentBlock.length - 1];
    if (m.start - last.end < 20) {
      currentBlock.push(m);
    } else {
      printBlock(currentBlock);
      currentBlock = [m];
    }
  }
}
if (currentBlock.length > 0) {
  printBlock(currentBlock);
}

function printBlock(block) {
  const start = block[0].start;
  const end = block[block.length - 1].end;
  console.log(`\n=================== BLOCK: Lines ${start + 1} to ${end + 1} ===================`);
  // Let's print the container line or lines before the block
  for (let idx = Math.max(0, start - 5); idx < start; idx++) {
    console.log(`PRE ${idx + 1}: ${lines[idx]}`);
  }
  for (let m of block) {
    console.log(`Lesson [${m.start + 1} - ${m.end + 1}]:`);
    for (let idx = m.start; idx <= m.end; idx++) {
      console.log(`  ${idx + 1}: ${lines[idx]}`);
    }
  }
  for (let idx = end + 1; idx <= Math.min(lines.length - 1, end + 5); idx++) {
    console.log(`POST ${idx + 1}: ${lines[idx]}`);
  }
}
