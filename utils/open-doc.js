var Path = require('path');
var cmdStr = process.platform === 'win32' ? 'start' : 'open';
var exec = require('child_process').exec;
var lang = 'zh';

if (process.argv[2] === 'zh' || process.argv[2] === 'en') {
    lang = process.argv[2];
}
exec(cmdStr + ' ' + Path.resolve('output/' + lang + '/index.html'), function(err) {
    if (err) {
        console.log(err);
    }
});