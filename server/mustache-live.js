var mustache_live = exports;
var mustache_amd = require('./mustache-amd');
var path = require('path');
var glob = require('glob');
var watchr = require('watchr');
var fs = require('fs');

function compile(options, filename, in_filename) {
	filename = options.root + filename;
	console.log('Compiling ' + filename + ' to JavaScript.');
	var out_filename = in_filename + '.js';

	fs.readFile(in_filename, 'utf8', function(error, template) {
		if (error) {
			console.log('Error compiling ' + filename + ': ' + (error.stack || error));
			return;
		}

		template = template.trim().replace(/(\}\}|>)(?:[\r\n]|\s{2,})(<|\{\{)/g;
		var js = mustache_amd.compile(template, {
			compile_errors: true,
			underscore: options.underscore,
			filename: filename,
			root: options.root
		}).javascript;
		fs.writeFile(out_filename, js);
	});
}

mustache_live.watch = function(options) {
	options = options || {};
	options.src = options.src || process.cwd();
	options.root = options.root ? path.normalize(options.root + '/') : '';
	var watchDirectory = path.normalize(options.src + '/' + options.root + '/');

	watchr.watch({
		path: watchDirectory,
		listeners: {
			change: function(event, filename, current, previous) {
				if (event === 'update' && filename.slice(-9) === '.mustache') {
					var file = path.relative(watchDirectory, filename);
					compile(options, file, watchDirectory + file);
				}
			}
		},
		ignoreHiddenFiles: true,
		ignoreCommonPatterns: true
	});

	glob('**/*.mustache', {
		cwd: watchDirectory
	}, function(error, files) {
		if (error) throw error;

		files.forEach(function(file) {
			compile(options, file, watchDirectory + file);
		});
	});
};
