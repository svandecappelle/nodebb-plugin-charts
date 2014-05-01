(function(module) {
	"use strict";
	var Charts = {};

	Charts.parse = function(postContent, callback) {
		var	regularPattern = /@@chart\[(.+)\]\[(.+)\]/g;

		console.log(postContent);

		if (postContent.match(regularPattern)){
			postContent = postContent.replace("&quot;", "\'");
			postContent = postContent.replace(regularPattern, '<div id="chart1"></div> <script type="text/javascript">$.jqplot("chart1", [$1], $2);</script>');
		}
		callback(null, postContent);
	};

	module.exports = Charts;
}(module));
