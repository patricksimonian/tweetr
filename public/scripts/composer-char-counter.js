function checkTweetCounter(textarea) {
  var ta = $(textarea);
  var counter =  ta.closest('form').children('.counter');
  if (ta.val().length > 140) {
    if(counter.css("color") !== "red") {
      counter.css("color", "red");
    }
  } else if (ta.val().length <= 140) {
      if(counter.css("color") !== "black") {
        counter.css("color", "black");
      }
  }
  counter.text((140 - ta.val().length));
}

