// MAP utility

// linking the key-value-pairs is optional
// if no argument is provided, linkItems === undefined, i.e. !== false
// --> linking will be enabled
function Map(linkItems) {
    this.current = undefined;
    this.size = 0;

    if (linkItems === false)
	this.disableLinking();
}

Map.noop = function() {
    return this;
};

Map.illegal = function() {
    throw new Error("illegal operation for maps without linking");
};

// map initialisation from existing object
// doesn't add inherited properties if not explicitly instructed to:
// omitting foreignKeys means foreignKeys === undefined, i.e. == false
// --> inherited properties won't be added
Map.from = function(obj, foreignKeys) {
    var map = new Map;

    for ( var prop in obj) {
	if (foreignKeys || obj.hasOwnProperty(prop))
	    map.put(prop, obj[prop]);
    }

    return map;
};

Map.prototype.disableLinking = function() {
    this.link = Map.noop;
    this.unlink = Map.noop;
    this.disableLinking = Map.noop;
    this.next = Map.illegal;
    this.key = Map.illegal;
    this.value = Map.illegal;
    this.removeAll = Map.illegal;

    return this;
};

// overwrite in Map instance if necessary
Map.prototype.hash = function(value) {
    return (typeof value) + ' ' + (value instanceof Object ? (value.__hash || (value.__hash = ++arguments.callee.current)) : value.toString());
};

Map.prototype.hash.current = 0;

// --- mapping functions

Map.prototype.get = function(key) {
    var item = this[this.hash(key)];
    return item === undefined ? undefined : item.value;
};

Map.prototype.put = function(key, value) {
    var hash = this.hash(key);

    if (this[hash] === undefined) {
	var item = {
	    key : key,
	    value : value
	};
	this[hash] = item;

	this.link(item);
	++this.size;
    } else
	this[hash].value = value;

    return this;
};

Map.prototype.remove = function(key) {
    var hash = this.hash(key);
    var item = this[hash];

    if (item !== undefined) {
	--this.size;
	this.unlink(item);

	delete this[hash];
    }

    return this;
};

// only works if linked
Map.prototype.removeAll = function() {
    while (this.size)
	this.remove(this.key());

    return this;
};

// --- linked list helper functions

Map.prototype.link = function(item) {
    if (this.size == 0) {
	item.prev = item;
	item.next = item;
	this.current = item;
    } else {
	item.prev = this.current.prev;
	item.prev.next = item;
	item.next = this.current;
	this.current.prev = item;
    }
};

Map.prototype.unlink = function(item) {
    if (this.size == 0)
	this.current = undefined;
    else {
	item.prev.next = item.next;
	item.next.prev = item.prev;
	if (item === this.current)
	    this.current = item.next;
    }
};

// --- iterator functions - only work if map is linked

Map.prototype.next = function() {
    this.current = this.current.next;
};

Map.prototype.key = function() {
    return this.current.key;
};

Map.prototype.value = function() {
    return this.current.value;
};

function GreyScalePieTheme(){
	this.seriesStyles = {
		seriesColors : ['rgba(7,7,7,0.5)', 'rgba(255,255,255,0.5)', 'rgba(39,39,39,0.5)',
		'rgba(167,167,167,0.5)','rgba(71,71,71,0.5)','rgba(191,191,191,0.5)','rgba(103,103,103,0.5)','rgba(23,23,23,0.5)',
		'rgba(143,143,143,0.5)','rgba(79,79,79,0.5)','rgba(183,183,183,0.5)','rgba(119,119,119,0.5)','rgba(223,223,223,0.5)','rgba(55,55,55,0.5)'],
		highlightColors : ['#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF',
		'#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF','#FFFFFF',
		'#FFFFFF','#FFFFFF','#FFFFFF']
	};

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.0)'
    };
}

GreyScalePieTheme.prototype.clone = function(){
	return new GreyScalePieTheme();
}

function GreyScaleTheme(){
	this.series = [{color:'rgba(7,7,7,0.5)',highlightColors : []},
			{color:'rgba(255,255,255,0.5)',highlightColors : []},
			{color:'rgba(39,39,39,0.5)',highlightColors : []},
			{color:'rgba(167,167,167,0.5)',highlightColors : []},
			{color:'rgba(71,71,71,0.5)',highlightColors : []},
			{color:'rgba(191,191,191,0.5)',highlightColors : []},
			{color:'rgba(103,103,103,0.5)',highlightColors : []},
			{color:'rgba(23,23,23,0.5)',highlightColors : []},
			{color:'rgba(143,143,143,0.5)',highlightColors : []},
			{color:'rgba(79,79,79,0.5)',highlightColors : []},
			{color:'rgba(183,183,183,0.5)',highlightColors : []},
			{color:'rgba(119,119,119,0.5)',highlightColors : []},
			{color:'rgba(223,223,223,0.5)',highlightColors : []},
			{color:'rgba(55,55,55,0.5)',highlightColors : []},
	];

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.0)'
    };
}

