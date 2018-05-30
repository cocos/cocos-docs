'use strict';

const Fs = require('fs');
const Path = require('path');
const Del = require('del');
const Globby = require('globby');
// const spawn = require('child_process').spawn;
// const gulpSequence = require('gulp-sequence');
const Difference = require('lodash/difference');
const { exec } = require('child_process');

const gulp = require('gulp');
const program = require('commander');
    program
    .option('-o, --only [items]', 'Only build these files, specrated by ","', x => x.split(','))
    .option('--dest <path>', 'Copy generated document to specified path.')
    .parse(process.argv);

gulp.task('publish', function (done) {
    
    var dest = program.dest;
    if (!dest) {
        return done('dest not supplied');
    }

    var del = Path.join(dest, '*');
    console.log('deleting ' + del);
    Del.sync(del, { force: true });

    console.log('copying _book/**/* to ' + dest);
    gulp.src('_book/**/*', {
            base: '_book'
        })
        .pipe(gulp.dest(dest))
        .on('end', done);
});

const FORBID_IGNORE_ARRAY = ['index.md', 'SUMMARY.md'];
const allPagesPattern = ['zh/**/*.md', 'en/**/*.md', '!zh/*.md', '!en/*.md'];
const START_TAG = '\n\n## CC_HIDE_IN_SUMMARY_START';
const END_TAG = '## CC_HIDE_IN_SUMMARY_END\n';
const START_TAG_IGNORE = '\n\nCC_IGNORE_START';
const END_TAG_IGNORE = '\nCC_IGNORE_END';
const PRUNE_LEFT_BAR_RE = /<[^<>]*>\s*CC_HIDE_IN_SUMMARY_START\s*<\/[^<>]*>(?:\n|.)*<[^<>]*>\s*CC_HIDE_IN_SUMMARY_END\s*<\/[^<>]*>/g;
const PAGE_TITLE_RE = /^\s*(?:<!--(?:\n|.)*?-->\s*)*#*\s*(.*?)\s*\n/;

function parseListedPages (summaryPath) {
    var content = Fs.readFileSync(summaryPath, 'utf8');
    var re = /\[[^\]]*\]\(([^\)]+)\)/g;     // should recreate a new RegExp every time this function called
    var res = [];
    var exec = null;
    while ((exec = re.exec(content)) !== null) {
        res.push(Path.resolve(Path.dirname(summaryPath), exec[1]));
    }
    return res;
}

function getPageTitle (path) {
    var content = Fs.readFileSync(path, 'utf8');
    var match = PAGE_TITLE_RE.exec(content);
    if (match) {
        return match[1];
    }
    else {
        return Path.parse(path).name;
    }
}

function fillSummary (path) {
    var cwd = Path.dirname(path);
    // get missing pages
    var listedPages = parseListedPages(path);
    var allPagesPattern = Path.join(cwd, '*/**/*.md');
    var allPages = Globby.sync(allPagesPattern, { absolute: true });
    var missingPages = Difference(allPages, listedPages);
    // fill summary
    var content = Fs.readFileSync(path, 'utf8');
    var append = missingPages.map(x => `- [${getPageTitle(x)}](${Path.relative(cwd, x)})`).join('\n');
    content = `${content}${START_TAG}\n\n${append}\n\n${END_TAG}`;
    Fs.writeFileSync(path, content, 'utf8');
}

// add unlisted pages into SUMMARY.md to allow gitbook to build them
gulp.task('preview', ['restore-summary', 'restore-ignore'], function (done) {
    var includeFiles = program.only;
    if (includeFiles.length > 0) {
        var res = quickPreview(includeFiles, done);
        res.then(
            // success
            () => {
                fillSummary('zh/SUMMARY.md');
                fillSummary('en/SUMMARY.md');
                openServer(done);
            },
            // failed
            error => {
                console.log(error);
            }
        ).catch(err => err);
    }
    else {
        fillSummary('zh/SUMMARY.md');
        fillSummary('en/SUMMARY.md');
        openServer(done);
    }
});

function restoreSummary (path) {
    var re = new RegExp(START_TAG + '(?:\\n|.)*' + END_TAG);
    var content = Fs.readFileSync(path, 'utf8');
    content = content.replace(re, '');
    Fs.writeFileSync(path, content, 'utf8');
}

function restoreIgnore (path) {
    var re = new RegExp(START_TAG_IGNORE + '(?:\\n|.)*' + END_TAG_IGNORE);
    var content = Fs.readFileSync(path, 'utf8');
    content = content.replace(re, '');
    Fs.writeFileSync(path, content, 'utf8');
}

function openServer (done) {
    var server = exec('gitbook serve --no-watch --open');
    server.stderr.on('error', err => {
        if(err) done(err);
    });
    server.stdout.on('data', data => {
        console.log(data);
    });
}

//only build the target file
async function quickPreview (includeFiles, done) {
    if (includeFiles.length > 0) {
        includeFiles = includeFiles.concat(FORBID_IGNORE_ARRAY);
        var excludePattern = includeFiles.map(x => '!**/' + Path.basename(x, '.md') + '.md');
        var allIgnorePages = Globby.sync(allPagesPattern.concat(excludePattern), { absolute: true });
        allIgnorePages = allIgnorePages.map(x => '/' + Path.relative(__dirname,x).replace(/\\/g, '/'));                                      
        await Fs.readFile('.bookignore', 'utf8', function (error, content) {
            if (error) {
                return done(error);
            }
            const fileContent = `${content}\n${START_TAG_IGNORE}\n${allIgnorePages.join('\n')}${END_TAG_IGNORE}`;
            Fs.writeFile('.bookignore', fileContent, 'utf8', done);
        });
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    else {
        return done('you need emit at least one argument in thie command');
    }
}

// restore SUMMARY.md to keep repo clean
gulp.task('restore-summary', function () {
    restoreSummary('zh/SUMMARY.md');
    restoreSummary('en/SUMMARY.md');
});

gulp.task('restore-ignore', function () {
    restoreIgnore('.bookignore');
});

function pruneLeftBar (dir) {
    var allPagesPattern = Path.join(dir, '**/*.html');
    var allPages = Globby.sync(allPagesPattern);
    for (var i = 0; i < allPages.length; ++i) {
        var path = allPages[i];
        var content = Fs.readFileSync(path, 'utf8');
        content = content.replace(PRUNE_LEFT_BAR_RE, '');
        Fs.writeFileSync(path, content, 'utf8');
    }
}

// remove added pages from generated index.html
gulp.task('prune-left-bar', function () {
    pruneLeftBar('_book/zh');
    pruneLeftBar('_book/en');
});

gulp.task('postbuild', ['restore-summary', 'prune-left-bar']);