models/
=======

Directory for [Backbone views]. Example:

```javascript
// MyView.js
define([
	'backbone'
], function(Backbone) {

	return Backbone.View.extend({
		el: '.entry'
		events: {
			'click h1': 'header_clicked'
		},
		initialize: function(options) {
		},
		header_clicked: function() {
		}
	});

});
```

[Backbone views]: http://backbonejs.org/#View
