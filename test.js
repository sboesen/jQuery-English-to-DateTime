$(document).ready(function() {
  $('input').keyup(function(){
    var inputText = $(this).val();
    if (inputText == ''){
      $('.changeme').text('Type something above!'); 
    }
    else {
      $('.changeme').text('');
      var parsedDate = $(this).datetimeparse();
      $('.changeme').text(parsedDate);
    }
  });
});
