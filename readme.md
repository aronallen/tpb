Begin with (replace `MY-COOL-APP` with your own name):

```bash
# Clone this project
git clone git@github.com:contingent/new-project.git MY-COOL-APP
cd MY-COOL-APP/

# Change git remotes
git remote rm origin
git remote add origin git@github.com:contingent/MY-COOL-APP.git # GitHub project name

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
