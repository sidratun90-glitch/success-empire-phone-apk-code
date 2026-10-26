// ==============================================================================
// 🗑️ SUCCESS EMPIRE - DUAL SYNC COURSE DELETION TOOL (APP 9 & APP 3)
// ==============================================================================
// Usage:
// 1. Direct CLI:  npm run delete-course "Course Name"
// 2. Interactive: npm run delete-course (Select course by number or name)
// Deletes course from BOTH Website (Course App 9) & Application (Course App 3).
// ==============================================================================

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const TARGET_PROJECTS = [
    { name: 'Website (Course App 9)', path: 'C:\\cousre code\\course app 9' },
    { name: 'Application (Course App 3)', path: 'C:\\cousre code\\course app 3' }
].filter(p => fs.existsSync(p.path));

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

function removeCourseLessons(sourceCode, courseName) {
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

    let removedCount = 0;
    const filteredLessons = lessons.filter(l => {
        const hasCourse = l.includes(`courseName: "${courseName}"`) || l.includes(`courseName: '${courseName}'`);
        if (hasCourse) {
            removedCount++;
            return false;
        }
        return true;
    });

    if (removedCount === 0) {
        return { updatedCode: sourceCode, removedCount: 0 };
    }

    const newBody = '\n' + filteredLessons.map(l => '  ' + l).join(',\n') + '\n';
    return { updatedCode: header + newBody + tail, removedCount };
}

function executeDeletion(courseName) {
    console.log(`\n⏳ Course "${courseName}" dono projects se delete kiya jaa raha hai...`);

    const now = new Date();
    const timestamp = now.toISOString().replace(/T/, '_').replace(/:/g, '-').slice(0, 19);

    const deleteResults = [];

    TARGET_PROJECTS.forEach(proj => {
        const targetFile = path.join(proj.path, 'src', 'data', 'futureCourses.js');
        const backupsDir = path.join(proj.path, 'src', 'data', 'backups');
        if (!fs.existsSync(backupsDir)) fs.mkdirSync(backupsDir, { recursive: true });

        if (!fs.existsSync(targetFile)) {
            deleteResults.push({ name: proj.name, success: false, reason: 'futureCourses.js missing' });
            return;
        }

        const code = fs.readFileSync(targetFile, 'utf8');
        try {
            const { updatedCode, removedCount } = removeCourseLessons(code, courseName);

            if (removedCount === 0) {
                deleteResults.push({ name: proj.name, success: true, count: 0, note: 'Pehle se nahi tha' });
                return;
            }

            const tempTestFile = path.join(proj.path, 'src', 'data', '_test_delete_syntax.js');
            fs.writeFileSync(tempTestFile, updatedCode, 'utf8');

            try {
                execSync(`node -c "${tempTestFile}"`);
                if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);

                fs.writeFileSync(path.join(backupsDir, `futureCourses_BEFORE_DELETE_${timestamp}.js.bak`), code, 'utf8');
                fs.writeFileSync(targetFile, updatedCode, 'utf8');

                deleteResults.push({ name: proj.name, success: true, count: removedCount });
            } catch (syntaxErr) {
                if (fs.existsSync(tempTestFile)) fs.unlinkSync(tempTestFile);
                deleteResults.push({ name: proj.name, success: false, reason: `Syntax Error: ${syntaxErr.message}` });
            }
        } catch (e) {
            deleteResults.push({ name: proj.name, success: false, reason: e.message });
        }
    });

    console.log('======================================================');
    console.log(`🗑️ SUCCESS: Course "${courseName}" dono projects se delete ho gaya!`);
    console.log('🌐 DUAL-SYNC REPORT:');
    deleteResults.forEach(r => {
        if (r.success) {
            const extra = r.count > 0 ? `(${r.count} lessons deleted)` : `(${r.note})`;
            console.log(`   ✅ ${r.name}: ${extra}`);
        } else {
            console.log(`   ❌ ${r.name}: FAILED (${r.reason})`);
        }
    });
    console.log('======================================================\n');
}

const args = process.argv.slice(2);
const courseArg = args.join(' ').trim();
const allCourses = getAllUniqueCourses();

if (courseArg) {
    const found = allCourses.find(c => c.toLowerCase() === courseArg.toLowerCase()) ||
                  allCourses.find(c => c.toLowerCase().includes(courseArg.toLowerCase()));
    if (found) {
        executeDeletion(found);
    } else {
        console.error(`\n❌ Error: Course "${courseArg}" nahi mila!`);
        process.exit(1);
    }
} else {
    console.log('\n================================================================');
    console.log(`📋 DONO APPS MEIN MAUJOOD SABHI COURSES (Total: ${allCourses.length} Courses):`);
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

    rl.question('\n👉 Delete karne ke liye Course Number (1-' + allCourses.length + ') ya Naam likhein (ya q): ', (answer) => {
        rl.close();
        const trimmed = answer.trim();
        if (!trimmed || trimmed.toLowerCase() === 'q') {
            console.log('Cancelled. Koi course delete nahi kiya gaya.');
            process.exit(0);
        }

        const num = parseInt(trimmed, 10);
        if (!isNaN(num) && num >= 1 && num <= allCourses.length) {
            executeDeletion(allCourses[num - 1]);
        } else {
            const foundByName = allCourses.find(c => c.toLowerCase() === trimmed.toLowerCase()) ||
                                allCourses.find(c => c.toLowerCase().includes(trimmed.toLowerCase()));
            if (foundByName) {
                executeDeletion(foundByName);
            } else {
                console.error(`\n❌ Course "${trimmed}" nahi mila! Kripya sahi number ya naam daalein.`);
            }
        }
    });
}
