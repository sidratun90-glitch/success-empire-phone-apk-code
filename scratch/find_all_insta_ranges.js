import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startLine = -1;
let endLine = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('premium_plus_lesson_insta_1') && line.includes('id:') && !line.includes('insta_10')) {
    // Find the opening brace of this lesson object
    let tempStart = i;
    for (let j = i; j >= 0; j--) {
      if (lines[j].trim().startsWith('{')) {
        tempStart = j;
        break;
      }
    }
    startLine = tempStart + 1; // 1-indexed
  }
  if (line.includes('premium_plus_lesson_insta_10') && line.includes('id:')) {
    // Find the closing brace of this lesson object
    let tempEnd = i;
    for (let j = i; j < lines.length; j++) {
      if (lines[j].trim().startsWith('},')) {
        tempEnd = j;
        break;
      }
    }
    endLine = tempEnd + 1; // 1-indexed
    console.log(`Found full range: Lines ${startLine} to ${endLine}`);
    
    // Snip first 3 and last 3 lines
    console.log("  Start:");
    for (let k = startLine - 1; k < startLine + 2; k++) {
      console.log(`    ${k+1}: ${lines[k]}`);
    }
    console.log("  End:");
    for (let k = endLine - 3; k < endLine; k++) {
      console.log(`    ${k+1}: ${lines[k]}`);
    }
    startLine = -1;
    endLine = -1;
  }
}
