(function($){

  $.fn.extend({
    datetimeparse: function(options) {

      var defaults = {
        //Option for assuming future set to true or false...
      }

      var options =  $.extend(defaults, options);

      return this.each(function() {
        var inputText = $.trim($(this).val()); //no harm...
        console.log("Got input: "+inputText);
        console.log("Is date? "+isDate(inputText));
        var parsedDate = today();
        console.log("Is DOTW? "+dayOfTheWeek(inputText));
        console.log(parsedDate);
      });
      return parsedDate;
      function today() {
        retVal = new Date();
        retVal.setHours(0); //Midnight
        retVal.setMinutes(0);
        retVal.setSeconds(0);
        retVal.setMilliseconds(0);
        return retVal;
      }
      function on(time, date) {
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
        if (date.substr(-1) == '/') {return false;} //If last char is a slash it is not complete yet...
        if (date.length <= 5) {
          //No year specified, so only one slash...
          return ( date.charAt(1) == '/' || date.charAt(2) == '/' );
        }
        else {
          //If we're here... Date must include year, so check for two slashes.
          var firstSlash = (date.charAt(1) == '/' || date.charAt(2) == '/');
          var secondSlash = (date.charAt(3) == '/' || date.charAt(4) == '/' || date.charAt(5) == '/');
          return (firstSlash && secondSlash);
        }
      }
      function dayOfTheWeek(dotw) {
        switch(dotw.toLowerCase()) {
          case "mon": case "monday":
            var day = 0;
            break;
          case "tue": case "tues": case "tuesday":
            var day = 1;
            break;
          case "wed": case "wednesday":
            var day = 2;
            break;
          case "thur": case "thurs": case "thursday":
            var day = 3;
            break;
          case "fri": case "friday":
            var day = 4;
            break;
          case "sat": case "saturday":
            var day = 5;
            break;
          case "sun": case "sunday":
            var day = 6;
            break;
        }
        if (day != undefined)
        {
          return day;
        }
        return false;
      }
      function dateInFuture(date) {
        var now = new Date();
        if (date > now) {return true;}
        return false;
      }
    }
    
  });

})(jQuery);