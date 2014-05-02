(function(module) {
	"use strict";
	var Charts = {};
	var uuid = require('node-uuid');

	Charts.parse = function(postContent, callback) {
		var	regularPattern = /@@chart\[(.+)\]\[(.+)\]/g;

		if (postContent.match(regularPattern)){
			var idChart = uuid.v1();		
			postContent = postContent.replace("(", "\'");
			postContent = postContent.replace(")", "\'");
			postContent = postContent.replace(regularPattern, '<div id="' + idChart + '"></div> <script type="text/javascript">$.jqplot("' + idChart + '", [$1], $2);</script>');
		}
		callback(null, postContent);
	};

	module.exports = Charts;
}(module));
