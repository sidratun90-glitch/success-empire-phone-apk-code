import fs from 'fs';

const files = fs.readdirSync('src/assets');
console.log("Matching assets in src/assets:");
files.forEach(f => {
  const lf = f.toLowerCase();
  if (lf.includes('master') || lf.includes('class') || lf.includes('ai') || lf.includes('1')) {
    console.log(f);
  }
});
