// ==============================================================================
// 🚀 SUCCESS EMPIRE - DUAL SYNC BULK COURSE IMPORTER (APP 9 & APP 3)
// ==============================================================================
// 1. Adds course to BOTH Course App 9 (Website) & Course App 3 (Application).
// 2. Copies thumbnails to both public/thumbnails/ folders.
// 3. Generates safety backups for both projects before updating.
// 4. Validates JavaScript syntax with `node -c` before saving.
// 5. Automatically replaces existing course lessons if re-added (no duplicates).
// ==============================================================================

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const inputDir = path.join(rootDir, 'courses_input');
const processedDir = path.join(inputDir, '_processed');

// Target projects configuration (Website & App)
const TARGET_PROJECTS = [
    { name: 'Website (Course App 9)', path: 'C:\\cousre code\\course app 9' },
    { name: 'Application (Course App 3)', path: 'C:\\cousre code\\course app 3' }
].filter(p => fs.existsSync(p.path));

// Ensure local directories exist
if (!fs.existsSync(inputDir)) fs.mkdirSync(inputDir, { recursive: true });
if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });

// Ensure targets have necessary directories
TARGET_PROJECTS.forEach(proj => {
    const thumbs = path.join(proj.path, 'public', 'thumbnails');
    const backups = path.join(proj.path, 'src', 'data', 'backups');
    if (!fs.existsSync(thumbs)) fs.mkdirSync(thumbs, { recursive: true });
    if (!fs.existsSync(backups)) fs.mkdirSync(backups, { recursive: true });
});

// Packages configuration
const packageConfigs = [
    { name: 'Supreme', folder: 'Supreme', id: 2000000000001 },
    { name: 'Premium', folder: 'Premium', id: 2000000000002 },
    { name: 'Premium Plus', folder: 'Premium_Plus', id: 2000000000003 },
    { name: 'Creator', folder: 'Creator', id: 2000000000004 },
    { name: 'Standard', folder: 'Standard', id: 2000000000000 }
];

// Ensure package folders exist locally
packageConfigs.forEach(pkg => {
    const pkgFolder = path.join(inputDir, pkg.folder);
    if (!fs.existsSync(pkgFolder)) fs.mkdirSync(pkgFolder, { recursive: true });
});

// Text parser function
function parseCourseText(content, defaultTitle) {
    const lines = content.split('\n').map(l => l.trim()).filter(Boolean);
    let courseName = '';
    let thumbnail = '';
    const lessons = [];
    let currentLesson = null;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!courseName && i === 0 && !line.match(/^(?:lesson\s*)?\d+[\.\-:\)]/i) && !line.match(/https?:\/\//i)) {
            courseName = line.replace(/^(?:course\s*name|course\s*title|course)\s*[:=-]\s*/i, '').trim();
            continue;
        }

        if (line.match(/^(?:thumbnail|image|poster)\s*[:=-]\s*/i)) {
            thumbnail = line.replace(/^(?:thumbnail|image|poster)\s*[:=-]\s*/i, '').trim();
            continue;
        }

        const lessonMatch = line.match(/^(?:lesson\s*)?(\d+)[\.\-:\)]\s*(.*)/i);
        if (lessonMatch) {
            if (currentLesson) lessons.push(currentLesson);
            const lessonNum = lessonMatch[1];
            let rawTitle = lessonMatch[2].trim();
            rawTitle = rawTitle.replace(/^\d+[\.\-:\)]\s*/, '').trim();
            const cleanTitle = rawTitle || `Lesson ${lessonNum}`;

            currentLesson = {
                title: cleanTitle,
                videoUrls: {},
                desc: cleanTitle
            };
            continue;
        }

        const resMatch = line.match(/^(1080p|720p|480p|360p|240p)[:=\s]+(https?:\/\/\S+)/i);
        if (resMatch && currentLesson) {
            const quality = resMatch[1].toLowerCase();
            const url = resMatch[2].trim();
            currentLesson.videoUrls[quality] = url;
            continue;
        }

        const directUrlMatch = line.match(/^(https?:\/\/\S+)/i);
        if (directUrlMatch && currentLesson) {
            const url = directUrlMatch[1].trim();
            ['1080p', '720p', '480p', '360p', '240p'].forEach(q => {
                if (!currentLesson.videoUrls[q]) currentLesson.videoUrls[q] = url;
            });
            continue;
        }
    }

    if (currentLesson) lessons.push(currentLesson);
    if (!courseName) courseName = defaultTitle;

    lessons.forEach(l => {
        const primary = l.videoUrls['1080p'] || l.videoUrls['720p'] || l.videoUrls['480p'] || l.videoUrls['360p'] || l.videoUrls['240p'] || '';
        l.videoUrl = primary;
        ['1080p', '720p', '480p', '360p', '240p'].forEach(q => {
            if (!l.videoUrls[q]) l.videoUrls[q] = primary;
        });
    });

    return { courseName, thumbnail, lessons };
}

