define(['zepto', 'lodash', 'backbone', 'collections/chapters'], function($, _, BB, Chapters) {
    return BB.Model.extend({
        defaults: {
            'collection': 'gt',
            'nick': '1mos',
            'chapters': 50
        },

        initialize: function() {
            var models = []; 
            _(this.get('chapters')).times(_.bind(function(count){
                models.push({
                    'collection': this.get('collection'),
                    'nick' : this.get('nick'),
                    'chapter' : count+1
                });
            }, this));
            this.chapters = new Chapters(models);
        },

    });
  });