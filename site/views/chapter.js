define(['zepto', 'lodash', 'backbone'], function($,_,BB){
  return BB.View.extend({
    'events' : {
      'swipeLeft' : 'next',
      'swipeRight' : 'prev'
    },

    'next' : function(){
      this.page('next')
    },

    'prev' : function(){
      this.page('prev');
    },

    page : function(direction){
      var mod = (direction === 'next') ? 1 : -1;

      var i = this.model.collection.models.indexOf(this.model);

      var n = i + mod;

      var chap = this.model.collection.models[n];

      if(chap){
        window.location.hash = 'book/' +  chap.get('nick') + '/' + chap.get('chapter');
      }
    },

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