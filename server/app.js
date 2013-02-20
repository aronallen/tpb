#!/usr/bin/env node

// Ensure we start out in project root directory.
process.chdir(__dirname + '/../');

var config = require('./config');
var express = require('express');
var app = express();

require('./lodash-builder').build({
	type: config.lodash_build,
	file: 'site/libs/lodash/lodash.js'
});

require('./mustache-live').watch({
	src: config.site_dir,
	root: 'templates',
	underscore: 'lodash'
});

app.configure(function() {
	//app.use(express.logger());
	app.use(express.compress());
	app.use(require('connect-less')({ src: config.site_dir }));
	app.use(express.static(config.site_dir));
	app.use(express.bodyParser());
	app.use(app.router);
});

app.listen(config.listen_port);
console.log('Started ' + config.name + '@' + config.version + ' on port ' + config.listen_port);
