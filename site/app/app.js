/*globals define:true*/
define(['backbone', 'app/books', 'collections/books', 'views/sections', 'views/book', 'views/chapter'], function(BB, sections,Books,SectionView,BookView,ChapterView){

  window.App = {};
  App.sections = {};
  _.each(sections, function(section){
    App.sections[section.nick] = new Books(section.books);
    App.sections[section.nick].name = section.name;
  });

  var Router = BB.Router.extend({
    'routes' : {
      'book/*book/:chapter' : 'chapter',
      'book/*book' : 'book',
      '' : 'home'
    },
    book : function(book){
      window.scrollTo(0,0);
      var b = _.find(_.flatten(_.pluck(App.sections,'models')), function(m){
        return m.get('nick') === book;
      });

      var view = new BookView({model : b})
      view.render();

      $("body").empty().append(view.el);
    },
    chapter : function(book, chapter){
      window.scrollTo(0,0);
      var chapters = _.flatten(_.pluck(_.pluck(_.flatten(_.pluck(App.sections,'models')), 'chapters'), 'models'));
      var chapter  = _.find(chapters, function(m){
        return m.get('nick') === book && m.get('chapter') == chapter;
      })
      
      chapter.load();

      var view = new ChapterView({model : chapter});

      $("body").empty().append(view.el);

    },
    home : function(){
      window.scrollTo(0,0);
      $("body").empty();
      _.each(App.sections, function(section){
          var view = new SectionView({collection : section});
          view.render();
          $("body").append(view.el);
      });
    }
  });

  App.router = new Router();
  BB.history.start()

});