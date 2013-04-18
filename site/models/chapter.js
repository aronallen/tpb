define(['zepto', 'lodash', 'backbone'], function($, _, BB) {
    return BB.Model.extend({
        defaults : {
            'collection': 'gt',
            'book': '1mos',
            'chapter': 1
        },

        initialize : function(){
          this.set({'name' : 'Kapitel ' + this.get('chapter')});
        },

        load : function(){
          if(this.has('content')) return;
          $.get(this.url(), _.bind(function(r){
            var d = $("<div>").html(r.split('</HEAD>')[1]);
            var body = r.split('</HEAD>')[1].split('</HTML>')[0];
            d.html(body);
            this.set({'content' : d.html()});
            if($("h2", d).length){
              this.set({'name' : $("h2", d).first().text()})
            }
          }, this));
        },


        url: function() {
            var URL = '/data/danbib/web/';
            var b = this.get("nick");
            var c = this.get("chapter");
            return URL + b + '/' + c + 'b.htm';
        }

    });
});