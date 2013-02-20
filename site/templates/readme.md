templates/
==========

Contains [Mustache templates]. Example:

```html
<!-- user-board.mustache -->
<div class="user-board">

	<h1>{{title}}</h1>
	<p>{{text}}</p>

	{{#has_todos}}
		<p>Todo list:</p>
		<ul class="todos">
			{{#todos}}
				<li>{{title}}</li>
			{{/todos}}
		</ul>
	{{/has_todos}}

	{{^has_todos}}
		<p>No more to do.</p>
	{{/has_todos}}

	{{> my-other-template-partial }}

</div>
```

The templates are automatically compiled on server-side for optimal performance. Include them like this:

```javascript
define([
	'zepto',
	'templates/user-board'
], function($, user_board) {

	// The user_board function returns the resulting HTML when passed a view object.

	$('body').append(user_board({
		title: 'Board',
		text: 'Welcome back, user!',
		has_todos: false
	}));

});
```

[Mustache templates]: http://mustache.github.com/mustache.5.html
