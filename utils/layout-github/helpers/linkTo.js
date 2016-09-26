'use strict';
module.exports = function(from, to){
	var path = require('path');
	from = from.replace(/^\\/, '');
	// console.log('current: ' + from);
	// console.log('dest: ' + to);
	var rel = path.join(path.relative(path.dirname(from), path.dirname(to)), path.basename(to));
	// console.log('relative: ' +  rel);
	return rel;
};