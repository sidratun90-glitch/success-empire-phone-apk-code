import fs from 'fs';
import path from 'path';

const searchDir = 'c:/course app 3';

function getFiles(dir, files_) {
  files_ = files_ || [];
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return files_;
  }
  for (let i in files) {
    let name = dir + '/' + files[i];
    if (name.includes('node_modules') || name.includes('.git') || name.includes('.gemini') || name.includes('.agents')) {
      continue;
    }
    let stat;
    try {
      stat = fs.statSync(name);
    } catch(e) {
      continue;
    }
    if (stat.isDirectory()) {
      getFiles(name, files_);
    } else {
      const ext = path.extname(name).toLowerCase();
      if (ext === '.pdf' || ext === '.docx' || ext === '.txt' || ext === '.zip' || ext === '.pptx' || ext === '.xlsx' || name.toLowerCase().includes('note') || name.toLowerCase().includes('resource')) {
        files_.push({ path: name, size: stat.size });
      }
    }
  }
  return files_;
}

const found = getFiles(searchDir);
console.log(`Found ${found.length} potential note files:`);
found.forEach(f => {
  console.log(`  - ${f.path} (${(f.size/1024).toFixed(2)} KB)`);
});
