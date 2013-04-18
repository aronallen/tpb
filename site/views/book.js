define(['zepto', 'lodash', 'views/sections', 'templates/book.mustache'], function($,_,SectionsView,Template){
  return SectionsView.extend({

    className : 'book-view',
    events : {
      'mouseover .row' : 'load',
      'click .row' : 'route'
    },


    load : function(e){
      t = this.target(e);
      this.model.chapters.models[t.index()].load();
    },

    route : function(e){
      t = this.target(e);
      window.location.hash = 'book/' + t.attr('data-book') + '/' + t.attr('data-chapter')
    },

    initialize : function(){
      this.model.chapters.bind('change:name', this.render, this);
    },

    render : function(){
      var el = this.$el;
      var models = this.model.chapters.invoke('toJSON');
      el.html(Template({
        'chapters' : models,
        'name' : this.model.get('name')
      }));
    }

  })
})