// Helper to remove any existing lessons of this course (brace-depth safe)
function removeExistingCourse(sourceCode, courseName) {
    const startMarker = 'const futureLessonsData = [';
    const endMarker = 'export const futureLessons';

    const startIdx = sourceCode.indexOf(startMarker);
    const endIdx = sourceCode.indexOf(endMarker, startIdx);

    if (startIdx === -1 || endIdx === -1) return sourceCode;

    const header = sourceCode.slice(0, startIdx + startMarker.length);
    const bodyAndTail = sourceCode.slice(startIdx + startMarker.length);
    const closingBracketIdx = bodyAndTail.lastIndexOf('];', bodyAndTail.indexOf(endMarker));

    if (closingBracketIdx === -1) return sourceCode;

    const body = bodyAndTail.slice(0, closingBracketIdx);
    const tail = bodyAndTail.slice(closingBracketIdx);

    const lessons = [];
    let current = '';
    let depth = 0;
    let inString = false;
    let stringChar = '';

    for (let i = 0; i < body.length; i++) {
        const char = body[i];
        const prevChar = i > 0 ? body[i - 1] : '';

        if (inString) {
            current += char;
            if (char === stringChar && prevChar !== '\\') inString = false;
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            inString = true;
            stringChar = char;
            current += char;
            continue;
        }

        if (char === '{') {
            depth++;
            current += char;
        } else if (char === '}') {
            depth--;
            current += char;
            if (depth === 0) {
                lessons.push(current.trim());
                current = '';
            }
        } else {
            if (depth > 0) current += char;
        }
    }

    const filteredLessons = lessons.filter(l => {
        return !(l.includes(`courseName: "${courseName}"`) || l.includes(`courseName: '${courseName}'`));
    });

    const newBody = '\n' + filteredLessons.map(l => '  ' + l).join(',\n') + '\n';
    return header + newBody + tail;
}

// 1. Scan for course input files across package folders
const coursesToAdd = [];
const filesToArchive = [];

packageConfigs.forEach(pkg => {
    const pkgFolder = path.join(inputDir, pkg.folder);
    if (!fs.existsSync(pkgFolder)) return;

    const files = fs.readdirSync(pkgFolder);
    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        const baseName = path.basename(file, ext);
        const fullPath = path.join(pkgFolder, file);

        if (ext === '.txt') {
            const content = fs.readFileSync(fullPath, 'utf8');
            const parsed = parseCourseText(content, baseName);

            // Check if matching image exists in package folder
            const possibleImgs = ['.jpg', '.jpeg', '.png', '.webp'];
            let detectedImg = null;
            for (const imgExt of possibleImgs) {
                const imgPath = path.join(pkgFolder, baseName + imgExt);
                if (fs.existsSync(imgPath)) {
                    detectedImg = { path: imgPath, ext: imgExt };
                    break;
                }
            }

            if (detectedImg) {
                const safeName = parsed.courseName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
                const targetImgName = `${safeName}${detectedImg.ext}`;

                // Deploy image to all projects
                TARGET_PROJECTS.forEach(proj => {
                    const destImg = path.join(proj.path, 'public', 'thumbnails', targetImgName);
                    fs.copyFileSync(detectedImg.path, destImg);
                });

                parsed.thumbnail = `/thumbnails/${targetImgName}`;
                filesToArchive.push({ path: detectedImg.path, pkgFolder: pkg.folder });
            }

            if (!parsed.thumbnail) {
                parsed.thumbnail = '/thumbnails/default_course.jpg';
            }

            if (parsed.lessons.length > 0) {
                coursesToAdd.push({
                    courseName: parsed.courseName,
                    thumbnail: parsed.thumbnail,
                    packageId: pkg.id,
                    packageName: pkg.name,
                    lessons: parsed.lessons,
                    sourceFile: file,
                    sourcePath: fullPath
                });
                filesToArchive.push({ path: fullPath, pkgFolder: pkg.folder });
            }
        }
    });
});

if (coursesToAdd.length === 0) {
    console.log('\n======================================================');
    console.log('ℹ️ KOI NAYA COURSE NAHI MILA JISE ADD KARNA HO');
    console.log('======================================================');
    console.log('Dono projects (Website & App) mein ek saath course add karne ke liye:');
    console.log('1. "courses_input/" ke andar sahi package folder kholein:');
    console.log('   📂 courses_input/Supreme');
    console.log('   📂 courses_input/Premium');
    console.log('   📂 courses_input/Premium_Plus');
    console.log('   📂 courses_input/Creator');
    console.log('2. Wahan ek .txt file banayein (jaise: CourseName.txt)');
    console.log('3. Usme course aur lesson ke links paste karein.');
    console.log('4. Phir run karein: npm run add-course\n');
    process.exit(0);
}

const now = new Date();
const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 19);

