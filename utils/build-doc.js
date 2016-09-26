var mds = require('markdown-styles');
var Path = require('path');
var Del = require('del');
var lang = 'zh';

if (process.argv[2] === 'zh' || process.argv[2] === 'en') {
    lang = process.argv[2];
}

Del.sync('output/' + lang);

mds.render(mds.resolveArgs({
    input: Path.normalize(process.cwd() + '/source/' + lang),
    output: Path.normalize(process.cwd() + '/output/' + lang),
    layout: Path.normalize(process.cwd() + '/utils/layout-github')
}), function() {
    console.log('All done!');
});

