define(['zepto', 'lodash', 'backbone'], function($,_,BB){
  return BB.View.extend({
    'className' : 'content',
    'initialize' : function(){
      this.model.bind('change:content', this.render, this);
      if(this.model.has('content')) this.render();
    },
    'render' : function(){

      this.$el.html(this.model.get('content'));
      this.$el.prepend('<h2 class="ref">' + this.model.get('nick') + ':' + this.model.get('chapter') + '</h2>')
    }
  })
})