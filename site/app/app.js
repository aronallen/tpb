/*globals define:true*/
define(['app/books', 'models/book'], function(books,Book){

  var moses = _.first(_.first(books).books);
  console.log(moses);

  window.b = new Book(moses);
  console.log(b);

});