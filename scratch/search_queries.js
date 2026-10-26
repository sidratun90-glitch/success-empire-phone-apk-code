import fs from 'fs';
const content = fs.readFileSync('src/App.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, index) => {
    if (line.includes('collection(') || line.includes('doc(') || line.includes('getDoc(') || line.includes('getDocs(') || line.includes('onSnapshot(') || line.includes('query(')) {
        console.log(`${index + 1}: ${line.trim()}`);
    }
});
