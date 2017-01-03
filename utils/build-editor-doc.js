const Path = require('path');
// const exec = require('child_process').exec;
const Fs = require('fire-fs');
// var srcPath = process.argv[2];

var destRoot = 'source/en/extension/api/';
var documentation = require('documentation');

var sources = [
    // {
    //     path: ['../fb12/asset-db/page/asset-db.js'],
    //     name: 'asset-db-renderer',
    //     dest: 'asset-db'
    // },
    // {
    //     path: ['../fb12/asset-db/lib/interface.js'],
    //     name: 'asset-db-main',
    //     dest: 'asset-db'
    // },
    {
        path: [
            '../../fbnew/editor/init.js',
            '../../fbnew/editor/core/editor-init.js'
        ],
        name: 'editor-main',
        dest: 'editor'
    }
];

sources.map((src) => {
    documentation.build(src.path, {

        // only output comments with an explicit @public tag
        inferPrivate:  '^_',
        shallow: 'true'

        }, function (err, res) {
            console.log(res);
        // res is an array of parsed comments with inferred properties
        // and more: everything you need to build documentation or
        // any other kind of code data.
        documentation.formats.md(res, {}, function(err, output) {
            if (err) {
                console.log(err);
                return;
            }
            // output is a string of JSON data
            var destPath = destRoot + src.dest + '/' + src.name + '.md';
            Fs.ensureDirSync(Path.dirname(destPath));
            Fs.writeFileSync(destPath, output, 'utf8');
        });
    });
})


// exec(`documentation build ${srcPath} -f md -o ${} --infer-private`, (err, stdout, stderr) => {
//   if (err) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`build documentation for ${moduleName} complete.`);
// });