// 2. Generate JavaScript blocks for the new course lessons
const allGeneratedBlocks = [];
coursesToAdd.forEach(course => {
    const safeCourseId = course.courseName.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

    course.lessons.forEach((lesson, idx) => {
        const vUrl = lesson.videoUrl || lesson.videoUrls?.['1080p'] || '';
        const vUrls = lesson.videoUrls || {
            "1080p": vUrl,
            "720p": vUrl,
            "480p": vUrl,
            "360p": vUrl,
            "240p": vUrl
        };

        const block = `  {\n` +
            `    id: "future_lesson_${safeCourseId}_${idx + 1}",\n` +
            `    title: ${JSON.stringify(lesson.title)},\n` +
            `    courseName: ${JSON.stringify(course.courseName)},\n` +
            `    thumbnail: ${JSON.stringify(course.thumbnail)},\n` +
            `    videoUrl: ${JSON.stringify(vUrl)},\n` +
            `    videoUrls: {\n` +
            `      "1080p": ${JSON.stringify(vUrls['1080p'] || vUrl)},\n` +
            `      "720p": ${JSON.stringify(vUrls['720p'] || vUrl)},\n` +
            `      "480p": ${JSON.stringify(vUrls['480p'] || vUrl)},\n` +
            `      "360p": ${JSON.stringify(vUrls['360p'] || vUrl)},\n` +
            `      "240p": ${JSON.stringify(vUrls['240p'] || vUrl)}\n` +
            `    },\n` +
            `    isLocked: ${idx !== 0},\n` +
            `    isComingSoon: false,\n` +
            `    desc: ${JSON.stringify(lesson.desc || lesson.title)},\n` +
            `    packageId: ${course.packageId}\n` +
            `  }`;
        allGeneratedBlocks.push(block);
    });
});

const insertionContent = ',\n' + allGeneratedBlocks.join(',\n') + '\n';

// 3. Apply update to ALL Target Projects (Website & App)
const updateResults = [];

TARGET_PROJECTS.forEach(proj => {
    const targetFile = path.join(proj.path, 'src', 'data', 'futureCourses.js');
    const backupsDir = path.join(proj.path, 'src', 'data', 'backups');

    if (!fs.existsSync(targetFile)) {
        updateResults.push({ name: proj.name, success: false, reason: 'futureCourses.js missing' });
        return;
    }

    let code = fs.readFileSync(targetFile, 'utf8');

    // Create backup
    const backupPath = path.join(backupsDir, `futureCourses_${timestamp}.js.bak`);
    fs.writeFileSync(backupPath, code, 'utf8');

    // Remove old instances of courses to prevent duplicates
    coursesToAdd.forEach(course => {
        code = removeExistingCourse(code, course.courseName);
    });

    const marker = 'export const futureLessons';
    const markerIdx = code.indexOf(marker);
    if (markerIdx === -1) {
        updateResults.push({ name: proj.name, success: false, reason: 'Marker export const futureLessons not found' });
        return;
    }

    const lastBracketIdx = code.lastIndexOf('];', markerIdx);
    if (lastBracketIdx === -1) {
        updateResults.push({ name: proj.name, success: false, reason: 'Closing ]; bracket not found' });
        return;
    }

    const updatedCode = code.slice(0, lastBracketIdx) + insertionContent + code.slice(lastBracketIdx);

    // Validate syntax
    const tempTestFile = path.join(proj.path, 'src', 'data', '_temp_validate_syntax.js');
    fs.writeFileSync(tempTestFile, updatedCode, 'utf8');

    try {
        execSync(`node -c "${tempTestFile}"`);
        if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
        fs.writeFileSync(targetFile, updatedCode, 'utf8');
        updateResults.push({ name: proj.name, success: true, backup: backupPath });
    } catch (syntaxErr) {
        if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
        updateResults.push({ name: proj.name, success: false, reason: `Syntax Error: ${syntaxErr.message}` });
    }
});

// 4. Archive processed files in local courses_input
filesToArchive.forEach(f => {
    try {
        if (fs.existsSync(f.path)) {
            const destName = `[${timestamp}]_${path.basename(f.path)}`;
            fs.renameSync(f.path, path.join(processedDir, destName));
        }
    } catch (e) {
        // Ignore archive error
    }
});

// 5. Output Success Report
console.log('\n======================================================');
console.log('🎉 BINGO! COURSE DUAL-SYNC SAFALTA-PURVAK HO GAYA!');
console.log('======================================================');
coursesToAdd.forEach(c => {
    console.log(`📌 Course Name : ${c.courseName}`);
    console.log(`📦 Package     : ${c.packageName}`);
    console.log(`🎬 Total Videos: ${c.lessons.length} Lessons (1st Video Free/Unlocked)`);
    console.log(`🖼️ Thumbnail   : ${c.thumbnail}`);
    console.log('------------------------------------------------------');
});

console.log('🌐 DUAL-SYNC STATUS (DONON PROJECTS UPDATE HO GAYE):');
updateResults.forEach(r => {
    if (r.success) {
        console.log(`   ✅ ${r.name}: UPDATED (Backup: ${path.basename(r.backup)})`);
    } else {
        console.log(`   ❌ ${r.name}: FAILED (${r.reason})`);
    }
});
console.log('======================================================');
console.log('👉 Website (App 9): http://localhost:5174/');
console.log('👉 App (Course App 3): http://localhost:5173/');
console.log('======================================================\n');
