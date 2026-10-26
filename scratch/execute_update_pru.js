import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const rawLessonsData = [
  {
    title: "Introduction.",
    desc: "Introduction.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/AutQtpJCXFA/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AutQtpJCXFA/1080p/video.m3u8"
    }
  },
  {
    title: "What You Will Learn.",
    desc: "What You Will Learn.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/x7SbGKkunAf/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/x7SbGKkunAf/1080p/video.m3u8"
    }
  },
  {
    title: "Understanding Premiere Pro.",
    desc: "Understanding Premiere Pro.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6JFYxamBjSY/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JFYxamBjSY/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JFYxamBjSY/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JFYxamBjSY/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JFYxamBjSY/240p/video.m3u8"
    }
  },
  {
    title: "Setting Up a Sequence.",
    desc: "Setting Up a Sequence.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6XhxjEQ8nef/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6XhxjEQ8nef/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6XhxjEQ8nef/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6XhxjEQ8nef/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6XhxjEQ8nef/240p/video.m3u8"
    }
  },
  {
    title: "Importing Organizing Clips.",
    desc: "Importing Organizing Clips.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8HPnD7JSpNc/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HPnD7JSpNc/1080p/video.m3u8"
    }
  },
  {
    title: "Chopping Removing Green Screen.",
    desc: "Chopping Removing Green Screen.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/5DK7c8EdPsN/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DK7c8EdPsN/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DK7c8EdPsN/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DK7c8EdPsN/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DK7c8EdPsN/240p/video.m3u8"
    }
  },
  {
    title: "Essential Tools Menu Navigation.",
    desc: "Essential Tools Menu Navigation.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9EpZQNUJEKz/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9EpZQNUJEKz/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9EpZQNUJEKz/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9EpZQNUJEKz/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9EpZQNUJEKz/240p/video.m3u8"
    }
  },
  {
    title: "Key Frames Animation.",
    desc: "Key Frames Animation.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/47MtnQ45fDq/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/47MtnQ45fDq/1080p/video.m3u8"
    }
  },
  {
    title: "Adding Text.",
    desc: "Adding Text.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4pgxZQfggac/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4pgxZQfggac/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4pgxZQfggac/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4pgxZQfggac/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4pgxZQfggac/240p/video.m3u8"
    }
  },
  {
    title: "Royalty Music Audio Settings.",
    desc: "Royalty Music Audio Settings.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/nJCQFHCjjAm/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/nJCQFHCjjAm/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/nJCQFHCjjAm/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/nJCQFHCjjAm/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/nJCQFHCjjAm/240p/video.m3u8"
    }
  },
  {
    title: "Color Correction.",
    desc: "Color Correction.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8fE8jJsQtuE/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fE8jJsQtuE/1080p/video.m3u8"
    }
  },
  {
    title: "Export Settings.",
    desc: "Export Settings.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6pTSbCKjSAm/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6pTSbCKjSAm/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6pTSbCKjSAm/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6pTSbCKjSAm/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6pTSbCKjSAm/240p/video.m3u8"
    }
  },
  {
    title: "Bonus Render Setting For YouTube Compression.",
    desc: "Bonus Render Setting For YouTube Compression.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/Y8EgAYTCqk2/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Y8EgAYTCqk2/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Y8EgAYTCqk2/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Y8EgAYTCqk2/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Y8EgAYTCqk2/240p/video.m3u8"
    }
  }
];

function formatLessonBlock1_2(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_premiere_pro_unlocked_${index}",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  courseName: "Premiere Pro Unlocked",`);
  lines.push(`${indent}  thumbnail: premiereProUnlockedImg,`);
  lines.push(`${indent}  videoUrl: "${lesson.videoUrl}",`);
  
  // Format videoUrls
  lines.push(`${indent}  videoUrls: {`);
  const qualities = Object.keys(lesson.videoUrls);
  qualities.forEach((q, qIdx) => {
    const comma = qIdx === qualities.length - 1 ? "" : ",";
    lines.push(`${indent}    "${q}": "${lesson.videoUrls[q]}"${comma}`);
  });
  lines.push(`${indent}  },`);
  
  lines.push(`${indent}  isLocked: ${index === 0 ? "false" : "true"},`);
  lines.push(`${indent}  isComingSoon: false,`);
  lines.push(`${indent}  desc: "${lesson.desc}"`);
  lines.push(`${indent}},`);
  return lines;
}

function formatLessonBlock3(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_premiere_pro_unlocked_${index}",`);
  lines.push(`${indent}  courseName: "Premiere Pro Unlocked",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  thumbnail: premiereProUnlockedImg,`);
  lines.push(`${indent}  videoUrl: "${lesson.videoUrl}",`);
  
  // Format videoUrls
  lines.push(`${indent}  videoUrls: {`);
  const qualities = Object.keys(lesson.videoUrls);
  qualities.forEach((q, qIdx) => {
    const comma = qIdx === qualities.length - 1 ? "" : ",";
    lines.push(`${indent}    "${q}": "${lesson.videoUrls[q]}"${comma}`);
  });
  lines.push(`${indent}  },`);
  
  lines.push(`${indent}  duration: "10:00",`);
  lines.push(`${indent}  isLocked: ${index === 0 ? "false" : "true"},`);
  lines.push(`${indent}  isComingSoon: false,`);
  lines.push(`${indent}  desc: "${lesson.desc}"`);
  lines.push(`${indent}},`);
  return lines;
}

// Find occurrences of premium_plus_lesson_premiere_pro_unlocked_0
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_premiere_pro_unlocked_0"')) {
    occurrences.push(idx);
  }
});

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of premium_plus_lesson_premiere_pro_unlocked_0, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  let startIdx = occIdx;
  for (let j = occIdx; j >= 0; j--) {
    if (lines[j].trim() === '{') {
      startIdx = j;
      break;
    }
  }
  let lesson12IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_premiere_pro_unlocked_12"')) {
      lesson12IdIdx = j;
      break;
    }
  }
  if (lesson12IdIdx === -1) {
    throw new Error(`Could not find lesson 12 for occurrence at line ${occIdx + 1}`);
  }
  let endIdx = lesson12IdIdx;
  for (let j = lesson12IdIdx; j < lines.length; j++) {
    if (lines[j].trim() === '},' || lines[j].trim() === '}') {
      endIdx = j;
      break;
    }
  }
  
  let objCount = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (lines[i].trim() === '{') {
      objCount++;
    }
  }
  if (objCount !== 13) {
    throw new Error(`Expected exactly 13 lesson objects in range, found ${objCount} for occurrence ${occNum + 1}`);
  }
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Replacing Premiere Pro Unlocked block ranges in reverse order...");
for (let i = blockRanges.length - 1; i >= 0; i--) {
  const range = blockRanges[i];
  const startLineContent = lines[range.startIdx];
  const indent = startLineContent.substring(0, startLineContent.length - startLineContent.trimStart().length);
  
  const blockLines = [];
  if (i < 2) {
    // Occurrence 1 and 2
    rawLessonsData.forEach((lesson, index) => {
      blockLines.push(...formatLessonBlock1_2(lesson, index, indent));
    });
  } else {
    // Occurrence 3
    rawLessonsData.forEach((lesson, index) => {
      blockLines.push(...formatLessonBlock3(lesson, index, indent));
    });
  }
  
  lines.splice(range.startIdx, range.endIdx - range.startIdx + 1, ...blockLines);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("Successfully updated App.jsx with Premiere Pro Unlocked lessons!");
