/*globals require:true,exports:true*/
var path = require('path');
var mustache_amd = exports;

var mustache_tokens = /\{\{\{.*?\}\}\}|\{\{.*?\}\}|[^\{]+|[\s\S]/g;
var mustache_tag_token = /^\{\{([#\/&\^>])?\s*(\S+)\s*\}\}$/;
var mustache_tag_name = /^[\w\-]+$/;
var mustache_tag_path = /^[\w\-\.\/]+$/;

function parse_tokens(template) {
	var error;
	var token;
	var tokens = [];
	while ((token = mustache_tokens.exec(template)) !== null) {
		var offset = token.index;
		var lines = template.substr(0, offset).split(/\n|\r\n?/);
		var line = lines.length;
		var column = lines[lines.length - 1].length + 1;

		error = function error(type, description) {
			return {
				error: type,
				error_description: description,
				offset: offset,
				line: line,
				column: column
			};
		};

		var text = token[0];
		var type = text.substr(0, 2) === '{{' ? 'tag' : 'text';

		if (type === 'text' && tokens.length > 0 && tokens[tokens.length - 1].type === 'text') {
			tokens[tokens.length - 1].text += text;
		} else {
			if (type === 'tag') {
				var name;
				if (text.slice(0, 3) === '{{!') {
					tokens.push({
						type: 'comment',
						comment: text.slice(3, -2),
						text: text,
						offset: offset,
						line: line,
						column: column
					});
				} else {
					if (text.slice(0, 3) === '{{{' && text.slice(-3) === '}}}') {
						type = 'unescaped';
						name = text.slice(3, -3).trim();
					} else {
						var matches = text.match(mustache_tag_token);
						if (!matches) {
							return error('parse_error', 'Could not parse the tag ' + text + '.');
						}
						if (matches[1] === '#') {
							type = 'block';
						} else if (matches[1] === '/') {
							type = 'end';
						} else if (matches[1] === '&') {
							type = 'unescaped';
						} else if (matches[1] === '^') {
							type = 'inverse';
						} else if (matches[1] === '>') {
							type = 'partial';
						} else {
							type = 'variable';
						}
						name = matches[2];
					}
					if (!(mustache_tag_name.test(name) || (type === 'partial' && mustache_tag_path.test(name)))) {
						return error('invalid_tag_name', 'Tag name contains invalid characters in ' + text + '.');
					}
					tokens.push({
						type: type,
						name: name,
						text: text,
						offset: offset,
						line: line,
						column: column
					});
				}
			} else {
				tokens.push({
					type: 'text',
					text: text,
					offset: offset,
					line: line,
					column: column
				});
			}
		}
	}
	return { tokens: tokens };
}

function object_key_js(key) {
	return (/^(?!(?:as|do|if|in|is|for|int|let|new|try|use|var|byte|case|char|else|enum|eval|goto|long|null|this|true|void|with|break|catch|class|const|false|final|float|short|super|throw|while|yield|delete|double|export|import|native|public|return|static|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|arguments|interface|namespace|protected|transient|undefined|implements|instanceof|synchronized)$)[$_A-Za-z][$_A-Za-z0-9]*$/).test(key) ? '.' + key : '[' + JSON.stringify(key) + ']';
}

function block_name(reserved_names, key) {
	var base_name = 'block_' + ('' + key).replace(/-/g, '_');
	var name = base_name;
	var index = 0;
	while (reserved_names.indexOf(name) !== -1) {
		name = base_name + '_' + (++index);
	}
	return name;
}

function compile_block(tokens, options) {
	options = options || {};
	var name = options.name || 'template';
	var reserved_names = options.reserved_names ? options.reserved_names.slice() : [];
	reserved_names.push(name);

	function error(token, type, description) {
		return {
			error: type,
			error_description: description,
			offset: token.offset,
			line: token.line,
			column: token.column,
			token: {
				type: token.type,
				name: token.name || null
			}
		};
	}

	var js = '';
	var used_object = false;
	var used_block = false;
	var used_var = false;
	var partials = {};
	var blocks = [];
	var unparsed_text = '';
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		var part;
		if (token.type === 'text') {
			part = JSON.stringify(token.text) + '+';
		} else if (token.type === 'comment') {
			part = '/*' + token.comment + '*/';
		} else if (token.type === 'variable') {
			used_object = true;
			used_var = true;
			part = 'v(o' + object_key_js(token.name) + ')+';
		} else if (token.type === 'unescaped') {
			used_object = true;
			used_var = true;
			part = 'w(o' + object_key_js(token.name) + ')+';
		} else if (token.type === 'block' || token.type === 'inverse') {
			used_object = true;
			used_block = true;
			var subname = block_name(reserved_names, token.name);
			var compiled = compile_block(tokens.slice(i + 1), {
				end_tag: token.name,
				name: subname,
				reserved_names: reserved_names
			});
			reserved_names.push(subname);
			if (compiled.error) {
				return compiled;
			}
			Object.keys(compiled.partials).forEach(function(p) {
				partials[p] = compiled.partials[p];
			});
			blocks.unshift(compiled.javascript);
			var inverse = token.type === 'inverse' ? '!' : '';
			var text = inverse ? '' : compiled.unparsed_text;
			part = 'm(' + inverse + 'o' + object_key_js(token.name) + ',o,' + JSON.stringify(text) + ',' + subname + ')+';
			i += compiled.parsed_tokens + 1;
		} else if (token.type === 'partial') {
			used_object = true;
			var filename = token.name;
			var arg = ('' + filename).replace(/\.(?:mustache|md)$/g, '').replace(/\W+/g, '_').replace(/^_+|_+$/g, '');
			if (filename.slice(-9) !== '.mustache' && filename.slice(-3) !== '.md') {
				filename += '.mustache';
			}
			partials[arg] = filename;
			part = arg + '(o)+';
		} else if (token.type === 'end') {
			if (token.name === options.end_tag) {
				break;
			} else {
				return error(token, 'unexpected_end', 'The end tag does not correctly match the block tag.');
			}
		} else {
			return error(token, 'not_implemented', 'Token type not yet recognized.');
		}

		unparsed_text += token.text;
		if (js.slice(-2) === '"+' && part[0] === '"') {
			js = js.slice(0, -2) + part.slice(1);
		} else if (js.slice(-1) === '+' && part.slice(0, 2) === '/*') {
			js = js.slice(0, -1) + part + '+';
		} else {
			js += part;
		}
	}
	js = 'return ' + (js.slice(0, -1) || '""') + ';';
	if (used_object) {
		js = 'o=o||{};' + js;
	}
	js = 'function ' + name + '(' + (used_object ? 'o' : '') + '){' + js + '}';
	blocks.push(js);
	return {
		javascript: blocks.join('\n'),
		used_block: used_block,
		used_var: used_var,
		partials: partials,
		unparsed_text: unparsed_text,
		parsed_tokens: i
	};
}

function compile(template, options) {
	options = options || {};
	var underscore = options.underscore || 'underscore';
	var filename = options.filename || 'stdin';
	var root = options.root || './';
	var compiled;

	function compiled_error(error) {
		var message = '[[ Template error in ' + filename + ':' + error.line + ':' + error.column + ': ' + error.error_description + ' #' + error.error + ' ]]';
		return {
			javascript: 'function template(){return ' + JSON.stringify(message) + ';}',
			partials: {}
		};
	}

	if (typeof(template) === 'string') {
		template = parse_tokens(template);
	}
	if (template.error) {
		if (options.compile_errors) {
			compiled = compiled_error(template);
		} else {
			return template;
		}
	} else {
		compiled = compile_block(template.tokens);
		if (compiled.error) {
			if (options.compile_errors) {
				compiled = compiled_error(compiled);
			} else {
				return compiled;
			}
		}
	}

	var js = compiled.javascript + '\nreturn template;';
	var modules = compiled.partials;

	Object.keys(modules).forEach(function(m) {
		modules[m] = path.normalize(root + modules[m]);
	});

	var prefix = '/*globals define:true*/ // Generated on ' + new Date().toISOString() + '\n';
	var postfix = '\n});';
	if (compiled.used_block) {
		js = 'function m(o,r,t,b){return !o?"":_.isArray(o)?o.map(b).join(""):_.isFunction(o)?o(t,b(r)):_.isObject(o)?b(o):b(r);}\n' + js;
	}
	if (compiled.used_var) {
		js =
			'function w(o){return o===false?"":""+[o];}\n' +
			'function v(o){return _.escape(w(o));}\n' + js;
	}

	var moduleArgs = Object.keys(modules).sort();
	if (compiled.used_block || compiled.used_var) {
		modules._ = underscore;
		moduleArgs.unshift('_');
	}

	if (moduleArgs.length > 0) {
		prefix += 'define(' + JSON.stringify(moduleArgs.map(function(arg) {
			return modules[arg];
		})) + ',function(' + moduleArgs.join(',') + '){\n';
	} else {
		prefix += 'define(function(){\n';
	}

	return { javascript: prefix + js.replace(/^/mg, '\t') + postfix };
}

mustache_amd.parse_tokens = parse_tokens;
mustache_amd.compile_block = compile_block;
mustache_amd.compile = compile;
