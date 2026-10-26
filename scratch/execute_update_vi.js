import fs from 'fs';

const filePath = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(filePath, 'utf8');
let lines = content.split('\n');

const rawLessonsData = [
  {
    title: "Introduction to Value Investing.",
    desc: "Introduction to Value Investing.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BUDUCgJg88Z/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BUDUCgJg88Z/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BUDUCgJg88Z/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BUDUCgJg88Z/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BUDUCgJg88Z/240p/video.m3u8"
    }
  },
  {
    title: "Different Investment Strategies.",
    desc: "Different Investment Strategies.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/37FXNa7Tu56/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/37FXNa7Tu56/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/37FXNa7Tu56/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/37FXNa7Tu56/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/37FXNa7Tu56/240p/video.m3u8"
    }
  },
  {
    title: "Core Principles of Value Investing.",
    desc: "Core Principles of Value Investing.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8MZjBDA4994/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8MZjBDA4994/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8MZjBDA4994/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8MZjBDA4994/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8MZjBDA4994/240p/video.m3u8"
    }
  },
  {
    title: "Prominent Value Investing.",
    desc: "Prominent Value Investing.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/B3q84mtSaH3/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3q84mtSaH3/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3q84mtSaH3/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3q84mtSaH3/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3q84mtSaH3/240p/video.m3u8"
    }
  },
  {
    title: "Key Stock Market Concepts.",
    desc: "Key Stock Market Concepts.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8SpsdS3YPzC/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SpsdS3YPzC/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SpsdS3YPzC/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SpsdS3YPzC/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8SpsdS3YPzC/240p/video.m3u8"
    }
  },
  {
    title: "Understanding Concepts Of Value Investing.",
    desc: "Understanding Concepts Of Value Investing.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/B3ek38BRThx/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3ek38BRThx/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3ek38BRThx/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3ek38BRThx/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/B3ek38BRThx/240p/video.m3u8"
    }
  },
  {
    title: "More Ratio & Concepts - Part 1.",
    desc: "More Ratio & Concepts - Part 1.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/7yUxZpTNgS2/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7yUxZpTNgS2/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7yUxZpTNgS2/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7yUxZpTNgS2/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7yUxZpTNgS2/240p/video.m3u8"
    }
  },
  {
    title: "More Ratio & Concepts - Part 2.",
    desc: "More Ratio & Concepts - Part 2.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9jzFcc2Xe27/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9jzFcc2Xe27/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9jzFcc2Xe27/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9jzFcc2Xe27/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9jzFcc2Xe27/240p/video.m3u8"
    }
  },
  {
    title: "How to Identify Value Stocks – Part 1.",
    desc: "How to Identify Value Stocks – Part 1.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/ADxjYpjGNcU/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/ADxjYpjGNcU/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/ADxjYpjGNcU/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/ADxjYpjGNcU/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/ADxjYpjGNcU/240p/video.m3u8"
    }
  },
  {
    title: "How to Identify Value Stocks – Part 2.",
    desc: "How to Identify Value Stocks – Part 2.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8GecTqgKfdn/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8GecTqgKfdn/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8GecTqgKfdn/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8GecTqgKfdn/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8GecTqgKfdn/240p/video.m3u8"
    }
  },
  {
    title: "Nifty 50 Value 20 Index.",
    desc: "Nifty 50 Value 20 Index.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/3JcX7p95Grq/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3JcX7p95Grq/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3JcX7p95Grq/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3JcX7p95Grq/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3JcX7p95Grq/240p/video.m3u8"
    }
  },
  {
    title: "Nifty 500 Value 50 Index.",
    desc: "Nifty 500 Value 50 Index.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/62kh7t96hGb/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62kh7t96hGb/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62kh7t96hGb/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62kh7t96hGb/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62kh7t96hGb/240p/video.m3u8"
    }
  },
  {
    title: "Value Mutual Funds - Part 1.",
    desc: "Value Mutual Funds - Part 1.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BSrYpyT9cng/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BSrYpyT9cng/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BSrYpyT9cng/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BSrYpyT9cng/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BSrYpyT9cng/240p/video.m3u8"
    }
  },
  {
    title: "Value Mutual Funds - Part 2.",
    desc: "Value Mutual Funds - Part 2.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/YyeSdXEzEHQ/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/YyeSdXEzEHQ/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/YyeSdXEzEHQ/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/YyeSdXEzEHQ/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/YyeSdXEzEHQ/240p/video.m3u8"
    }
  },
  {
    title: "Live Session: Identifying Value Stocks in Real Markets.",
    desc: "Live Session: Identifying Value Stocks in Real Markets.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9dTkrr7Bmbh/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9dTkrr7Bmbh/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9dTkrr7Bmbh/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9dTkrr7Bmbh/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9dTkrr7Bmbh/240p/video.m3u8"
    }
  },
  {
    title: "Avoiding Value Traps.",
    desc: "Avoiding Value Traps.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/AZHTN4za7FB/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AZHTN4za7FB/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AZHTN4za7FB/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AZHTN4za7FB/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AZHTN4za7FB/240p/video.m3u8"
    }
  },
  {
    title: "Stock Filtering Techniques.",
    desc: "Stock Filtering Techniques.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/89GZ8yxZHxM/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/89GZ8yxZHxM/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/89GZ8yxZHxM/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/89GZ8yxZHxM/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/89GZ8yxZHxM/240p/video.m3u8"
    }
  },
  {
    title: "Building a Strong Value Investing Portfolio.",
    desc: "Building a Strong Value Investing Portfolio.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6xdF97rxuCs/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6xdF97rxuCs/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6xdF97rxuCs/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6xdF97rxuCs/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6xdF97rxuCs/240p/video.m3u8"
    }
  }
];

