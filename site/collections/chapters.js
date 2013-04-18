define(['zepto', 'lodash', 'backbone', 'models/chapter'], function($,_,BB,Chapter){
  return BB.Collection.extend({
    model : Chapter
  });
})