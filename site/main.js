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
		'lodash'	 : { exports: '_'} 
		'backbone' : { exports: 'Backbone', deps: ['lodash', 'zepto'] },
		'zepto'    : { exports: '$' }
	}

});

require([
	'app/app'
]);