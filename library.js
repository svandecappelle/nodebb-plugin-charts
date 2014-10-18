(function(module) {
	"use strict";
	var Charts = {};
	var uuid = require('node-uuid');

	Charts.parse = function(postContent, callback) {
		var	regularPattern = /@chart\[data:(.+)\]\{options\:( )*(\{[^]+\})\}/g;
		//var	regularPattern = /@chart\[data:(.+)\]\{options\:( )*(\{.*(\n)*\})\}/g;


	/*	var	regularPatternMultiplesLines = /@chart\[data:(.+)\]\{options\:( )*(\{.*[^]+\})\}/g;
		if (postContent.match(regularPatternMultiplesLines)){
			console.log("MULTIPLES LINES");
			console.log(postContent.match(regularPatternMultiplesLines));
			var inlineChartData = postContent.match(regularPatternMultiplesLines).split("<br />").join("");
			//console.log(inlineChartData);
		}*/

		console.log("post-content: " + postContent);
		// pattern:
		// @chart[data=x,y,z]{options: {}}

		if (postContent.match(regularPattern)){
			var idChart = uuid.v4();
			console.log(idChart);
			try{
				// datas
				var datas = postContent.match(/\[data:([^]+)\]/g)[0];
				datas = datas.substring(6,datas.length-1);
				try{
					var typedDatas = JSON.parse(datas);
					console.log(typedDatas);
				}catch (exception){
					console.log("Datas not a valid JSON");
				}

				// options
				var options = postContent.match(/\{options\:([^]+)\}/g)[0];
				options = options.substring(9, options.length-1).split("&quot;").join("\"").split("<br />").join("");
				console.log(options);

				try{
					var typedOptions = JSON.parse(options);
					console.log(typedOptions);
				}catch (exception){
					console.log("Options is not a valid JSON");
				}
				// issue on JSON.stringify for keys's objects in 'String' type;
				var untypedOptions = options;
				//untypedOptions = JSON.stringify(untypedOptions).substring(9, untypedOptions.length - 1);
				var replacement = '<div id="' + idChart + '"></div> <script type="text/javascript">$.jqplot("' + idChart + '", '+JSON.stringify(typedDatas)+', '+untypedOptions+');</script>';
				postContent = postContent.replace(regularPattern, replacement);
			}catch (invalidDataException){
				console.log("Invalid data exception ", invalidDataException);
			}
		}
		callback(null, postContent);
	};

	module.exports = Charts;
}(module));
