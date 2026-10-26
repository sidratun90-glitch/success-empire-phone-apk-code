import fs from 'fs';

const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const rawLessonsData = [
  {
    title: "Introduction.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4MkMd5MpHuj/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4MkMd5MpHuj/1080p/video.m3u8"
    }
  },
  {
    title: "Setup & Foundations.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/240p/video.m3u8"
    }
  },
  {
    title: "Account Setup.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/240p/video.m3u8"
    }
  },
  {
    title: "Campaign Structure.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/240p/video.m3u8"
    }
  },
  {
    title: "Audiences.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/240p/video.m3u8"
    }
  },
  {
    title: "Tracking.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/5zJSEzEjDTQ/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5zJSEzEjDTQ/1080p/video.m3u8"
    }
  },
  {
    title: "Launch.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/240p/video.m3u8"
    }
  },
  {
    title: "Optimize.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/240p/video.m3u8"
    }
  },
  {
    title: "Do's & Don'ts.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/240p/video.m3u8"
    }
  },
  {
    title: "Ad Messaging.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/52Xc7mjypGY/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/52Xc7mjypGY/1080p/video.m3u8"
    }
  },
  {
    title: "Campaign Structure and Strategy.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/240p/video.m3u8"
    }
  },
  {
    title: "Get High Click Rates on your Ads.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/240p/video.m3u8"
    }
  },
  {
    title: "Different Types of Lucrative Campaigns.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/240p/video.m3u8"
    }
  },
  {
    title: "The Real Money Marker in Meta Ads.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/240p/video.m3u8"
    }
  },
  {
    title: "Launch a Lead Gen Campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/240p/video.m3u8"
    }
  },
  {
    title: "Launch a Sales Campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/AYSJgkgdRDg/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AYSJgkgdRDg/1080p/video.m3u8"
    }
  },
  {
    title: "Launch a Call Booking Campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/66YJKe9Nmfn/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66YJKe9Nmfn/1080p/video.m3u8"
    }
  },
  {
    title: "Launch a Retargeting Campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/240p/video.m3u8"
    }
  },
  {
    title: "Simple Lead Gen Funnel.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8hkZz7eFMdf/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8hkZz7eFMdf/1080p/video.m3u8"
    }
  },
  {
    title: "Paid Product Funnel.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/T2PYHFnxJe4/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/T2PYHFnxJe4/1080p/video.m3u8"
    }
  },
  {
    title: "Call Booking Funnel.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/Xa3ZqFkjpHH/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Xa3ZqFkjpHH/1080p/video.m3u8"
    }
  },
  {
    title: "Sell Meta Ad Services as a Freelancer.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/6ppgTmp3EYE/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6ppgTmp3EYE/1080p/video.m3u8"
    }
  },
  {
    title: "Pricing Your Services & Getting High-Paying Clients.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/1080p/video.m3u8",
      "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/540p/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/360p/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/240p/video.m3u8"
    }
  },
  {
    title: "Creating a Simple Yet Effective Meta Ads Portfolio.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/3CAyjXJgAKq/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3CAyjXJgAKq/1080p/video.m3u8"
    }
  },
  {
    title: "Bonus Videos (Advance Tracking).",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9KsK7b2hPPq/1080p/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9KsK7b2hPPq/1080p/video.m3u8"
    }
  },
  {
    title: "Introduction.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9c9u8M5PEqG/240p_h264/video.m3u8"
    }
  },
  {
    title: "AI in Meta Ads and What is Working Right now.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/240p_h264/video.m3u8"
    }
  },
  {
    title: "3 Industry Specific Campaigns.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/240p_h264/video.m3u8"
    }
  },
  {
    title: "Campaign 2 - Astrologers, Tarot Card Readers.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/240p_h264/video.m3u8"
    }
  },
  {
    title: "Campaign 3 - Print on Demand.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/240p_h264/video.m3u8"
    }
  },
  {
    title: "Instant form Campaign.",
    videoUrl: "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/1080p_h264/video.m3u8",
    videoUrls: {
      "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/1080p_h264/video.m3u8",
      "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/720p_h264/video.m3u8",
      "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/480p_h264/video.m3u8",
      "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/360p_h264/video.m3u8",
      "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/240p_h264/video.m3u8"
    }
  }
];

function formatLessonBlock1_2(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_meta_ads_sell_${index}",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  courseName: "Meta Ads That Sell",`);
  lines.push(`${indent}  thumbnail: metaAdsThatSellImg,`);
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
  lines.push(`${indent}  desc: "${lesson.title}"`);
  lines.push(`${indent}},`);
  return lines;
}

function formatLessonBlock3(lesson, index, indent) {
  const lines = [];
  lines.push(`${indent}{`);
  lines.push(`${indent}  id: "premium_plus_lesson_meta_ads_sell_${index}",`);
  lines.push(`${indent}  courseName: "Meta Ads That Sell",`);
  lines.push(`${indent}  title: "${lesson.title}",`);
  lines.push(`${indent}  thumbnail: metaAdsThatSellImg,`);
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
  lines.push(`${indent}  desc: "${lesson.title}"`);
  lines.push(`${indent}},`);
  return lines;
}

// Find occurrences of premium_plus_lesson_meta_ads_sell_0
const occurrences = [];
lines.forEach((line, idx) => {
  if (line.includes('id: "premium_plus_lesson_meta_ads_sell_0"')) {
    occurrences.push(idx);
  }
});

if (occurrences.length !== 3) {
  throw new Error(`Expected exactly 3 occurrences of meta_ads_sell_0, found ${occurrences.length}`);
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
  // Find end of lesson 30 object
  let lesson30IdIdx = -1;
  for (let j = occIdx; j < lines.length; j++) {
    if (lines[j].includes('id: "premium_plus_lesson_meta_ads_sell_30"')) {
      lesson30IdIdx = j;
      break;
    }
  }
  if (lesson30IdIdx === -1) {
    throw new Error(`Could not find lesson 30 for occurrence at line ${occIdx + 1}`);
  }
  let endIdx = lesson30IdIdx;
  for (let j = lesson30IdIdx; j < lines.length; j++) {
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
  if (objCount !== 31) {
    throw new Error(`Expected exactly 31 lesson objects in range, found ${objCount} for occurrence ${occNum + 1}`);
  }
  
  blockRanges.push({ startIdx, endIdx });
});

console.log("Found valid block ranges:");
blockRanges.forEach((range, idx) => {
  console.log(`  Block ${idx + 1}: lines ${range.startIdx + 1} to ${range.endIdx + 1}`);
});

// Replace block ranges in reverse order so line indices don't shift for preceding ones
for (let i = blockRanges.length - 1; i >= 0; i--) {
  const range = blockRanges[i];
  
  // Indentation
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

fs.writeFileSync(path, lines.join('\n'), 'utf8');
console.log("Successfully updated App.jsx with Meta Ads That Sell courses!");
