/*globals require:true*/
require.config({

	paths: {
		'backbone' : 'libs/backbone/backbone.min',
		'lodash'   : 'libs/lodash/lodash.min', // Underscore replacement
		'zepto'    : 'libs/zepto/zepto.min', // jQuery replacement
		'text'     : 'libs/require/text.min' // Require.JS text plugin
	},

	shim: {
		'backbone' : { exports: 'Backbone', deps: ['lodash', 'zepto'] }
	}

});

require([
	'app/app'
]);