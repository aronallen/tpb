var config = exports;
var pkg = require('../package.json');
var path = require('path');

config.name    = pkg.name;
config.version = pkg.version;

// Load runtime configuration (or default if not specified).
Object.keys(pkg.config).forEach(function(key) {
	var value = pkg.config[key] || process.env['npm_package_config_' + key] || process.env['config_' + key] || null;
	config[key] = value;
});

// Special configs:
config.site_dir = path.normalize(__dirname + '/../' + (config.site_dir || 'site/') + '/.');
config.listen_port = (config.listen_port || process.env.PORT || (process.env.NODE_ENV === 'production' ? 80 : 3000)) | 0;