GreyScaleTheme.prototype.clone = function(){
	return new GreyScaleTheme();
}

function BlueAlphaTheme(){
	this.series = [{color:'rgba(215,230,253,0.5)',highlightColors : []},
			{color:'rgba(176,205,252,0.5)',highlightColors : []},
			{color:'rgba(132,179,252,0.5)',highlightColors : []},
			{color:'rgba(90,152,250,0.5)',highlightColors : []},
			{color:'rgba(55,120,250,0.5)',highlightColors : []},
			{color:'rgba(49,105,209,0.5)',highlightColors : []},
			{color:'rgba(38,83,165,0.5)',highlightColors : []},
			{color:'rgba(28,61,120,0.5)',highlightColors : []},
			{color:'rgba(20,43,86,0.5)',highlightColors : []},
			{color:'rgba(15,24,41,0.5)',highlightColors: []}
	];

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(0, 0, 255, 0.1)',
		gridLineColor: 'rgba(0, 135, 255, 0.1)',
    };
}

BlueAlphaTheme.prototype.clone = function(){
	return new BlueAlphaTheme();
}

function BlueAlphaPieTheme(){

	this.seriesStyles = {
		seriesColors : ['rgba(215,230,253,0.5)', 'rgba(176,205,252,0.5)',
		 'rgba(132,179,252,0.5)','rgba(90,152,250,0.5)','rgba(55,120,250,0.5)',
		 'rgba(49,105,209,0.5)','rgba(38,83,165,0.5)','rgba(28,61,120,0.5)',
		 'rgba(20,43,86,0.5)','rgba(15,24,41,0.5)'],
		highlightColors : ['rgba(215,230,253,1)', 'rgba(176,205,252,1)',
		 'rgba(132,179,252,1)','rgba(90,152,250,1)','rgba(55,120,250,1)',
		 'rgba(49,105,209,1)','rgba(38,83,165,1)','rgba(28,61,120,1)',
		 'rgba(20,43,86,1)','rgba(15,24,41,1)']
	};

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.0)'
    };
}

BlueAlphaPieTheme.prototype.clone = function(){
	return new BlueAlphaPieTheme();
}

function RainbowAlphaTheme(){
	this.series = [{color:'rgba(0,75,255,0.5)',highlightColors : []},
			{color:'rgba(0,135,255,0.5)',highlightColors : []},
			{color:'rgba(0,178,255,0.5)',highlightColors : []},
			{color:'rgba(0,217,255,0.5)',highlightColors : []},
			{color:'rgba(0,255,255,0.5)',highlightColors : []},

			{color:'rgba(0,255,202,0.5)',highlightColors : []},
			{color:'rgba(0,255,157,0.5)',highlightColors : []},
			{color:'rgba(0,255,92,0.5)',highlightColors : []},
			{color:'rgba(24,255,0,0.5)',highlightColors : []},
			{color:'rgba(209,255,0,0.5)',highlightColors : []},
			{color:'rgba(255,238,0,0.5)',highlightColors : []},
			{color:'rgba(255,170,0,0.5)',highlightColors : []},
			{color:'rgba(255,77,0,0.5)',highlightColors : []},
			{color:'rgba(255,0,47,0.5)',highlightColors : []},
			{color:'rgba(255,0,134,0.5)',highlightColors : []},
			{color:'rgba(255,0,231,0.5)',highlightColors : []},
			{color:'rgba(191,0,255,0.5)',highlightColors : []},
	];

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.1)',
    };
}

RainbowAlphaTheme.prototype.clone = function(){
	return new RainbowAlphaTheme();
}

function RainbowAlphaPieTheme(){

	this.seriesStyles = {
		seriesColors : ['rgba(0,75,255,0.5)', 'rgba(0,135,255,0.5)',
		 'rgba(0,178,255,0.5)','rgba(0,217,255,0.5)','rgba(0,255,255,0.5)',
		 'rgba(0,255,202,0.5)','rgba(0,255,157,0.5)','rgba(0,255,92,0.5)',
		 'rgba(24,255,0,0.5)','rgba(209,255,0,0.5)','rgba(255,238,0,0.5)',
		 'rgba(255,170,0,0.5)','rgba(255,77,0,0.5)','rgba(255,0,47,0.5)',
		 'rgba(255,0,134,0.5)','rgba(255,0,231,0.5)','rgba(191,0,255,0.5)'],
		highlightColors : ['rgba(255,255,255,0.5)','rgba(255,255,255,0.5)',
		 'rgba(255,255,255,0.5)','rgba(255,255,255,0.5)','rgba(255,255,255,0.5)']
	};

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.1)'
    };
}

