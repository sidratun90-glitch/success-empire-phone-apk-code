import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Copy the uploaded image files to src/assets

const brainDirs = [
  "C:/Users/HP/.gemini/antigravity/brain/7ce2be03-a782-4af4-bacf-07274b48f453",
  "C:/Users/HP/.gemini/antigravity-ide/brain/1ae74aca-919e-4bc9-9161-1f8075031c9c"
]
const appJsxPath = path.resolve(__dirname, 'src/App.jsx')
if (fs.existsSync(appJsxPath)) {
  const appJsxContent = fs.readFileSync(appJsxPath, 'utf8')
  const lines = appJsxContent.split('\n')
  const matches = []
  lines.forEach((line, idx) => {
    if (line.includes('left-1/2')) {
      matches.push({ lineNum: idx + 1, content: line.trim() })
    }
  })
  fs.writeFileSync(path.resolve(__dirname, 'public/matches.json'), JSON.stringify(matches, null, 2))
}

const destDir = path.resolve(__dirname, 'src/assets')

brainDirs.forEach(brainDir => {
  if (fs.existsSync(brainDir)) {
    const files = fs.readdirSync(brainDir)
    files.forEach(file => {
      if (file.startsWith('media__') && file.endsWith('.jpg')) {
        const srcPath = path.join(brainDir, file)
        if (file === 'media__1783257785601.jpg') {
          const destPath = path.join(destDir, 'print_on_demand.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied print_on_demand.jpg')
        }
        if (file === 'media__1783258657986.jpg') {
          const destPath = path.join(destDir, 'facebook_ads.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied facebook_ads.jpg')
        }
        if (file === 'media__1783258729059.jpg') {
          const destPath = path.join(destDir, 'blender_megacourse.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied blender_megacourse.jpg')
        }
        if (file === 'media__1783258746740.jpg') {
          const destPath = path.join(destDir, 'mobile_video_editing.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied mobile_video_editing.jpg')
        }
        if (file === 'media__1785325778246.jpg') {
          const destPath = path.join(destDir, 'content_marketing.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied content_marketing.jpg')
        }
        if (file === 'media__1785327084264.jpg') {
          const destPath = path.join(destDir, 'design_smarter_with_canva.jpg')
          fs.copyFileSync(srcPath, destPath)
          console.log('Successfully copied design_smarter_with_canva.jpg')
        }
        if (file === 'media__1783256888514.jpg') {
          const destPath = path.join(destDir, 'previous_media.jpg')
          fs.copyFileSync(srcPath, destPath)
        }
      }
    })
  }
})


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


