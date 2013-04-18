define(['zepto', 'lodash', 'backbone', 'models/book'], function($,_,BB,Book){
  return BB.Collection.extend({
    model : Book
  });
})