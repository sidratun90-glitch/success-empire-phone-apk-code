import fs from 'fs';

const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const rawQualityData = {
  0: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4MkMd5MpHuj/1080p/video.m3u8"
  },
  1: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BA6rC8QgA9C/240p/video.m3u8"
  },
  2: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66qmb88kjnZ/240p/video.m3u8"
  },
  3: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AgBsMdxcCM3/240p/video.m3u8"
  },
  4: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6JgRGHrSU3Q/240p/video.m3u8"
  },
  5: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5zJSEzEjDTQ/1080p/video.m3u8"
  },
  6: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Ab8b438JAuY/240p/video.m3u8"
  },
  7: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9QCCFxEBzy5/240p/video.m3u8"
  },
  8: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5Kj4td7xsrF/240p/video.m3u8"
  },
  9: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/52Xc7mjypGY/1080p/video.m3u8"
  },
  10: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/53UukXR4GX7/240p/video.m3u8"
  },
  11: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/fpqGrgZNXN3/240p/video.m3u8"
  },
  12: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/yhQRcpGHyBU/240p/video.m3u8"
  },
  13: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gsD7aBuUyB/240p/video.m3u8"
  },
  14: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4mhedSDFSca/240p/video.m3u8"
  },
  15: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AYSJgkgdRDg/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8"
  },
  16: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/66YJKe9Nmfn/1080p/video.m3u8"
  },
  17: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4d9946cRd6m/240p/video.m3u8"
  },
  18: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8hkZz7eFMdf/1080p/video.m3u8"
  },
  19: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/T2PYHFnxJe4/1080p/video.m3u8"
  },
  20: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Xa3ZqFkjpHH/1080p/video.m3u8"
  },
  21: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6ppgTmp3EYE/1080p/video.m3u8"
  },
  22: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/720p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84Th8JayCtj/240p/video.m3u8"
  },
  23: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3CAyjXJgAKq/1080p/video.m3u8"
  },
  24: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9KsK7b2hPPq/1080p/video.m3u8"
  },
  // Skip 25 (the codebase lesson 26 which is "Introduction")
  26: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/1080p_h264/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8",
    "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/480p_h264/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/360p_h264/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BuSmfBszmks/240p_h264/video.m3u8"
  },
  27: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/1080p_h264/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/720p_h264/video.m3u8",
    "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/480p_h264/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/360p_h264/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Fb2dyh7b6g/240p_h264/video.m3u8"
  },
  28: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/1080p_h264/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/720p_h264/video.m3u8",
    "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/480p_h264/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/360p_h264/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8HbpHj4QzsF/240p_h264/video.m3u8"
  },
  29: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/1080p_h264/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/720p_h264/video.m3u8",
    "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/480p_h264/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/360p_h264/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/44SJsCU6F35/240p_h264/video.m3u8"
  },
  30: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/1080p_h264/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/720p_h264/video.m3u8",
    "480p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/480p_h264/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/360p_h264/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4gXRxanTmSZ/240p_h264/video.m3u8"
  }
};

function formatVideoUrls(qualities, innerIndent) {
  let str = 'videoUrls: {\n';
  const keys = Object.keys(qualities);
  keys.forEach((k, idx) => {
    str += `${innerIndent}  "${k}": "${qualities[k]}"${idx === keys.length - 1 ? '' : ','}\n`;
  });
  str += `${innerIndent}},`;
  return str;
}

function updateBlock(startIdx, linesPerLesson, count) {
  const newBlockLines = [];
  for (let lessonIdx = 0; lessonIdx < count; lessonIdx++) {
    const chunkStart = startIdx + lessonIdx * linesPerLesson;
    const chunkLines = lines.slice(chunkStart, chunkStart + linesPerLesson);
    
    // Find lesson index from the ID
    let lessonIdStr = chunkLines.find(l => l.includes('id:'));
    if (!lessonIdStr) {
      throw new Error(`Could not find id in chunk starting at line ${chunkStart + 1}`);
    }
    const matchId = lessonIdStr.match(/premium_plus_lesson_meta_ads_sell_(\d+)/);
    if (!matchId) {
      throw new Error(`Could not parse lesson index from: ${lessonIdStr}`);
    }
    const index = parseInt(matchId[1], 10);
    const qualities = rawQualityData[index];

    // Indentation detection from one of the lines inside the chunk
    const firstInnerLine = chunkLines.find(l => l.trim() !== '{' && l.trim() !== '}');
    const innerIndent = firstInnerLine.substring(0, firstInnerLine.length - firstInnerLine.trimStart().length);

    if (!qualities) {
      // If no qualities, leave chunk completely unchanged (e.g. index 25)
      newBlockLines.push(...chunkLines);
      continue;
    }

    const defaultUrl = qualities["1080p"] || qualities["720p"];

    const updatedChunkLines = [];
    chunkLines.forEach(line => {
      if (line.includes('videoUrl:')) {
        updatedChunkLines.push(`${innerIndent}videoUrl: "${defaultUrl}",`);
        updatedChunkLines.push(`${innerIndent}${formatVideoUrls(qualities, innerIndent)}`);
      } else {
        updatedChunkLines.push(line);
      }
    });

    newBlockLines.push(...updatedChunkLines);
  }
  return newBlockLines;
}

// 1. Locate Block 1
const b1Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_meta_ads_sell_0"') && idx < 25000) - 1;
if (b1Start < 0) throw new Error("Could not find start of Block 1");
console.log(`Block 1 start index: ${b1Start} (Line ${b1Start + 1})`);

// 2. Locate Block 2
const b2Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_meta_ads_sell_0"') && idx > 25000 && idx < 35000) - 1;
if (b2Start < 0) throw new Error("Could not find start of Block 2");
console.log(`Block 2 start index: ${b2Start} (Line ${b2Start + 1})`);

// 3. Locate Block 3
const b3Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_meta_ads_sell_0"') && idx > 35000) - 1;
if (b3Start < 0) throw new Error("Could not find start of Block 3");
console.log(`Block 3 start index: ${b3Start} (Line ${b3Start + 1})`);

const newBlock1 = updateBlock(b1Start, 10, 31);
const newBlock2 = updateBlock(b2Start, 10, 31);
const newBlock3 = updateBlock(b3Start, 11, 31);

// Construct new lines array
const finalLines = [
  ...lines.slice(0, b1Start),
  ...newBlock1,
  ...lines.slice(b1Start + 310, b2Start),
  ...newBlock2,
  ...lines.slice(b2Start + 310, b3Start),
  ...newBlock3,
  ...lines.slice(b3Start + 341)
];

// Write file
fs.writeFileSync(path, finalLines.join('\n'), 'utf8');
console.log("Successfully updated src/App.jsx for Meta Ads That Sell!");
