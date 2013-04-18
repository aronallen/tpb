define(['zepto', 'lodash', 'backbone', 'collections/chapters'], function($, _, BB, Chapters) {
    return BB.Model.extend({
        defaults: {
            'collection': 'gt',
            'book': '1mos',
            'chapters': 50
        },

        initialize: function() {
            var models = []; 
            _(this.get('chapters')).times(_.bind(function(count) {

                models.push({
                    'collection': this.get('collection'),
                    'book' : this.get('book'),
                    'chapter' : count+1
                });
            }, this));
            console.log(models);
            this.chapters = new Chapters(models);
        },

    });
  });