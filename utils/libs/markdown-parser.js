const naml = require("naml");
const readline = require('readline');
const fs = require('fs');

module.exports.parseMD = function(filepath, config, encoding){

	return new Promise(function(resolve, reject){

		readFile(filepath, encoding, false)
		.then(
			function(data){
				var frontmatter_type = /(^.)/.exec(data);
				var title = /^\s*#\s(.+)/.exec(data);
				var ml = {};
				var types = {
					"+" : "toml",
					"-" : "yaml"
				}
				
				content = data;

				if(frontmatter_type && ["+","-"].indexOf(frontmatter_type[0])>=0){
					var fm_sep = Array(4).join(frontmatter_type[0]);
					var fm = data.slice(data.indexOf(fm_sep)+fm_sep.length);
					var content_pos = fm.indexOf(fm_sep);
					fm = fm.slice(0,content_pos);
					content = data.slice(content_pos+(fm_sep.length*2));
					
					try{
						 ml = naml.parse(fm,types[frontmatter_type[0]]);
					}catch(e){
						console.log("utils.js -> parseMD " + e)
					}
					ml.date = +new Date(ml.date);
				}

				if (title && title[1]) {
					ml.title = title[1];
				}

				ml.path = filepath;
				ml.indexTime = +new Date();
				ml.content = content;

				if(config){
					if(checkIfProps(ml, config.excludeIfProps)){
						resolve(null);
					}
					ml = removeFrontMatterProps(ml, config.removeProps);
					ml.path = filepath.replace(config.dir, "").replace(".md","");
					ml.content = cleanMdContent(content, config.cleanMD);
				}

				ml.objectID = new Buffer(ml.path).toString('base64');
				resolve(ml);
			}
		).catch(
			function(err){
				reject(err);
			}
		)
	})
}

module.exports.checkArrInStr = function(str, arr){
	if(!arr || arr.length===0){
		return false;
	}
	for (var i=0, z=arr.length; i<z; i++) {
		if (str.indexOf(arr[i]) > -1) {
		  return true;
		}
	}
	return false;
}

module.exports.readFile = readFile;

function readFile(filepath, encoding, isjson){

	if(!isjson){
		isjson = false;
	}

	if(!encoding){
		encoding = "utf8";
	}
	
	return new Promise(function(resolve, reject){
		fs.readFile(filepath, encoding, function(err, data){
	      if(isjson){
	      	data = JSON.parse(data);
	      }
	      if(err){
	      	reject(err);
	      }
		  resolve(data)
	    });
    });

}

module.exports.writeFile = function(filepath, content){
	return new Promise(function(resolve, reject){
		fs.writeFile(filepath, content, function(err){
			if(err){
				console.error(err);
				reject(err);
			}

			resolve(null);
		}) 
	});
}


/*
	Cleans MD file content. Pending add more rules
*/
function cleanMdContent(content, clean){
	if(content){
		content = content
						.replace(/^\s+/,"")
						//.replace(/<!--(.*?)-->/g,"")
				;
	}

	if(clean && clean===true){
		content = content
				.replace(/\s+/g," ")
				.replace(/\-+/g,"-")
				.replace(/<.*?>/g, "")
				.replace(/\d\./g,"")
				.replace(/\((.*?)\)/g,"")
				.replace(/!\[(.*?)\]/g,"")
				.replace(/[|#~_]/g,"")
				.replace(/[>`]/g,"")
	}

	return content;
}

/*
	Check if props exist
*/
function checkIfProps(props, propsToCheck){
	if(!propsToCheck || !(propsToCheck instanceof Array)){
		return false;
	}

	for(var i=0,z=propsToCheck.length;i<z;i++){
		if(props[propsToCheck[i]]){
			return true;
		} 
	}

	return false;
}

/*
	Remove front matter properties selected
*/
function removeFrontMatterProps(props, propsToRemove){
	if(!propsToRemove || !(propsToRemove instanceof Array)){
		return props;
	}

	for(var i=0,z=propsToRemove.length;i<z;i++){
		delete props[propsToRemove[i]]; 
	}

	return props;
}