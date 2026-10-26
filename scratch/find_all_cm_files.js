import fs from 'fs';
import path from 'path';

const rootDir = 'c:/course app 3';

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (let file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.agents' && file !== '.gemini') {
        searchDir(fullPath);
      }
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.json') || file.endsWith('.html')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('Content Marketing')) {
          console.log(`Found match in: ${fullPath}`);
        }
      }
    }
  }
}

searchDir(rootDir);
