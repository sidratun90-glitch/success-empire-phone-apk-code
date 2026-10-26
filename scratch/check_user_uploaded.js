import fs from 'fs';
const dir = 'C:/Users/HP/.gemini/antigravity-ide/brain/4451e032-9e86-4056-8411-0268171c6108/.user_uploaded';

try {
  const files = fs.readdirSync(dir);
  console.log("Files in .user_uploaded:");
  files.forEach(f => {
    const stat = fs.statSync(dir + '/' + f);
    console.log(`  - ${f} (${(stat.size/1024).toFixed(2)} KB)`);
  });
} catch (e) {
  console.error("Error reading directory:", e);
}
