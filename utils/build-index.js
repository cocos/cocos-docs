const Fs = require('fire-fs');
var parser = require('./libs/markdown-parser').parseMD;
var algoliasearch = require('algoliasearch');
var client = algoliasearch('9O85UIKQEL', process.env.algoliaKey);
var algolia = client.initIndex('manual-zh');

var docRoot = './source/zh/';
var docs = Fs.readJsonSync(docRoot + 'meta.json')['*']['menu'];

function collectUrlRecursive(urls, arr) {
	for (let i = 0; i < arr.length; ++i) {
		let obj = arr[i];
		if (obj['link']) {
			urls.push(obj['link']);
		}
		if (obj['submenu']) {
			collectUrlRecursive(urls, obj['submenu']);
		}
	}
}

var urls = [];

collectUrlRecursive(urls, docs);

var objects = [];
for (let i = 0; i < urls.length; ++i) {
	let url = docRoot + urls[i].replace('.html', '.md');
	parser(url, {
		"dir": docRoot,
		"cleanMD": false
	}).then(
		function (jsonObj) {
			console.log(`indexing ${jsonObj.path} ...`);
			objects.push(jsonObj);
			if (objects.length === urls.length) {
				console.log('sending indexes to database...');
				algolia.saveObjects(objects, function (err, content) {
					if (err) {
						console.error(err);
						return;
					}
					console.log('success adding indexes');
				});
			}
		});
}