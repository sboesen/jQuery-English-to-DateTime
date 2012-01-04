(function($){

  $.fn.extend({
    datetimeparse: function(options) {

      var defaults = {
        //something like this: defaultTime: 08:00:00
      }

      var options =  $.extend(defaults, options);

      return this.each(function() {
        var inputText = $.trim($(this).val()); //no harm...
        console.log("Got input: "+inputText);
        console.log("Is date? "+isDate(inputText));
        var parsedDate = new Date();
        return parsedDate;
      });
      
      
      function on(time, date){
        //on is called when something like this is found: 7 PM on Friday
        return;
      }
      function at(date, time) {
        //at is called when something like this is found: Friday at 7 PM
        return;
      }
      function isDate(date) {
        //second or third character needs to be a slash.
        date = $.trim(date);
        if (date.length <= 5) {
          //No year specified, so only one slash...
          //Check length because otherwise things like "1/" are valid...
          return ( (date.charAt(1) == '/' && date.length > 2) || (date.charAt(2) == '/' && date.length > 3) );
        }
        else {
          //If we're here... Date must include year, so check for two slashes.
          var firstSlash = (date.charAt(1) == '/' || date.charAt(2) == '/');
          var secondSlash = (date.charAt(3) == '/' || date.charAt(4) == '/' || date.charAt(5) == '/');
          return (firstSlash && secondSlash && date.charAt(-1) != '/');
        }
      }
      function dateInFuture(date) {
        var now = new Date();
        if (date > now) {return true;}
        return false;
      }
    }
    
  });

})(jQuery);