import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

function traceContext(lineNo) {
  console.log(`\n--- Tracing context for line ${lineNo} ---`);
  // Let's print lines that look like function declarations or object keys above it (up to 100 lines)
  for (let idx = lineNo - 1; idx >= Math.max(0, lineNo - 250); idx--) {
    const line = lines[idx];
    if (line.includes('const ') || line.includes('let ') || line.includes('function ') || line.includes('=>') || (line.includes(':') && (line.includes('[') || line.includes('{')))) {
      if (!line.includes('desc:') && !line.includes('title:') && !line.includes('videoUrl:') && !line.includes('id:')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
      }
    }
  }
}

traceContext(32682);
traceContext(38578);