RainbowAlphaPieTheme.prototype.clone = function(){
	return new RainbowAlphaPieTheme();
}

function VklThemeTruncator(src){
	this.src = src;
}

VklThemeTruncator.prototype.truncate = function(chart){
	var size = chart.series.length;
	this.src = this.src.clone();
	return this.truncateSeries(size);
}

VklThemeTruncator.prototype.truncateSeries = function(size){
	if (this.src.series !== undefined){
		var default_series = this.src.series;
		this.src.series = [];
		for (var i = 0; i < size; i++) {	
			this.src.series[i] = default_series[i];
		}
	}
	
	return this.src;
}

function VKlBasePieTheme(){
	this.seriesStyles = {
		seriesColors : ['rgba(245,79,79,1)','rgba(255,211,112,1)',
		 'rgba(52,207,109,1)','rgba(88,195,240,1)','rgba(245,143,84,1)',
		 'rgba(168,208,49,1)','rgba(88,240,169,1)','rgba(88,142,240,1)',
		 'rgba(255,158,228,1)','rgba(255,173,66,1)','rgba(99,207,50,1)',
		 'rgba(88,240,222,1)','rgba(142,142,250,1)','rgba(255,153,165,1)'],
		highlightColors : ['rgba(245,149,149,0.5)','rgba(255,230,173,0.5)',
		 'rgba(139,207,164,0.5)','rgba(166,218,240,0.5)','rgba(245,194,164,0.5)',
		 'rgba(195,208,158,0.5)','rgba(173,240,209,0.5)','rgba(170,195,240,0.5)',
		 'rgba(255,222,246,0.5)','rgba(255,220,173,0.5)','rgba(171,207,155,0.5)',
		 'rgba(194,240,235,0.5)','rgba(212,212,250,0.5)','rgba(255,214,219,0.5)']
	};

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.0)'
    };
}
VKlBasePieTheme.prototype.clone = function(){
	return new VKlBasePieTheme();
}

function VKlBaseTheme(){
	this.series = [{color:'rgba(245,79,79,0.9)',highlightColors : []},
			{color:'rgba(255,211,112,0.9)',highlightColors : []},
			{color:'rgba(52,207,109,0.9)',highlightColors : []},
			{color:'rgba(88,195,240,0.9)',highlightColors : []},
			{color:'rgba(245,143,84,0.9)',highlightColors : []},
			{color:'rgba(168,208,49,0.9)',highlightColors : []},
			{color:'rgba(88,240,169,0.9)',highlightColors : []},
			{color:'rgba(88,142,240,0.9)',highlightColors : []},
			{color:'rgba(255,158,228,0.9)',highlightColors : []},
			{color:'rgba(255,173,66,0.9)',highlightColors : []},
			{color:'rgba(99,207,50,0.9)',highlightColors : []},
			{color:'rgba(88,240,222,0.9)',highlightColors : []},
			{color:'rgba(142,142,250,0.9)',highlightColors : []},
			{color:'rgba(255,153,165,0.9)',highlightColors : []}
	];

	this.grid = {
		drawBorder : false,
		shadow : false,
		backgroundColor : 'rgba(255, 255, 255, 0.0)'
    };
}

VKlBaseTheme.prototype.clone = function(){
	return new VKlBaseTheme();
}


function VklThemes(){
	this.themes = new Map();
	this.themes.put('vkbase', new VKlBaseTheme());
	this.themes.put('vkbase_pie', new VKlBasePieTheme());
	this.themes.put('grey_scale', new GreyScaleTheme());
	this.themes.put('grey_scale_pie', new GreyScalePieTheme());
	this.themes.put('rainbow', new RainbowAlphaTheme());
	this.themes.put('rainbow_pie', new RainbowAlphaPieTheme());
	this.themes.put('bluealpha', new BlueAlphaTheme());
	this.themes.put('bluealpha_pie', new BlueAlphaPieTheme());
}

VklThemes.prototype.get = function(_name, chart){
	var theme = this.themes.get(_name);
	var engine = new VklThemeTruncator(theme);
	return engine.truncate(chart);
}