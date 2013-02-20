/*jshint node:true*/
'use strict';

var amd_bundler = exports;
var requirejs = require('requirejs');
var common = require('common');
var watchr = require('watchr');
var path = require('path');
var fs = require('fs');

function bundle(config, next_step) {
	next_step = next_step || function(){};
	config._next = next_step;

	console.log(config._buildMsg + '...');
	requirejs.optimize(config, function(response) {
		config._buildResponse = '' + response;
		if (typeof(response) !== 'string') {
			// Error occurred: response is error object.
			var error = response;
			console.error(config._buildMsg + ': Failed. ' + (error.stackFormatted || error));
			config._builtJS = jsLogError(config._buildMsg + ': Failed. ' + error);
			next_step(error);
		}
	});
}

function jsLogError(message) {
	message = '' + message;
	return 'typeof(console)==="object" && console.error && console.error(' + JSON.stringify(message) + ');\n';
}

amd_bundler.bundle = function(options) {
	options.next = options.next || function(){};
	options.name = (options.name || 'main').replace(/\.js$/, '');
	options.out = options.out || options.name + '-built.js';
	options.loader = path.normalize(options.src + '/' + (options.loader || 'require.js'));

	var config;
	config = {
		baseUrl        : path.normalize(options.src + '/'),
		mainConfigFile : path.normalize(options.src + '/' + options.name + '.js'),
		name           : options.name,
		optimize       : 'uglify2',
		inlineText     : true,
		wrap           : { startFile: options.loader },
		_outFilename   : path.normalize(options.src + '/' + options.out),
		_buildMsg      : 'Bundling ' + path.basename(options.out),
		_builtJS       : jsLogError('AMD / Require.JS bundle not built yet!'),
		out            : function(js) {
			fs.writeFile(config._outFilename, js, 'utf8', function(error) {
				if (error) {
					console.error(config._buildMsg + ': Failed. ' + (error.stackFormatted || error));
					config._builtJS = jsLogError(config._buildMsg + ': Failed. ' + error);
					config._next && config._next(error);
					return;
				}

				config._builtJS = js;
				console.log(config._buildMsg + ': OK (' + Math.ceil(js.length / 1024) + 'kb)');
				config._next && config._next();
			});
		}
	};

	common.step([
		function(next) {
			watchr.watch({
				path: config.baseUrl,
				listeners: {
					change: function(event, filename, current, previous) {
						if (event === 'update' && filename.slice(-3) === '.js' && filename !== config._outFilename) {
							bundle(config);
						}
					}
				},
				ignoreHiddenFiles: true,
				ignoreCommonPatterns: true,
				next: next
			});
		},
		function(watcher_instance, next) {
			bundle(config, next);
		},
		function() {
			options.next();
		}
	], function(error) {
		options.next(error);
	});

	return {

		connect: function(url, options) {
			url = url || '/require.js';
			options = options || {};

			return function(req, res, next) {
				if (req.path === url) {
					if (options.maxAge) {
						res.setHeader('Cache-Control', 'public, max-age=' + (options.maxAge / 1000));
					}
					res.set('Content-Type', 'application/javascript; charset=UTF-8');
					res.send(config._builtJS);
				} else {
					next();
				}
			};

		}
	}
};
