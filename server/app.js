#!/usr/bin/env node
/*jshint node:true*/
'use strict';

// Ensure we start out in project root directory, because Lo-Dash builder expects it.
process.chdir(__dirname + '/../');

// Better stack traces.
require('stack-formatted');
process.on('uncaughtException', function(error) {
	console.log(error.stackFormatted);
});

var config = require('./config');
var common = require('common');
var express = require('express');
var app = express();
var amd_bundler;

console.log('Starting ' + app.get('env') + ' server, please wait...');
function start_server() {
	app.configure(function() {
		var fileOptions = app.get('env') === 'production' ? {
			maxAge: 600 * 1000 // 10 min
		} : null;

		app.use(express.compress());
		app.use(require('connect-less')({ src: config.site_dir }));
		app.configure('production', function() {
			app.use(amd_bundler.connect('/libs/require/require.min.js', fileOptions));
		});
		app.use(express['static'](config.site_dir, fileOptions));
		app.use(express.bodyParser());
		app.use(app.router);
		app.use(express.errorHandler());
	});

	app.listen(config.listen_port);
	console.log('Started ' + config.name + '@' + config.version + ' on port ' + config.listen_port);
}

require('./lodash-builder').build({
	type: config.lodash_build,
	file: 'site/libs/lodash/lodash.js'
});

common.step([
	function(next) {
		require('./mustache-live').watch({
			src: config.site_dir,
			root: 'templates',
			underscore: 'lodash',
			next: next
		});
	},
	function(next) {
		if (app.get('env') === 'development') return next();

		amd_bundler = require('./amd-bundler').bundle({
			src: config.site_dir,
			loader: 'libs/require/almond.min.js',
			next: function() {
				next(); // Ignore potential errors in first AMD bundle, so the server starts.
			}
		});
	},
	function() {
		start_server();
	}
]);
