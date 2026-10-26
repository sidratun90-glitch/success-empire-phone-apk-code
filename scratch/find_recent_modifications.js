import fs from 'fs';
import path from 'path';

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (name.includes('node_modules') || name.includes('.git') || name.includes('dist')) continue;
    try {
      const stat = fs.statSync(name);
      if (stat.isDirectory()) {
        getFiles(name, filesList);
      } else {
        filesList.push({ name, mtime: stat.mtime });
      }
    } catch (e) {
      // skip
    }
  }
  return filesList;
}

const allFiles = getFiles('c:/course app 3');
allFiles.sort((a, b) => b.mtime - a.mtime);

console.log("Recently modified files (top 15):");
allFiles.slice(0, 15).forEach(f => {
  console.log(`- ${f.name} (Modified at: ${f.mtime.toLocaleString()})`);
});
