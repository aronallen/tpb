define([
	'zepto',
	'socket.io'
], function($, io) {
	var socket = io.connect('/css-auto-update');
	var nocache_param = /nocache=\d+$/;

	socket.on('update', function(filename) {
		typeof(console) === 'object' && console.log && console.log('Style sheet ' + filename + ' updated.');

		var nocache = 'nocache=' + (new Date()).getTime();

		$('link').each(function() {
			var href = $(this).attr('href');

			if (nocache_param.test(href)) {
				href = href.replace(nocache_param, nocache);
			} else {
				href += (/\?/.test(href) ? '&' : '?') + nocache;
			}

			$(this).attr('href', href);
		});
	});
});