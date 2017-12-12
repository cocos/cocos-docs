'use strict';

const Fs = require('fs');
const Path = require('path');
const Del = require('del');
const Globby = require('globby');
// const spawn = require('child_process').spawn;
// const gulpSequence = require('gulp-sequence');
const Difference = require('lodash/difference');

const gulp = require('gulp');
const program = require('commander');

gulp.task('publish', function (done) {
    program
        .option('--dest <path>', 'Copy generated document to specified path.')
        .parse(process.argv);
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

const START_TAG = '\n\n## CC_HIDE_IN_SUMMARY_START';
const END_TAG = '## CC_HIDE_IN_SUMMARY_END\n';
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
gulp.task('prebuild', ['restore-summary'], function () {
    fillSummary('zh/SUMMARY.md');
    fillSummary('en/SUMMARY.md');
});

function restoreSummary (path) {
    var re = new RegExp(START_TAG + '(?:\\n|.)*' + END_TAG);
    var content = Fs.readFileSync(path, 'utf8');
    content = content.replace(re, '');
    Fs.writeFileSync(path, content, 'utf8');
}

// restore SUMMARY.md to keep repo clean
gulp.task('restore-summary', function () {
    restoreSummary('zh/SUMMARY.md');
    restoreSummary('en/SUMMARY.md');
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