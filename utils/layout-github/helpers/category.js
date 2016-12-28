'use strict';
module.exports = function(link){
	var path = require('path');
    var category = link.split('/').shift();
	return category;
};