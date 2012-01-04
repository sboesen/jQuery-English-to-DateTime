console.log("In test.js");

$(document).ready(function() {
  $('input').keyup(function(){
    console.log("keyup");
    if ($(this).text() == ''){
      console.log('msg blank');
      $(this).text('Type something above!'); 
    }
    else {
      console.log('lol');
      $('.changeme').text('');
      var parsedDate = $(this).datetimeparse();
      $('.changeme').text(parsedDate.toString());
    }
  });
});
