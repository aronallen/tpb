define(['zepto', 'lodash', 'backbone'], function($, _, BB) {
    return BB.Model.extend({
        defaults : {
            'collection': 'gt',
            'book': '1mos',
            'chapter': 1
        },

        url: function() {
            var URL = '/data/danbib/web/';
            var b = this.get("book");
            var c = this.get("chapter");
            return URL + b + '/' + c + 'b.htm';
        }

    });
});