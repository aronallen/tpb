#!/usr/bin/env node

var config = require('./config');
var express = require('express');
var app = express();

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
