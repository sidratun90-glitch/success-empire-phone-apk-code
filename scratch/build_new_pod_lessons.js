import fs from 'fs';

const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const rawQualityData = {
  0: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jHxg7heaFn/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jHxg7heaFn/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jHxg7heaFn/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jHxg7heaFn/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jHxg7heaFn/240p/video.m3u8"
  },
  1: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/57PcA8p72Sh/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/57PcA8p72Sh/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/57PcA8p72Sh/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/57PcA8p72Sh/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/57PcA8p72Sh/240p/video.m3u8"
  },
  2: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8nAYN38xsCM/1080p/video.m3u8"
  },
  3: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DGru6ED2CF/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DGru6ED2CF/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DGru6ED2CF/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DGru6ED2CF/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5DGru6ED2CF/240p/video.m3u8"
  },
  4: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jUs3TNts4j/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jUs3TNts4j/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jUs3TNts4j/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jUs3TNts4j/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3jUs3TNts4j/240p/video.m3u8"
  },
  5: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5pHKrhPZtEn/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5pHKrhPZtEn/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5pHKrhPZtEn/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5pHKrhPZtEn/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5pHKrhPZtEn/240p/video.m3u8"
  },
  6: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9ARbXT8REmN/1080p/video.m3u8"
  },
  7: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Bb8q5gcUTjH/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Bb8q5gcUTjH/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Bb8q5gcUTjH/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Bb8q5gcUTjH/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/Bb8q5gcUTjH/240p/video.m3u8"
  },
  8: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AyeC9sYFfJd/1080p/video.m3u8"
  },
  9: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3ypJG23gfmg/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3ypJG23gfmg/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3ypJG23gfmg/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3ypJG23gfmg/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3ypJG23gfmg/240p/video.m3u8"
  },
  10: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PnFdZ7e6Mk/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PnFdZ7e6Mk/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PnFdZ7e6Mk/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PnFdZ7e6Mk/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4PnFdZ7e6Mk/240p/video.m3u8"
  },
  11: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3KgKFnT8pG3/1080p/video.m3u8"
  },
  12: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQeHqmXmqZ4/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQeHqmXmqZ4/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQeHqmXmqZ4/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQeHqmXmqZ4/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQeHqmXmqZ4/240p/video.m3u8"
  },
  13: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AchraRBT5gd/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AchraRBT5gd/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AchraRBT5gd/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AchraRBT5gd/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AchraRBT5gd/240p/video.m3u8"
  },
  14: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6tNTKUDUpGq/1080p/video.m3u8"
  },
  15: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5k4fbAgQbAt/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5k4fbAgQbAt/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5k4fbAgQbAt/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5k4fbAgQbAt/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5k4fbAgQbAt/240p/video.m3u8"
  },
  16: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5qKapskjygr/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5qKapskjygr/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5qKapskjygr/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5qKapskjygr/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5qKapskjygr/240p/video.m3u8"
  },
  17: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/73gs9FNRhEN/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/73gs9FNRhEN/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/73gs9FNRhEN/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/73gs9FNRhEN/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/73gs9FNRhEN/240p/video.m3u8"
  },
  18: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6THzDmAgMat/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6THzDmAgMat/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6THzDmAgMat/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6THzDmAgMat/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6THzDmAgMat/240p/video.m3u8"
  },
  19: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4UeujpyBhmZ/1080p/video.m3u8"
  },
  20: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/86BfMbEkH9k/1080p/video.m3u8"
  },
  21: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zzmmZ3BNGp/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zzmmZ3BNGp/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zzmmZ3BNGp/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zzmmZ3BNGp/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zzmmZ3BNGp/240p/video.m3u8"
  },
  22: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7MkzUqp4Gck/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7MkzUqp4Gck/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7MkzUqp4Gck/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7MkzUqp4Gck/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7MkzUqp4Gck/240p/video.m3u8"
  },
  23: {
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8"
  },
  24: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Tey497h3mh/1080p/video.m3u8"
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
    
    let index;
    if (lessonIdStr.includes('premium_plus_lesson_pod_intro')) {
      index = 0;
    } else {
      const matchId = lessonIdStr.match(/premium_plus_lesson_pod_(\d+)/);
      if (matchId) {
        index = parseInt(matchId[1], 10);
      } else if (lessonIdStr.includes('premium_plus_lesson_pod')) {
        index = 1;
      } else {
        throw new Error(`Could not parse lesson index from: ${lessonIdStr}`);
      }
    }
    
    const qualities = rawQualityData[index];
    if (!qualities) {
      throw new Error(`No quality data found for lesson index ${index}`);
    }
    const defaultUrl = qualities["1080p"] || qualities["720p"];

    // Indentation detection from one of the lines inside the chunk
    const firstInnerLine = chunkLines.find(l => l.trim() !== '{' && l.trim() !== '}');
    const innerIndent = firstInnerLine.substring(0, firstInnerLine.length - firstInnerLine.trimStart().length);

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
const b1Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_pod_intro"') && idx < 25000) - 1;
if (b1Start < 0) throw new Error("Could not find start of Block 1");
console.log(`Block 1 start index: ${b1Start} (Line ${b1Start + 1})`);

// 2. Locate Block 2
const b2Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_pod_intro"') && idx > 25000 && idx < 32000) - 1;
if (b2Start < 0) throw new Error("Could not find start of Block 2");
console.log(`Block 2 start index: ${b2Start} (Line ${b2Start + 1})`);

// 3. Locate Block 3
const b3Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_pod_intro"') && idx > 32000) - 1;
if (b3Start < 0) throw new Error("Could not find start of Block 3");
console.log(`Block 3 start index: ${b3Start} (Line ${b3Start + 1})`);

const newBlock1 = updateBlock(b1Start, 10, 25);
const newBlock2 = updateBlock(b2Start, 10, 25);
const newBlock3 = updateBlock(b3Start, 11, 1); // Only 1 lesson (pod_intro) in Block 3

// Construct new lines array
const finalLines = [
  ...lines.slice(0, b1Start),
  ...newBlock1,
  ...lines.slice(b1Start + 250, b2Start),
  ...newBlock2,
  ...lines.slice(b2Start + 250, b3Start),
  ...newBlock3,
  ...lines.slice(b3Start + 11)
];

// Write file
fs.writeFileSync(path, finalLines.join('\n'), 'utf8');
console.log("Successfully updated src/App.jsx for Print on Demand!");
