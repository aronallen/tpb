Beautiful project template
==========================

Getting started (replace `MY-COOL-APP`):

```bash
# Clone this project
git clone git@github.com:contingent/new-project.git MY-COOL-APP
cd MY-COOL-APP/

# Change git remotes
git remote rm origin
git remote add origin git@github.com:contingent/MY-COOL-APP.git # GitHub project name
git push -u origin master

# Start server
npm install
npm start
```

Update name in `package.json` and title in `site/index.html`.

Then delete this message and describe your project here.

... and start coding.


Using jQuery
------------

The project template includes both jQuery and Zepto (jQuery replacement for mobile). You can choose to use the library that suits you best. However you must update the `backbone` dependency in `site/main.js` if you're going to use jQuery; it defaults to Zepto.


Lo-Dash
-------

The project includes an Underscore replacement called Lo-Dash, optimized for mobile. You can change that in the `package.json` config. Valid values for `lodash_build` are:

 *  **default**, normal full build
 *  **backbone**, only methods required by Backbone
 *  **csp**, supporting default Content Security Policy restrictions
 *  **legacy**, tailored for older environments without ES5 support
 *  **modern**, tailored for newer environments with ES5 support
 *  **mobile** (default), without method compilation and most bug fixes for old browsers
 *  **strict**, with `_.assign`, `_.bindAll`, & `_.defaults` in strict mode
 *  **underscore**, tailored for projects already using Underscore
