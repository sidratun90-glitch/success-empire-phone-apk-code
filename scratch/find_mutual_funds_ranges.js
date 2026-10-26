import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_mutual_funds_0"')) {
    occurrences.push(idx);
  }
});

console.log(`Found ${occurrences.length} occurrences of mutual_funds_0:`);
occurrences.forEach((occIdx, occNum) => {
  // Find start of lesson 0 object
  let startIdx = occIdx;
  for (let j = occIdx; j >= 0; j--) {
    if (lines[j].trim() === '{') {
      startIdx = j;
      break;
    }
  }
  // Find end of lesson 17 object
  // It should be the end of the lesson block of 18 lessons
  // Let's search forwards from occIdx for premium_plus_lesson_mutual_funds_17
  let lesson17IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_mutual_funds_17"')) {
      lesson17IdIdx = j;
      break;
    }
  }
  if (lesson17IdIdx === -1) {
    console.log(`Error: Could not find lesson 17 for occurrence at line ${occIdx + 1}`);
    return;
  }
  let endIdx = lesson17IdIdx;
  for (let j = lesson17IdIdx; j < lines.length; j++) {
    if (lines[j].trim() === '},' || lines[j].trim() === '}') {
      endIdx = j;
      break;
    }
  }
  console.log(`Occurrence ${occNum + 1}:`);
  console.log(`  Line range in file: Lines ${startIdx + 1} to ${endIdx + 1}`);
  console.log(`  Start line content: "${lines[startIdx].trim()}" (line ${startIdx + 1})`);
  console.log(`  End line content: "${lines[endIdx].trim()}" (line ${endIdx + 1})`);
  
  // Let's count how many lesson objects ({ ... }) are in this range
  let objCount = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (lines[i].trim() === '{') {
      objCount++;
    }
  }
  console.log(`  Number of lesson objects in range: ${objCount}`);
});
