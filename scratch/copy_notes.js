import fs from 'fs';

const srcDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/4451e032-9e86-4056-8411-0268171c6108/.user_uploaded';
const destDir = 'c:/course app 3/public';

const filesToCopy = [
  { src: 'media_1786787550915.pdf', dest: 'AI_Master_Class_Course_Resource_1.pdf' },
  { src: 'media_1786787550996.pdf', dest: 'AI_Master_Class_Course_Resource_2.pdf' },
  { src: 'media_1786787550999.pdf', dest: 'AI_Master_Class_Course_Resource_3.pdf' },
  { src: 'media_1786787551082.pdf', dest: 'AI_Master_Class_Course_Resource_4.pdf' }
];

console.log("Copying files...");
filesToCopy.forEach(f => {
  const srcPath = `${srcDir}/${f.src}`;
  const destPath = `${destDir}/${f.dest}`;
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
