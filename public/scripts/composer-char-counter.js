$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let counter = 140 - $(this).val().length; 
    const charCount = $(this).closest('form').find('#counter').text(counter); 
    if (counter < 0) {
      charCount.css('color', 'red')
    } else {
      charCount.css('color', 'white')
    }
  })
}); 

