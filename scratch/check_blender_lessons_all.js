import fs from 'fs';
const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find all occurrences of courseName: "Blender Megacourse"
lines.forEach((line, idx) => {
  if (line.includes('courseName: "Blender Megacourse"') || line.includes("courseName: 'Blender Megacourse'")) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    // Find preceding lines starting with let or const
    for (let j = idx - 1; j >= 0; j--) {
      const l = lines[j];
      if (l.includes('let ') || l.includes('const ') || l.includes('pkgData.lessons = [')) {
        console.log(`  Declared in: ${l.trim()} at line ${j + 1}`);
        break;
      }
    }
  }
});
