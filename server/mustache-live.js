/*globals exports:true,require:true,process:true,console:true*/
var mustache_live = exports;
var mustache_amd = require('./mustache-amd');
var common = require('common');
var path = require('path');
var glob = require('glob');
var watchr = require('watchr');
var fs = require('fs');

function compile(options, filename, in_filename, next_step) {
	next_step = next_step || function(){};
	filename = options.root + filename;
	console.log('Compiling ' + filename + ' to JavaScript.');
	var out_filename = in_filename + '.js';

	common.step([
		function(next) {
			fs.readFile(in_filename, 'utf8', next);
		},
		function(template, next) {
			template = template.trim().replace(/(\}\}|>)(?:[\r\n]|\s{2,})(<|\{\{)/g);
			var js = mustache_amd.compile(template, {
				compile_errors: true,
				underscore: options.underscore,
				filename: filename,
				root: options.root
			}).javascript;
			fs.writeFile(out_filename, js, 'utf8', next);
		},
		function() {
			next_step();
		}
	], function(error) {
		console.log('Error compiling ' + filename + ': ' + (error.stack || error));
		next_step(error);
	});
}

mustache_live.watch = function(options) {
	options = options || {};
	options.src = options.src || process.cwd();
	options.root = options.root ? path.normalize(options.root + '/') : '';
	options.next = options.next || function(){};
	var watch_dir = path.normalize(options.src + '/' + options.root + '/');

	common.step([
		function(next) {
			watchr.watch({
				path: watch_dir,
				listeners: {
					change: function(event, filename, current, previous) {
						if (event === 'update' && filename.slice(-9) === '.mustache') {
							var file = path.relative(watch_dir, filename);
							compile(options, file, watch_dir + file);
						}
					}
				},
				ignoreHiddenFiles: true,
				ignoreCommonPatterns: true,
				next: next
			});
		},
		function(watcher_instance, next) {
			glob('**/*.mustache', {
				cwd: watch_dir
			}, next);
		},
		function(files, next) {
			if (files.length === 0) return next();

			files.forEach(function(file) {
				compile(options, file, watch_dir + file, next.parallel());
			});
		},
		function() {
			options.next();
		}
	], function(error) {
		options.next(error);
	});
};
