import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

console.log("Searching for setDoc, updateDoc, or addDoc in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('setDoc') || line.includes('updateDoc') || line.includes('addDoc')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
