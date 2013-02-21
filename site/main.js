/*globals require:true*/
require.config({

	paths: {
		'backbone' : 'libs/backbone/backbone',
		'lodash'   : 'libs/lodash/lodash', // Underscore replacement
		'jquery'   : 'libs/jquery/jquery',
		'zepto'    : 'libs/zepto/zepto', // jQuery replacement on mobile
		'text'     : 'libs/require/text', // Require.JS text plugin
		'socket.io': '/socket.io/socket.io.js'
	},

	shim: {
		'backbone' : { exports: 'Backbone', deps: ['lodash', 'zepto'] },
		'zepto'    : { exports: 'Zepto' }
	}

});

require([
	'app/css-auto-update',
	'app/app'
]);