import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const rawLessonsData = [
  {
    title: "Introduction.",
    desc: "Introduction to the Content Marketing course and overview of what we will cover.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/7jkZFXZcuhG/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7jkZFXZcuhG/1080p/video.m3u8"
    }
  },
  {
    title: "Outline of the Course.",
    desc: "A detailed roadmap of the course modules, exercises, and what you will learn.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/44Rmn2X3ZGD/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44Rmn2X3ZGD/1080p/video.m3u8"
    }
  },
  {
    title: "How to Choose a Profitable Niche.",
    desc: "How to find, evaluate, and select a highly profitable niche for your brand.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6JP3um6XSJu/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JP3um6XSJu/1080p/video.m3u8"
    }
  },
  {
    title: "Key Questions Before Building Your Brand.",
    desc: "Crucial questions to answer before starting your branding and content creation journey.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/zUK4zYKGXzZ/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/zUK4zYKGXzZ/1080p/video.m3u8"
    }
  },
  {
    title: "Game Changing Platforms For Your Brand.",
    desc: "Identifying and leveraging the best social media platforms to maximize reach.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/5K4YFkbP5fb/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5K4YFkbP5fb/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5K4YFkbP5fb/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5K4YFkbP5fb/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5K4YFkbP5fb/240p/video.m3u8"
    }
  },
  {
    title: "How To Create Content Strategy.",
    desc: "A step-by-step guide to building a consistent and effective content strategy.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6J7SB88KUPE/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6J7SB88KUPE/1080p/video.m3u8"
    }
  },
  {
    title: "Should You Post Daily.",
    desc: "Analyzing posting frequency, algorithm updates, and quality vs. quantity.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4sX5TF2jjAX/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4sX5TF2jjAX/1080p/video.m3u8"
    }
  },
  {
    title: "Top Free Social Media Marketing Tools.",
    desc: "The best free tools for design, scheduling, and analyzing your marketing campaigns.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8Dh3TFmAcR7/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8Dh3TFmAcR7/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8Dh3TFmAcR7/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8Dh3TFmAcR7/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8Dh3TFmAcR7/240p/video.m3u8"
    }
  },
  {
    title: "Why Branding Is Important.",
    desc: "Understanding the core values of branding and how it builds long-term customer trust.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/7SGpGR3zdCu/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7SGpGR3zdCu/1080p/video.m3u8"
    }
  },
  {
    title: "Marketing Vs Branding.",
    desc: "Breaking down the key differences and synergies between marketing and branding.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/AqEZ69qQQUe/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AqEZ69qQQUe/1080p/video.m3u8"
    }
  },
  {
    title: "Expert Branding Advice You Must Follow.",
    desc: "Crucial, field-tested advice from leading branding professionals.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4PagQ2p667A/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PagQ2p667A/1080p/video.m3u8"
    }
  },
  {
    title: "Mindset to Win Social Media.",
    desc: "Developing the psychological resilience and focus required for long-term social media success.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8SGzFZXDz8M/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SGzFZXDz8M/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SGzFZXDz8M/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SGzFZXDz8M/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SGzFZXDz8M/240p/video.m3u8"
    }
  },
  {
    title: "Let's Change The Game Together.",
    desc: "Concluding remarks, final action steps, and joining our creator community.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6x66UTZAfbz/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6x66UTZAfbz/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6x66UTZAfbz/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6x66UTZAfbz/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6x66UTZAfbz/240p/video.m3u8"
    }
  }
];

function formatLessonBlock1_2(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_content_marketing_${index}",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  courseName: "Content Marketing",`);
  lines.push(`${indent}  thumbnail: contentMarketingImg,`);
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
  lines.push(`${indent}  id: "premium_plus_lesson_content_marketing_${index}",`);
  lines.push(`${indent}  courseName: "Content Marketing",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  thumbnail: contentMarketingImg,`);
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

// Find occurrences of premium_plus_lesson_content_marketing_0
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_content_marketing_0"')) {
    occurrences.push(idx);
  }
});

console.log(`Found occurrences at lines: ${occurrences.map(o => o + 1).join(', ')}`);

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of premium_plus_lesson_content_marketing_0, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  // Find start of lesson 0 object
  let startIdx = occIdx;
  for (let j = occIdx; j >= 0; j--) {
    if (lines[j].trim() === '{') {
      startIdx = j;
      break;
    }
  }
  // Find end of lesson 12 object
  let lesson12IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_content_marketing_12"')) {
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
  
  // Count how many lesson objects ({ ... }) are in this range
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

console.log("Found valid block ranges:");
blockRanges.forEach((range, idx) => {
  console.log(`  Block ${idx + 1}: lines ${range.startIdx + 1} to ${range.endIdx + 1}`);
});

// Let's test generating formatting for block 1 and block 3
console.log("\nSample block 1 formatting (first lesson):");
const startLineContent = lines[blockRanges[0].startIdx];
const indent = startLineContent.substring(0, startLineContent.length - startLineContent.trimStart().length);
console.log(formatLessonBlock1_2(rawLessonsData[0], 0, indent).join('\n'));

console.log("\nSample block 3 formatting (first lesson):");
const startLineContent3 = lines[blockRanges[2].startIdx];
const indent3 = startLineContent3.substring(0, startLineContent3.length - startLineContent3.trimStart().length);
console.log(formatLessonBlock3(rawLessonsData[0], 0, indent3).join('\n'));
