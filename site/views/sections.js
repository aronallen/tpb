define(['zepto', 'lodash', 'backbone', 'templates/section.mustache'], function($,_,BB,Template){
  return BB.View.extend({
    className : 'section',
    events : {
      'click .row' : 'route'
    },


    target : function(e){
      var t = $(e.originalEvent.target);
      while(!t.hasClass('row')){
        t = t.parent();
      }
      return t;
    },

    route : function(e){
      window.location.hash = 'book/' + this.target(e).attr('data-book')
    },

    render : function(){
      var el = this.$el;
      el.empty();
      var models = this.collection.invoke('toJSON');
      el.html(Template({
        'books' : models,
        'name' : this.collection.name
      }))
    }
  })
});