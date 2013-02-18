collections/
============

Directory for [Backbone collections]. Example:

```javascript
// MyModels.js
define([
	'backbone',
	'models/MyModel'
], function(Backbone, MyModel) {

	return Backbone.Collection.extend({
		model: MyModel,
		initialize: function(options) {
		}
	});

});
```

[Backbone collections]: http://backbonejs.org/#Collection
