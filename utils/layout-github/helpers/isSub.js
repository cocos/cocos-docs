'use strict';

module.exports = function(link){
	var path = require('path');
	var count = link.split('/').length;
	if (count >= 3 && path.basename(link).indexOf('index') === -1) {
		return 'sidebar-header-4';
	} else {
		return 'sidebar-header-3';
	}
};