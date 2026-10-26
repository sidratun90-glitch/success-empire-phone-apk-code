import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const rawLessonsData = [
  {
    title: "Introduction",
    desc: "Introduction to Facebook advertising and course overview.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6hjABgKsseh/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6hjABgKsseh/1080p/video.m3u8"
    }
  },
  {
    title: "Essential Tools for Facebook Advertising",
    desc: "Explore the essential tools and platforms required for running Facebook Ads.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/59jZe7XQZHb/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/59jZe7XQZHb/1080p/video.m3u8"
    }
  },
  {
    title: "Understanding Facebook Ads Structure",
    desc: "Learn how Facebook Ads campaigns, ad sets, and ads are structured.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/Ar2hTY2HmNc/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ar2hTY2HmNc/1080p/video.m3u8"
    }
  },
  {
    title: "Horizontal vs. Vertical Scaling Explained",
    desc: "Understand the difference between horizontal and vertical scaling techniques.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BMjYgTtQN8z/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BMjYgTtQN8z/1080p/video.m3u8"
    }
  },
  {
    title: "What is Pixel",
    desc: "An introduction to the Facebook Pixel and how it tracks conversion data.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/7zkms6Ndrpn/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7zkms6Ndrpn/1080p/video.m3u8"
    }
  },
  {
    title: "How To Create Pixel",
    desc: "Step-by-step guide to creating and setting up Facebook Pixel.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BcEesPsnRBH/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BcEesPsnRBH/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BcEesPsnRBH/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BcEesPsnRBH/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BcEesPsnRBH/240p/video.m3u8"
    }
  },
  {
    title: "Facebook Ads Support",
    desc: "How to contact and navigate Facebook Ads support for troubleshooting.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/rH4qfA2jpUD/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/rH4qfA2jpUD/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/rH4qfA2jpUD/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/rH4qfA2jpUD/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/rH4qfA2jpUD/240p/video.m3u8"
    }
  },
  {
    title: "Launching First Facebook Conversion Campaign",
    desc: "Step-by-step guide to launching your first conversion optimization campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/7qkRFYpuaHf/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qkRFYpuaHf/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qkRFYpuaHf/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qkRFYpuaHf/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qkRFYpuaHf/240p/video.m3u8"
    }
  },
  {
    title: "Creating Your First Facebook Lead Generation Campaign",
    desc: "Set up and publish a Facebook campaign optimized for lead generation.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8UnyPSAsH3d/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8UnyPSAsH3d/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8UnyPSAsH3d/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8UnyPSAsH3d/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8UnyPSAsH3d/240p/video.m3u8"
    }
  },
  {
    title: "Learn How To Retarget People",
    desc: "Strategies for retargeting website visitors and warm custom audiences.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6GRMMUTuN8m/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6GRMMUTuN8m/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6GRMMUTuN8m/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6GRMMUTuN8m/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6GRMMUTuN8m/240p/video.m3u8"
    }
  },
  {
    title: "Vertical Scaling Lookalike Audiences Explained",
    desc: "Scale your campaigns vertically by leveraging Lookalike Audiences.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/65bn8nzMfCh/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65bn8nzMfCh/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65bn8nzMfCh/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65bn8nzMfCh/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65bn8nzMfCh/240p/video.m3u8"
    }
  },
  {
    title: "Hidden Facebook Ads Strategies Insights",
    desc: "Uncover advanced strategies and hidden insights for professional advertisers.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/3q4QxFtyZc9/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3q4QxFtyZc9/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3q4QxFtyZc9/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3q4QxFtyZc9/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3q4QxFtyZc9/240p/video.m3u8"
    }
  },
  {
    title: "Unlocking the Full Potential of Facebook Ads",
    desc: "Optimize budgets and maximize return on ad spend (ROAS).",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/3MAYkJ23n8q/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3MAYkJ23n8q/1080p/video.m3u8"
    }
  },
  {
    title: "The 1 Lakh INR Roadmap - Your Path to Success",
    desc: "A comprehensive roadmap to scaling your business or client revenue.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6eCpaCYh4Fc/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6eCpaCYh4Fc/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6eCpaCYh4Fc/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6eCpaCYh4Fc/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6eCpaCYh4Fc/240p/video.m3u8"
    }
  }
];

function formatLessonBlock1_2(lesson, index, indent) {
  const idStr = index === 0 ? "fb" : `fb_${index + 1}`;
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_${idStr}",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  courseName: "Mastering Facebook Ads",`);
  lines.push(`${indent}  thumbnail: facebookAdsImg,`);
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
  const idStr = index === 0 ? "fb" : `fb_${index + 1}`;
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_${idStr}",`);
  lines.push(`${indent}  courseName: "Mastering Facebook Ads",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  thumbnail: facebookAdsImg,`);
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

// Find occurrences of premium_plus_lesson_fb
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_fb"') && !line.includes('premium_plus_lesson_fb_')) {
    occurrences.push(idx);
  }
});

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of premium_plus_lesson_fb, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  let startIdx = occIdx;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  
  let lesson14IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_fb_14"')) {
      lesson14IdIdx = j;
      break;
    }
  }
  if (lesson14IdIdx === -1) {
    throw new Error(`Could not find lesson 14 for occurrence at line ${occIdx + 1}`);
  }
  
  let lesson14Start = lesson14IdIdx;
  while (lesson14Start >= 0 && !lines[lesson14Start].includes('{')) {
    lesson14Start--;
  }
  
  let endIdx = lesson14Start;
  let braceCount = 0;
  while (endIdx < lines.length) {
    const openBraces = (lines[endIdx].match(/{/g) || []).length;
    const closeBraces = (lines[endIdx].match(/}/g) || []).length;
    braceCount += openBraces - closeBraces;
    if (braceCount === 0) {
      break;
    }
    endIdx++;
  }
  
  let objCount = 0;
  for (let i = startIdx; i <= endIdx; i++) {
    if (lines[i].trim() === '{') {
      objCount++;
    }
  }
  if (objCount !== 14) {
    throw new Error(`Expected exactly 14 lesson objects in range, found ${objCount} for occurrence ${occNum + 1}`);
  }
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Replacing Mastering Facebook Ads block ranges in reverse order...");
for (let i = blockRanges.length - 1; i >= 0; i--) {
  const range = blockRanges[i];
  const startLineContent = lines[range.startIdx];
  const indent = startLineContent.substring(0, startLineContent.length - startLineContent.trimStart().length);
  
  const blockLines = [];
  if (i < 2) {
    rawLessonsData.forEach((lesson, index) => {
      blockLines.push(...formatLessonBlock1_2(lesson, index, indent));
    });
  } else {
    rawLessonsData.forEach((lesson, index) => {
      blockLines.push(...formatLessonBlock3(lesson, index, indent));
    });
  }
  
  lines.splice(range.startIdx, range.endIdx - range.startIdx + 1, ...blockLines);
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log("Successfully updated App.jsx with Mastering Facebook Ads lessons!");
