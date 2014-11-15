
var MyRouter = Backbone.Router.extend({

  routes: {
    "*path": "page"
  },

  test: function (data) {
    console.log("CALLED");
  },

  initialize: function(){
    $('body').on('click', 'a', function(e){
      console.log('navigating to: ' + $(this).attr('href'));
      try {
        Backbone.history.navigate($(this).attr('href'));
      } catch(e){
        console.log(e);
      }

      e.preventDefault();
      e.stopPropagation();
      return false;
    });
  },

  page: function(){
    console.log("Page thing, here");
  }

});

$(function(){
  var router = new MyRouter();
  Backbone.history.start({ pushState: true, root: '/' });
});


