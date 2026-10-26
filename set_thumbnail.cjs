// ==============================================================================
// 🖼️ SUCCESS EMPIRE - DUAL SYNC THUMBNAIL MANAGER (APP 9 & APP 3)
// ==============================================================================
// Usage:
// 1. Folder Drop: Put image in courses_input/THUMBNAILS/CourseName.jpg & run `npm run set-thumbnail`
// 2. Direct CLI:  npm run set-thumbnail "Course Name" "https://image-url.jpg"
// 3. Interactive: npm run set-thumbnail (Select course and enter URL or image path)
// Updates thumbnail in BOTH Website (App 9) and Application (App 3).
// ==============================================================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rootDir = __dirname;
const inputThumbsDir = path.join(rootDir, 'courses_input', 'THUMBNAILS');
const processedDir = path.join(rootDir, 'courses_input', '_processed');

const TARGET_PROJECTS = [
    { name: 'Website (Course App 9)', path: 'C:\\cousre code\\course app 9' },
    { name: 'Application (Course App 3)', path: 'C:\\cousre code\\course app 3' }
].filter(p => fs.existsSync(p.path));

// Ensure local directories exist
if (!fs.existsSync(inputThumbsDir)) fs.mkdirSync(inputThumbsDir, { recursive: true });
if (!fs.existsSync(processedDir)) fs.mkdirSync(processedDir, { recursive: true });

function getExistingCourses(projPath) {
    const targetFile = path.join(projPath, 'src', 'data', 'futureCourses.js');
    if (!fs.existsSync(targetFile)) return [];
    const sourceCode = fs.readFileSync(targetFile, 'utf8');
    const courseRegex = /courseName:\s*["']([^"']+)["']/g;
    const courses = new Set();
    let match;
    while ((match = courseRegex.exec(sourceCode)) !== null) {
        courses.add(match[1]);
    }
    return Array.from(courses);
}

function getAllUniqueCourses() {
    const all = new Set();
    TARGET_PROJECTS.forEach(proj => {
        getExistingCourses(proj.path).forEach(c => all.add(c));
    });
    return Array.from(all);
}

function updateCourseThumbnail(sourceCode, courseName, newThumbUrl) {
    const startMarker = 'const futureLessonsData = [';
    const endMarker = 'export const futureLessons';

    const startIdx = sourceCode.indexOf(startMarker);
    const endIdx = sourceCode.indexOf(endMarker, startIdx);

    if (startIdx === -1 || endIdx === -1) {
        throw new Error('Markers not found');
    }

    const header = sourceCode.slice(0, startIdx + startMarker.length);
    const bodyAndTail = sourceCode.slice(startIdx + startMarker.length);
    const closingBracketIdx = bodyAndTail.lastIndexOf('];', bodyAndTail.indexOf(endMarker));

    if (closingBracketIdx === -1) {
        throw new Error('Closing bracket not found');
    }

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

    let updatedCount = 0;
    const modifiedLessons = lessons.map(l => {
        const hasCourse = l.includes(`courseName: "${courseName}"`) || l.includes(`courseName: '${courseName}'`);
        if (hasCourse) {
            updatedCount++;
            return l.replace(/thumbnail:\s*(?:[^,\n]+),?/, `thumbnail: ${JSON.stringify(newThumbUrl)},`);
        }
        return l;
    });

    const newBody = '\n' + modifiedLessons.map(l => '  ' + l).join(',\n') + '\n';
    return { updatedCode: header + newBody + tail, updatedCount };
}

function applyThumbnailChange(courseName, thumbPathOrUrl) {
    console.log(`\n⏳ Course "${courseName}" ka thumbnail dono projects mein update ho raha hai...`);

    let finalThumb = thumbPathOrUrl.trim();
    const isLocalFile = fs.existsSync(finalThumb);

    if (isLocalFile) {
        const ext = path.extname(finalThumb) || '.jpg';
        const safeName = courseName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const destName = `${safeName}${ext}`;

        TARGET_PROJECTS.forEach(proj => {
            const destDir = path.join(proj.path, 'public', 'thumbnails');
            if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
            fs.copyFileSync(finalThumb, path.join(destDir, destName));
        });

        finalThumb = `/thumbnails/${destName}`;
    }

    const now = new Date();
    const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 19);

    const updateResults = [];

    TARGET_PROJECTS.forEach(proj => {
        const targetFile = path.join(proj.path, 'src', 'data', 'futureCourses.js');
        const backupsDir = path.join(proj.path, 'src', 'data', 'backups');
        if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });

        if (!fs.existsSync(targetFile)) {
            updateResults.push({ name: proj.name, success: false, reason: 'futureCourses.js not found' });
            return;
        }

        const code = fs.readFileSync(targetFile, 'utf8');
        try {
            const { updatedCode, updatedCount } = updateCourseThumbnail(code, courseName, finalThumb);

            if (updatedCount === 0) {
                updateResults.push({ name: proj.name, success: true, count: 0, note: 'Course is project mein nahi tha' });
                return;
            }

            const tempTestFile = path.join(proj.path, 'src', 'data', '_test_thumb_syntax.js');
            fs.writeFileSync(tempTestFile, updatedCode, 'utf8');

            try {
                execSync(`node -c "${tempTestFile}"`);
                if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);

                fs.writeFileSync(path.join(backupsDir, `futureCourses_BEFORE_THUMB_${timestamp}.js.bak`), code, 'utf8');
                fs.writeFileSync(targetFile, updatedCode, 'utf8');

                updateResults.push({ name: proj.name, success: true, count: updatedCount });
            } catch (err) {
                if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
                updateResults.push({ name: proj.name, success: false, reason: `Syntax Error: ${err.message}` });
            }
        } catch (e) {
            updateResults.push({ name: proj.name, success: false, reason: e.message });
        }
    });

    console.log('======================================================');
    console.log(`🎉 SUCCESS: Course "${courseName}" ka thumbnail update ho gaya!`);
    console.log(`🖼️ Naya Thumbnail: ${finalThumb}`);
    console.log('🌐 DUAL-SYNC REPORT:');
    updateResults.forEach(r => {
        if (r.success) {
            const extra = r.count > 0 ? `(${r.count} lessons updated)` : `(${r.note})`;
            console.log(`   ✅ ${r.name}: ${extra}`);
        } else {
            console.log(`   ❌ ${r.name}: FAILED (${r.reason})`);
        }
    });
    console.log('======================================================\n');
    return true;
}

