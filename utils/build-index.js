const Fs = require('fire-fs');
var parser = require('./libs/markdown-parser').parseMD;
var algoliasearch = require('algoliasearch');
var client = algoliasearch('9O85UIKQEL', process.env.algoliaKey);
var algolia = client.initIndex('manual-zh');

var docRoot = './source/zh/';
var docs = Fs.readJsonSync(docRoot + 'meta.json')['*']['menu'];

for (let i = 0; i < docs.length; ++i) {
	let url = docRoot + docs[i].link.replace('.html', '.md');
	parser(url, {
		"dir": docRoot,
		"cleanMD": false
	}).then(
		function (jsonObj) {
			// console.log(jsonObj);
			algolia.addObject(jsonObj, function (err, content) {
				if (err) {
					console.error(err);
					return;
				}
				console.log('success adding ' + jsonObj.path);
			});
		});
}