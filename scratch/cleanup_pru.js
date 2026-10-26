import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

console.log("Locating the leftover lines after 'premium_plus_lesson_premiere_pro_unlocked_13'...");

let foundCount = 0;
// We will search backwards from lines.length-1 to 0 to make deletion safe
for (let idx = lines.length - 1; idx >= 0; idx--) {
  const line = lines[idx];
  if (line.includes('id: "premium_plus_lesson_premiere_pro_unlocked_13"')) {
    foundCount++;
    console.log(`\nOccurrence ${foundCount} at line ${idx + 1}:`);
    
    // Find the closing brace of this lesson 13 block starting from idx
    let startIdx = idx;
    while (startIdx >= 0 && !lines[startIdx].includes('{')) {
      startIdx--;
    }
    
    // Find closing brace of this object
    let endIdx = startIdx;
    let braceCount = 0;
    while (endIdx < lines.length) {
      const openBraces = (lines[endIdx].match(/{/g) || []).length;
      const closeBraces = (lines[endIdx].match(/}/g) || []).length;
      braceCount += openBraces - closeBraces;
      if (braceCount === 0) {
        break;
      }
      endIdx++;
    }
    
    console.log(`Closing brace of lesson 13 is at line ${endIdx + 1}: ${lines[endIdx].trim()}`);
    
    // The duplicate lines are directly after endIdx, before the next object start '{' or array spread '...' or array end ']'
    let duplicateStart = endIdx + 1;
    let duplicateEnd = duplicateStart;
    
    while (duplicateEnd < lines.length) {
      const nextLine = lines[duplicateEnd].trim();
      if (nextLine.includes('{') || nextLine.startsWith('...') || nextLine.startsWith(']') || nextLine.includes('sales_pro')) {
        break;
      }
      duplicateEnd++;
    }
    
    if (duplicateEnd > duplicateStart) {
      console.log(`Removing duplicate lines from line ${duplicateStart + 1} to ${duplicateEnd}:`);
      for (let j = duplicateStart; j < duplicateEnd; j++) {
        console.log(`  - ${lines[j].trim()}`);
      }
      lines.splice(duplicateStart, duplicateEnd - duplicateStart);
    } else {
      console.log("No duplicate lines found here.");
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("\nCleanup done!");
