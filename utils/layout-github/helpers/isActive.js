var path = require('path');
module.exports = function(current, link){
	var current = path.normalize(current.replace(/\.\w+$/, '')).replace(/^\\/, '');
	var link = path.normalize(link.replace(/\.\w+$/, ''));
	if (current === link) {
		return 'active';
	} else {
		return '';
	}
};