var lodash_builder = exports;
var build = require('lodash/build');
var fs = require('fs');

lodash_builder.build = function(options) {
	options = options || {};
	options.file = ('' + [options.file]) || 'lodash.js';

	var type = '' + [options.type];
	if (type === 'default') {
		type = '';
	}

	var args = ['-p', '-o', options.file];
	if (type) {
		args.unshift(type);
	}

	fs.readFile(options.file, 'utf8', function(error, js) {
		if (error) {
			if (error.code !== 'ENOENT') {
				return; // ignore errors, but "file not found"
			}
		}

		if (('' + js).indexOf('Build: `lodash ' + args.join(' ') + '`') === -1) {
			console.log('Re-building ' + options.file + ' to ' + (type || 'default') + ' type.');
			build(args, function(b) {
				if (b.source) {
					fs.writeFile(b.outputPath, b.source);
				}
				if (b.sourceMap) {
					fs.writeFile(b.outputPath.replace(/\.js$/, '') + '.map', b.sourceMap);
				}
			});
		}
	});

};
