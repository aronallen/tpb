#!/usr/bin/env node

/*

	Little script that starts the server in production. Used
	when `npm start` is not available and you're not able to
	set environment variables.

*/

process.env.NODE_ENV = 'production';
require('./app');
