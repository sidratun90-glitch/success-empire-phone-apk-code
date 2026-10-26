import fs from 'fs';
import path from 'path';

const src = 'C:/Users/HP/.gemini/antigravity-ide/brain/8ac5d673-8d1c-4dbb-8bc0-e55eb3343949/media__1786552372051.jpg';
const dest = 'c:/course app 3/src/assets/fl_studio_mastery.jpg';

try {
  fs.copyFileSync(src, dest);
  console.log("Successfully copied thumbnail to", dest);
} catch (e) {
  console.error("Failed to copy image:", e);
}
