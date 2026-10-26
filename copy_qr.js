const fs = require('fs');
const path = require('path');

const sourceFile = "C:\\Users\\HP\\.gemini\\antigravity\\brain\\9b7680ec-820c-46bf-ab18-e5771cdcea60\\media__1783403781466.jpg";
const destFile = path.join(__dirname, 'src', 'assets', 'phonepe_qr.jpg');

try {
  if (fs.existsSync(sourceFile)) {
    fs.copyFileSync(sourceFile, destFile);
    console.log("Success: PhonePe QR code image successfully copied to src/assets/phonepe_qr.jpg!");
  } else {
    console.error("Error: Source image file not found. Please check if the conversation ID is correct.");
  }
} catch (error) {
  console.error("Failed to copy file:", error);
}
