(function($){

  $.fn.extend({
    datetimeparse: function(options) {

      var defaults = {
        //something like this: defaultTime: 08:00:00
      }

      var options =  $.extend(defaults, options);

      return this.each(function() {
        var object = $(this);
        var inputText = object.text();
        var parsedDate = new Date();
        return parsedDate;
      });
    }
  });

})(jQuery);