const allCourses = getAllUniqueCourses();

// 1. Check folder: courses_input/THUMBNAILS/
if (fs.existsSync(inputThumbsDir)) {
    const thumbFiles = fs.readdirSync(inputThumbsDir);
    const validExts = ['.jpg', '.jpeg', '.png', '.webp'];
    const foundImages = thumbFiles.filter(f => validExts.includes(path.extname(f).toLowerCase()));

    if (foundImages.length > 0) {
        console.log(`\n📁 courses_input/THUMBNAILS/ mein ${foundImages.length} images mili hain:`);
        let processedAny = false;

        foundImages.forEach(imgFile => {
            const ext = path.extname(imgFile);
            const baseName = path.basename(imgFile, ext);
            const fullImgPath = path.join(inputThumbsDir, imgFile);

            const matchedCourse = allCourses.find(c => c.toLowerCase() === baseName.toLowerCase()) ||
                                  allCourses.find(c => c.toLowerCase().includes(baseName.toLowerCase()));

            if (matchedCourse) {
                const ok = applyThumbnailChange(matchedCourse, fullImgPath);
                if (ok) {
                    processedAny = true;
                    const now = new Date();
                    const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 19);
                    fs.renameSync(fullImgPath, path.join(processedDir, `[${timestamp}]_${imgFile}`));
                }
            } else {
                console.warn(`⚠️ Warning: Image "${imgFile}" se milta-julta koi course nahi mila.`);
            }
        });

        if (processedAny) {
            process.exit(0);
        }
    }
}

// 2. Check CLI args
const args = process.argv.slice(2);
if (args.length >= 2) {
    const courseArg = args[0].trim();
    const thumbArg = args[1].trim();

    const matchedCourse = allCourses.find(c => c.toLowerCase() === courseArg.toLowerCase()) ||
                          allCourses.find(c => c.toLowerCase().includes(courseArg.toLowerCase()));

    if (matchedCourse) {
        applyThumbnailChange(matchedCourse, thumbArg);
        process.exit(0);
    } else {
        console.error(`❌ Course "${courseArg}" nahi mila!`);
        process.exit(1);
    }
}

// 3. Interactive Menu
console.log('\n================================================================');
console.log(`📋 APNE APP SE KAUNSE COURSE KA THUMBNAIL BADALNA HAI? (${allCourses.length} Courses):`);
console.log('================================================================');
allCourses.forEach((c, idx) => {
    const numStr = (idx + 1).toString().padStart(2, ' ');
    console.log(` [${numStr}] ${c}`);
});
console.log('================================================================');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('\n👉 Course Number (1-' + allCourses.length + ') ya Naam likhein (ya q): ', (answer) => {
    const trimmed = answer.trim();
    if (!trimmed || trimmed.toLowerCase() === 'q') {
        console.log('Cancelled.');
        rl.close();
        process.exit(0);
    }

    let selectedCourse = null;
    const num = parseInt(trimmed, 10);
    if (!isNaN(num) && num >= 1 && num <= allCourses.length) {
        selectedCourse = allCourses[num - 1];
    } else {
        selectedCourse = allCourses.find(c => c.toLowerCase() === trimmed.toLowerCase()) ||
                         allCourses.find(c => c.toLowerCase().includes(trimmed.toLowerCase()));
    }

    if (!selectedCourse) {
        console.error(`❌ Course "${trimmed}" nahi mila!`);
        rl.close();
        process.exit(1);
    }

    rl.question(`\n🖼️ "${selectedCourse}" ke liye Image URL ya Computer File Path daalein: `, (thumbUrl) => {
        rl.close();
        const cleanThumb = thumbUrl.trim();
        if (!cleanThumb) {
            console.error('❌ Thumbnail khali nahi ho sakta!');
            process.exit(1);
        }
        applyThumbnailChange(selectedCourse, cleanThumb);
    });
});
