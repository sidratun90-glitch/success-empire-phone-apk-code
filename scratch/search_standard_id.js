import fs from 'fs';
import path from 'path';

function walk(dir, cb) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'scratch' && f !== 'dist') {
        walk(p, cb);
      }
    } else {
      cb(p);
    }
  });
}

walk('c:/course app 3', (file) => {
  if (file.endsWith('.js') || file.endsWith('.jsx')) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('2000000000000')) {
      console.log(`Found in: ${file}`);
      const lines = content.split('\n');
      lines.forEach((l, idx) => {
        if (l.includes('2000000000000')) {
          console.log(`  Line ${idx + 1}: ${l.trim()}`);
        }
      });
    }
  }
});
