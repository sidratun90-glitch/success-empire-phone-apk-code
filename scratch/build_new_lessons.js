import fs from 'fs';

const path = 'c:/course app 3/src/App.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

const rawQualityData = {
  0: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5BRdGEYCHAh/1080p/video.m3u8"
  },
  1: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BCgCamZ8a43/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BCgCamZ8a43/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BCgCamZ8a43/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BCgCamZ8a43/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BCgCamZ8a43/240p/video.m3u8"
  },
  2: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4Xpfsckyp4K/1080p/video.m3u8"
  },
  3: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9tQeYHNDtMM/1080p/video.m3u8"
  },
  4: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4qJhrS6C7RA/1080p/video.m3u8"
  },
  5: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/625fgHN4cc6/1080p/video.m3u8"
  },
  6: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BQpZferbnJ9/1080p/video.m3u8"
  },
  7: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7pg6hF7EHuX/1080p/video.m3u8"
  },
  8: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AazeS4EQ7Xe/1080p/video.m3u8"
  },
  9: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4uszh8g62tS/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4uszh8g62tS/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4uszh8g62tS/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4uszh8g62tS/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4uszh8g62tS/240p/video.m3u8"
  },
  10: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8zbKhhjsmQb/1080p/video.m3u8"
  },
  11: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4cdCs5eB5PQ/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4cdCs5eB5PQ/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4cdCs5eB5PQ/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4cdCs5eB5PQ/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4cdCs5eB5PQ/240p/video.m3u8"
  },
  12: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65ymdnUU9jy/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65ymdnUU9jy/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65ymdnUU9jy/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65ymdnUU9jy/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/65ymdnUU9jy/240p/video.m3u8"
  },
  13: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7Bzdgqu94RE/1080p/video.m3u8"
  },
  14: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3PScepQJsFc/1080p/video.m3u8"
  },
  15: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5ghzc4kk9Y5/1080p/video.m3u8"
  },
  16: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BEJ5yN3dE2K/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BEJ5yN3dE2K/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BEJ5yN3dE2K/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BEJ5yN3dE2K/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BEJ5yN3dE2K/240p/video.m3u8"
  },
  17: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9zkjTmrNGDp/1080p/video.m3u8"
  },
  18: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62zunKSFtNa/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62zunKSFtNa/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62zunKSFtNa/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62zunKSFtNa/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/62zunKSFtNa/240p/video.m3u8"
  },
  19: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnAxq8b6xcs/1080p/video.m3u8"
  },
  20: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4QxH5nR6hYA/1080p/video.m3u8"
  },
  21: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AC2cfmHB57a/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AC2cfmHB57a/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AC2cfmHB57a/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AC2cfmHB57a/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/AC2cfmHB57a/240p/video.m3u8"
  },
  22: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8f9n9T9eRBs/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8f9n9T9eRBs/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8f9n9T9eRBs/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8f9n9T9eRBs/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8f9n9T9eRBs/240p/video.m3u8"
  },
  23: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/XMJ3a6qnBqy/1080p/video.m3u8"
  },
  24: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3N34jpTd6bS/1080p/video.m3u8"
  },
  25: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BP5e4K8FX2Q/1080p/video.m3u8"
  },
  26: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/C44TdgB6hfP/1080p/video.m3u8"
  },
  27: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6gNbHMUfgtu/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6gNbHMUfgtu/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6gNbHMUfgtu/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6gNbHMUfgtu/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6gNbHMUfgtu/240p/video.m3u8"
  },
  28: {
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8"
  },
  29: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3zUCDY3PeTk/1080p/video.m3u8"
  },
  30: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6Df6mt6RRp3/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6Df6mt6RRp3/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6Df6mt6RRp3/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6Df6mt6RRp3/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/6Df6mt6RRp3/240p/video.m3u8"
  },
  31: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7aTPQPRYQkC/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7aTPQPRYQkC/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7aTPQPRYQkC/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7aTPQPRYQkC/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7aTPQPRYQkC/240p/video.m3u8"
  },
  32: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7234rmEjKmu/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7234rmEjKmu/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7234rmEjKmu/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7234rmEjKmu/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7234rmEjKmu/240p/video.m3u8"
  },
  33: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/x9Fg9JDRzSQ/1080p/video.m3u8"
  },
  34: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/hZ6d7sMKPjK/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/hZ6d7sMKPjK/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/hZ6d7sMKPjK/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/hZ6d7sMKPjK/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/hZ6d7sMKPjK/240p/video.m3u8"
  },
  35: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3m5TrZ6TTym/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3m5TrZ6TTym/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3m5TrZ6TTym/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3m5TrZ6TTym/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3m5TrZ6TTym/240p/video.m3u8"
  },
  36: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qksaRJxXD5/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qksaRJxXD5/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qksaRJxXD5/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qksaRJxXD5/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7qksaRJxXD5/240p/video.m3u8"
  },
  37: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7q8j8jFQbKm/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/spC4AESzy8y/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7q8j8jFQbKm/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7q8j8jFQbKm/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7q8j8jFQbKm/240p/video.m3u8"
  },
  38: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/3knbjgcuCRR/1080p/video.m3u8"
  },
  39: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7NZJhjje4Hh/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7NZJhjje4Hh/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7NZJhjje4Hh/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7NZJhjje4Hh/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/7NZJhjje4Hh/240p/video.m3u8"
  },
  40: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/74u7NcYhKuA/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/74u7NcYhKuA/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/74u7NcYhKuA/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/74u7NcYhKuA/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/74u7NcYhKuA/240p/video.m3u8"
  },
  41: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5sHf7kQjA7j/1080p/video.m3u8"
  },
  42: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnXFtCnkSYe/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnXFtCnkSYe/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnXFtCnkSYe/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnXFtCnkSYe/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/BnXFtCnkSYe/240p/video.m3u8"
  },
  43: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5CDHzFjZYe8/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5CDHzFjZYe8/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5CDHzFjZYe8/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5CDHzFjZYe8/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5CDHzFjZYe8/240p/video.m3u8"
  },
  44: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9prZefQUU6N/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9prZefQUU6N/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9prZefQUU6N/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9prZefQUU6N/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/9prZefQUU6N/240p/video.m3u8"
  },
  45: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/47cQc5UtMbr/1080p/video.m3u8"
  },
  46: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5RtB6TCGnzP/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5RtB6TCGnzP/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5RtB6TCGnzP/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5RtB6TCGnzP/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5RtB6TCGnzP/240p/video.m3u8"
  },
  47: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84THstztBXn/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84THstztBXn/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84THstztBXn/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84THstztBXn/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/84THstztBXn/240p/video.m3u8"
  },
  48: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8yfzhQg8KJf/1080p/video.m3u8"
  },
  49: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fphnnzFAfb/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fphnnzFAfb/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fphnnzFAfb/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fphnnzFAfb/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/8fphnnzFAfb/240p/video.m3u8"
  },
  50: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/5sJKzUBbtmX/1080p/video.m3u8"
  },
  51: {
    "1080p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4TJnM5T8RkG/1080p/video.m3u8",
    "720p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4TJnM5T8RkG/720p/video.m3u8",
    "540p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4TJnM5T8RkG/540p/video.m3u8",
    "360p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4TJnM5T8RkG/360p/video.m3u8",
    "240p": "https://d234g4busuj7fs.cloudfront.net/transcoded/4TJnM5T8RkG/240p/video.m3u8"
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

function updateBlock(startIdx, linesPerLesson) {
  const newBlockLines = [];
  for (let lessonIdx = 0; lessonIdx < 52; lessonIdx++) {
    const chunkStart = startIdx + lessonIdx * linesPerLesson;
    const chunkLines = lines.slice(chunkStart, chunkStart + linesPerLesson);
    
    // Find lesson index from the ID
    let lessonIdStr = chunkLines.find(l => l.includes('id:'));
    if (!lessonIdStr) {
      throw new Error(`Could not find id in chunk starting at line ${chunkStart + 1}`);
    }
    const matchId = lessonIdStr.match(/premium_plus_lesson_gopro_ae_(\d+)/);
    if (!matchId) {
      throw new Error(`Could not parse lesson index from: ${lessonIdStr}`);
    }
    const index = parseInt(matchId[1], 10);
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
const b1Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx < 25000) - 1;
if (b1Start < 0) throw new Error("Could not find start of Block 1");
console.log(`Block 1 start index: ${b1Start} (Line ${b1Start + 1})`);

// 2. Locate Block 2
const b2Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx > 25000 && idx < 32000) - 1;
if (b2Start < 0) throw new Error("Could not find start of Block 2");
console.log(`Block 2 start index: ${b2Start} (Line ${b2Start + 1})`);

// 3. Locate Block 3
const b3Start = lines.findIndex((l, idx) => l.includes('id: "premium_plus_lesson_gopro_ae_0"') && idx > 32000) - 1;
if (b3Start < 0) throw new Error("Could not find start of Block 3");
console.log(`Block 3 start index: ${b3Start} (Line ${b3Start + 1})`);

const newBlock1 = updateBlock(b1Start, 10);
const newBlock2 = updateBlock(b2Start, 10);
const newBlock3 = updateBlock(b3Start, 11);

// Construct new lines array
const finalLines = [
  ...lines.slice(0, b1Start),
  ...newBlock1,
  ...lines.slice(b1Start + 520, b2Start),
  ...newBlock2,
  ...lines.slice(b2Start + 520, b3Start),
  ...newBlock3,
  ...lines.slice(b3Start + 572)
];

fs.writeFileSync(path, finalLines.join('\n'), 'utf8');
console.log("Successfully updated src/App.jsx!");
