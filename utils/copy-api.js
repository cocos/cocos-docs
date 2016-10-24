var Fs = require('fire-fs');
var srcPath = process.argv[2];
var lang = process.argv[3];

// console.log(lang);

// if (lang.indexOf('zh') === -1 || lang.indexOf('en') === -1) {
//     return console.error("Invalid language setting input, please specify zh or en at the end");
// }

if (Fs.isDirSync(srcPath)) {
    var dest = './output/' + lang + '/api';
    Fs.copy(srcPath, dest, {clobber: true}, function (err) {
        if (err) {
            return console.error(err);
        } else {
            return console.log('Copy API docs succeed, dest path: ' + dest);
        }
    })
} else {
    return console.error("Invalid API doc source path input. Folder does not exists!");
}