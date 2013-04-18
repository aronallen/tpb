#!/usr/bin/env node

/*jshint node:true*/
'use strict';

// Ensure we start out in project root directory, because Lo-Dash builder expects it.
process.chdir(__dirname + '/../');

// Do not halt server on uncaugt exceptions.
process.on('uncaughtException', function(error) {
    console.log(error.stack);
});

var config = require('./config');
var common = require('common');
var watchr = require('watchr');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var socket = require('socket.io');
var io = socket.listen(server);
var amd_bundler;
var httpProxy = require('http-proxy');

console.log('Starting ' + app.get('env') + ' server, please wait...');

var opts = {
    'hostnameOnly' : true
};
var proxy = httpProxy.createServer(opts, function(req, res, proxy) {

    req.headers.host = 'old.bibelselskabet.dk';
    proxy.proxyRequest(req, res, {
        host: 'old.bibelselskabet.dk',
        port: 80
    });
});

function start_server() {
    app.configure(function() {
        var fileOptions = app.get('env') === 'production' ? {
            maxAge: 600 * 1000 // 10 min
        } : null;

        app.use(express.compress());
        app.use(require('connect-less')({
            src: config.site_dir,
            compress: app.get('env') === 'production'
        }));
        app.configure('production', function() {
            app.use(amd_bundler.connect('/libs/require/require.js', fileOptions));
        });
        app.use(express['static'](config.site_dir, fileOptions));
        app.use(express.bodyParser());
        app.use(app.router);
        app.use(express.errorHandler());
        app.use('/data/', proxy);
    });

    server.listen(config.listen_port);
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
}, function(next) {
    if (app.get('env') === 'development') return next();

    amd_bundler = require('./amd-bundler').bundle({
        src: config.site_dir,
        loader: 'libs/require/almond.js',
        next: function() {
            next(); // Ignore potential errors in first AMD bundle, so the server starts.
        }
    });
}, function() {
    start_server();
}]);

// Set up CSS auto updater.
var style_dir = config.site_dir + '/style';
watchr.watch({
    path: style_dir,
    listeners: {
        change: function(event, filename, current, previous) {
            if (event === 'update' && (filename.slice(-4) === '.css' || filename.slice(-5) === '.less') && filename !== style_dir + '/app.css') {
                filename = path.relative(style_dir, filename);
                console.log('Style sheet ' + filename + ' updated.');
                io.of('/css-auto-update').emit('update', filename);
            }
        }
    },
    ignoreHiddenFiles: true,
    ignoreCommonPatterns: true
});