/*globals require:true*/
require.config({

	paths: {
		'backbone' : 'libs/backbone/backbone.min',
		'lodash'   : 'libs/lodash/lodash.min', // Underscore replacement
		'jquery'   : 'libs/jquery/jquery.min',
		'zepto'    : 'libs/zepto/zepto.min', // jQuery replacement on mobile
		'text'     : 'libs/require/text.min', // Require.JS text plugin
		'socket.io': '/socket.io/socket.io.js'
	},

	shim: {
		'backbone' : { exports: 'Backbone', deps: ['lodash', 'zepto'] },
		'zepto'    : { exports: 'Zepto' }
	}

});

require([
	'app/css-auto-update', // TODO: Automatically remove in production bundle.
	'app/app'
]);