function formatLessonBlock1_2(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_value_investing_${index}",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  courseName: "Guide to Value Investing",`);
  lines.push(`${indent}  thumbnail: valueInvestingImg,`);
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
  lines.push(`${indent}  id: "premium_plus_lesson_value_investing_${index}",`);
  lines.push(`${indent}  courseName: "Guide to Value Investing",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  thumbnail: valueInvestingImg,`);
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

// Find occurrences of premium_plus_lesson_value_investing_0
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_value_investing_0"')) {
    occurrences.push(idx);
  }
});

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences, found ${occurrences.length}`);
}

const blockRanges = [];
occurrences.forEach((occIdx, occNum) => {
  let startIdx = occIdx;
  while (startIdx >= 0 && !lines[startIdx].includes('{')) {
    startIdx--;
  }
  
  let lesson17IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_value_investing_17"')) {
      lesson17IdIdx = j;
      break;
    }
  }
  if (lesson17IdIdx === -1) {
    throw new Error(`Could not find lesson 17 for occurrence at line ${occIdx + 1}`);
  }
  
  let lesson17Start = lesson17IdIdx;
  while (lesson17Start >= 0 && !lines[lesson17Start].includes('{')) {
    lesson17Start--;
  }
  
  let endIdx = lesson17Start;
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
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Replacing Guide to Value Investing block ranges in reverse order...");
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

// 2. Modify the database auto-sync block in App.jsx to include viNeeds check
console.log("Modifying database auto-sync block to include Guide to Value Investing check...");
const contentString = lines.join('\n');
const searchString = 'const cmNeeds = !cmLesson0 || !cmLesson0.videoUrls || cmLesson0.videoUrl.includes("youtube.com");';
const replaceString = 'const cmNeeds = !cmLesson0 || !cmLesson0.videoUrls || cmLesson0.videoUrl.includes("youtube.com");\n        const viLesson0 = dbLessons.find(l => l && l.id === "premium_plus_lesson_value_investing_0");\n        const viNeeds = !viLesson0 || !viLesson0.videoUrls || viLesson0.videoUrl.includes("youtube.com");';

const conditionSearch = 'if (fbNeeds || pruNeeds || cmNeeds) {';
const conditionReplace = 'if (fbNeeds || pruNeeds || cmNeeds || viNeeds) {';

if (!contentString.includes(searchString)) {
  throw new Error("Could not locate searchString in database auto-sync block");
}
if (!contentString.includes(conditionSearch)) {
  throw new Error("Could not locate conditionSearch in database auto-sync block");
}

let newContent = contentString.replace(searchString, replaceString).replace(conditionSearch, conditionReplace);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log("Successfully updated App.jsx with Guide to Value Investing lessons!");
