import fs from 'fs';

const content = fs.readFileSync('c:/course app 3/src/App.jsx', 'utf8');
const lines = content.split('\n');

console.log("Searching for firestore fetching / snapshots in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('onSnapshot') || line.includes('getDocs') || line.includes('collection(db') || line.includes('rawPackages')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
