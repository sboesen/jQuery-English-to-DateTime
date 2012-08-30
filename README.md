#UPDATE:
This was mainly a side project for me that spawned out of a need for the basic english -> date functionality. Some people have been working on a very similar library, and it seems to have just gotten popular. Please use it instead! It seems ot have many more features, as well: http://momentjs.com/

English To DateTime is a plugin that takes (from an input field) both relative dates or dates formatted like M/D/Y and returns a JS Date object corresponding to that date.
###Note:
This plugin will only work on future dates. This is fine for my purposes, but for yours it may not be. I may update it to be more flexible later but do not have plans to do so yet. Feel free to fork and submit a pull request!

#Usage
Look at test.html and test.js for basic usage with a keyup hook. Basically, do this:

```javascript
var date = $('input').datetimeparse();
console.log(date.toString());
```

#Basic Examples:
- Monday + 1 week -> Mon Jan 16 2012 00:00:00 GMT-0800 (PST)
- Monday + 1 day -> Tue Jan 10 2012 00:00:00 GMT-0800 (PST)
- Friday at 1 PM -> Fri Jan 06 2012 13:00:00 GMT-0800 (PST)
- 1 PM -> Wed Jan 04 2012 13:00:00 GMT-0800 (PST)

#It can take things in the following formats:

##Dates
- M/D
- MM/D
- M/DD
- MM/DD

- M/D/YY
- MM/D/YY
- M/DD/YY
- MM/DD/YY

- M/D/YYYY
- MM/D/YYYY
- M/DD/YYYY
- MM/DD/YYYY

##Times
- H
- H:MM
- HH:MM
- H PM
- H:MM PM
- HH:MM PM

##Addition/Subtraction
You can also append "+ NUMBER UNIT" to anything above (or nothing at all, in which case it defaults to today at midnight (0:00:00)) and it will add that number of units (where unit is second(s), minute(s), hour(s), day(s), week(s), month(s), year(s)) to that date.

##Keywords
- tomorrow
- today

TODO:
Wording in README
