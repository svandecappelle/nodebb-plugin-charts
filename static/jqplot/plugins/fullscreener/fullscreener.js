(function($) {
	$.jqplot.Fullscreener = function(chart, chartcanvas){
		this.id = chart;
		this.canvas = chartcanvas;
		this.height = $('#'+chart+' .resizable').height();
		this.width = $('#'+chart+' .resizable').width();
	};

	$.jqplot.Fullscreener.prototype.bind = function() {
		var that = this;
		$('#'+this.id+' .fullscreener').click(function() {
			that.fullscreen();
		});
		$('#'+this.id+' .popup .close').click(function() {
			that.closefullscreen();
		});
		$('#'+this.id+' .overlay').click(function() {
			that.closefullscreen();
		});	
	};

	$.jqplot.Fullscreener.prototype.unbind = function() {
		var that = this;
		$('#'+this.id+' .fullscreener').unbind();
		$('#'+this.id+' .popup .close').unbind();
		$('#'+this.id+' .overlay').unbind();
	};

	$.jqplot.Fullscreener.prototype.fullscreen = function() {
		$('#'+this.id+' .popup').addClass(' is-active ');
		$('#'+this.id+' .overlay').addClass(' is-active ');
		$('#'+this.id+' .resizable').height("100%");
		$('#'+this.id+' .resizable').width("100%");
		$('#'+this.id+' .chart').height($('#'+this.id+' .resizable').height());
		$('#'+this.id+' .chart').width($('#'+this.id+' .resizable').width());
		this.canvas.replot();
		return true;
	};

	$.jqplot.toggleFullscreen = function(id, chart){
		var screener = new $.jqplot.Fullscreener(id, chart);
		screener.bind();
		
		if ((this.currentId !== undefined && this.currentChart !== undefined) && (this.currentId !== id && this.currentChart !== chart)){
			var previousCanvas = this.currentChart;
			var previousId = this.currentChart;

			this.currentChart = undefined;
			this.currentId = undefined;
			$.jqplot.toggleFullscreen(previousId, previousCanvas);
		}

		this.currentChart = chart;
		this.currentId = id;
		console.log($('#'+id+' .popup').hasClass('is-active'));
		if($('#'+id+' .popup').hasClass('is-active')){
			console.log("toggle invisible " +id);
			$('#'+id+' .popup').removeClass(' is-active ');
			$('#'+id+' .overlay').removeClass(' is-active ');
			$('#'+id+' .resizable').height(this.currentPreviousHeight);
			$('#'+id+' .resizable').width(this.currentPreviousWidth);
			$('#'+id+' .chart').height(this.currentPreviousHeight);
			$('#'+id+' .chart').width(this.currentPreviousWidth);
			chart.replot();

			if (! ($('#'+id).position().top > $(window).scrollTop() && $('#'+id).position().top < $(window).height())){
				$('html, body').animate({
					scrollTop: $('#'+id).offset().top
				}, 500);
			}
		}else{
			console.log("toggle visible " +id);
			this.currentPreviousWidth = $('#'+id+' .resizable').width();
			this.currentPreviousHeight = $('#'+id+' .resizable').height();
			$('#'+id+' .popup').addClass(' is-active ');
			$('#'+id+' .overlay').addClass(' is-active ');
			$('#'+id+' .resizable').height("100%");
			$('#'+id+' .resizable').width("100%");
			$('#'+id+' .chart').height($('#'+id+' .resizable').height());
			$('#'+id+' .chart').width($('#'+id+' .resizable').width());
			chart.replot();
		}
	}

	$.jqplot.Fullscreener.prototype.closefullscreen = function() {
		$('#'+this.id+' .popup').removeClass(' is-active ');
		$('#'+this.id+' .overlay').removeClass(' is-active ');

		$('#'+this.id+' .resizable').height(this.height);
		$('#'+this.id+' .resizable').width(this.width);
		$('#'+this.id+' .chart').height(this.height);
		$('#'+this.id+' .chart').width(this.width);

		this.canvas.replot();

		if (! ($('#'+this.id).position().top > $(window).scrollTop() && $('#'+this.id).position().top < $(window).height())){
			$('html, body').animate({
				scrollTop: $('#'+this.id).offset().top
			}, 500);
		}

		return true;
	};
})(jQuery);