(function($){

  $.fn.extend({
    datetimeparse: function(options) {

      var defaults = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0
      }

      var options =  $.extend(defaults, options);
      var parsedDate = null;
      this.each(function() {
        var inputText = $.trim($(this).val()); //no harm...
        
        var inputArray = inputText.split(' ');
        //inputArray[0] can be... DATE, TIME, DOTW, "next"
        while (inputArray.length > 0){
          var parsed = parseInput(inputArray.shift(), inputArray,parsedDate);
          if (parsed != null) {
            parsedDate = parsed;
          }
        }
      });
      if (parsedDate == undefined) {
        return "Something went wrong!";
      }
      return parsedDate;
      
      //Helper functions
      
      function parseInput(input,inputArray,date) {
        //Where the magic happens...
        if (date == null) {date = new Date();}
        if (isDate(input)) {
          console.log("Is date...");
          date = new Date(inputArray[0]);
          date = defaultTime(parsedDate);
        }
        else if (isTime(input)) {
          console.log(input+ "is time")
          var inputHour = getInputHour(input,inputArray[0]);
          var inputMinute = getInputMinute(input);
          var inputSecond = getInputSecond(input);
          console.log("Input Hour: "+inputHour+" Input minute: "+inputMinute+" Input second: "+inputSecond);
          date.setHours(inputHour);
          date.setMinutes(inputMinute);
          date.setSeconds(inputSecond);
          inputArray.shift();
        }
        //Traditional stuff out of the way... Now input must == ("next","at","on",DOTW)
        else if (dayOfTheWeek(input) != false) {
          var newDay = dayOfTheWeek(input);
          date = nextDOTW(newDay,date);
        }
        else if (input == "at") {
          //Expecting inputArray[0] to be TIME
          console.log("In at. inputArray[0] == "+inputArray[0])
          if (isTime(inputArray[0])) {
            console.log("in AT _and_ is time");
            var inputHour = getInputHour(inputArray[0],inputArray[1]);
            var inputMinute = getInputMinute(inputArray[0]);
            var inputSecond = getInputSecond(inputArray[0]);
            console.log("Input Hour: "+inputHour+" Input minute: "+inputMinute+" Input second: "+inputSecond);
            date.setHours(inputHour);
            console.log("New date = "+date.toString())
            date.setMinutes(inputMinute);
            date.setSeconds(inputSecond);
            inputArray.shift();
          }
        }
        console.log(" ");
        return date;
      }
      function nextDOTW(day,date) {
        var hours = date.getHours();
        var currentDay = date.getDay();
        if (currentDay == day) {
          //Today is Monday and I say Monday
          date.setHours(hours+24*7); //Assume next week
        }
        else if (currentDay < day) {
          //Today is Sunday and I say Monday
          //Day - currentDay == 1
          date.setHours(hours + 24*(day - currentDay));
        }
        else if (currentDay > day) {
          //Today is Monday and I say Sunday
          //Day - currentDay + 7 == 6
          date.setHours(hours + 24*(day - currentDay + 7));
        }
        return date;
      }
      function getInputMinute(time) {
        timeArray = time.split(':');
        if (timeArray.length < 2) {return 0;}
        return timeArray[1];
      }
      function getInputHour(time,period) {
        var timeArray = time.split(':');
        console.log("Hour == "+timeArray[0]);
        
        var hour = parseInt(timeArray[0]);
        console.log("Hour == "+hour);
        if (period == undefined) {period = 'am';}
        if (period.indexOf('a') != -1) {
          //am... so make sure hours < 11 (11 == 12 PM in setHours)
          if (hour > 11) {
            hour = hour - 12;
          }
        }
        else {
          //pm
          if (hour <= 11) {
            hour = hour + 12;
          }
        }
        console.log("Hour should be "+hour+" as period == "+period)
        return hour;
      }
      function getInputSecond(time) {
        timeArray = time.split(':');
        if (timeArray.length < 3) {return 0;}
        return timeArray[2];
      }
      function defaultTime(oldDate) {
        oldDate = typeof(oldDate) != 'undefined' ? oldDate : new Date();
        oldDate.setHours(options.hours);
        oldDate.setMinutes(options.minutes);
        oldDate.setSeconds(options.seconds);
        oldDate.setMilliseconds(options.milliseconds);
        return oldDate;
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
          //Year is either two or four chars...
          var year = date.split('/').pop();
          if (year.length != 2 && year.length != 4) {return false;}
          
          var firstSlash = (date.charAt(1) == '/' || date.charAt(2) == '/');
          var secondSlash = (date.charAt(3) == '/' || date.charAt(4) == '/' || date.charAt(5) == '/');
          return (firstSlash && secondSlash);
        }
      }
      function isPeriod(period) {
        var retval = false;
        switch(period) {
          case "a": case "am":
            retval = true;
            break;
          case "p": case "pm":
            retval = true;
            break;
        }
        return retval;
      }
      function isTime(time) {
        //TIME = [H, H:MM, HH:MM]
        if (time == undefined) {return false;}
        timeArray = time.split(':');
        for (var i=0; i<timeArray.length; i++){
          if (isNaN(parseInt(timeArray[i]))) {return false;}
        }
        console.log("Time length: "+time.length+" TimeComp length: "+timeArray.length);
        if (time.length <= 2 && timeArray.length == 1) {
          console.log("you sent a single hour");
          return true;
        }
        if (timeArray.length == 2) {
          console.log("You sent time in H:M format");
          return true;
        }
        if (timeArray.length == 3) {
          console.log("You sent time in H:M:S format");
          return true;
        }
        return false;
      }
      function dayOfTheWeek(dotw) {
        switch(dotw.toLowerCase()) {
          case "sun": case "sunday":
            var day = 0;
            break;
          case "mon": case "monday":
            var day = 1;
            break;
          case "tue": case "tues": case "tuesday":
            var day = 2;
            break;
          case "wed": case "wednesday":
            var day = 3;
            break;
          case "thur": case "thurs": case "thursday":
            var day = 4;
            break;
          case "fri": case "friday":
            var day = 5;
            break;
          case "sat": case "saturday":
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