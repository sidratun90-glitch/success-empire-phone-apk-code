import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

console.log("Searching for the end of VideoPlayerScreen in App.jsx:");
lines.forEach((line, idx) => {
  if (line.includes('const VideoPlayerScreen =') || line.includes('function VideoPlayerScreen')) {
    console.log(`Starts at Line ${idx + 1}`);
  }
  if (line.trim() === '};' || line.trim() === 'export default App;') {
    if (idx > 10500 && idx < 12000) {
      console.log(`Potential end at Line ${idx + 1}: ${line}`);
    }
  }
});
