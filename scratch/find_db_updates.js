import fs from 'fs';
import path from 'path';

const scratchDir = 'c:/course app 3/scratch';
const files = fs.readdirSync(scratchDir);

console.log("Searching for Firestore update references in scratch scripts:");
files.forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(scratchDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('setDoc') || content.includes('updateDoc') || content.includes('packages') || content.includes('firebase.google.com')) {
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (line.includes('setDoc') || line.includes('updateDoc') || line.includes('packages')) {
          console.log(`  File: ${file}:${idx + 1}: ${line.trim()}`);
        }
      });
    }
  }
});
