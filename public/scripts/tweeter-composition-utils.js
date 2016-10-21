//=============UTILS FOR COMPOSITION==========//
let newtweetForm = $('.counter').closest('form');

//clears the composition text field
function clearField() {
  newtweetForm.children('textarea').val("");
  newtweetForm.children('.counter').text(0);
  checkTweetCounter(newtweetForm.children('textarea'));
}
//checks tweet counter, if it is negative it sets the color of the tweet counter to red
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
//encodes the form data to remove  cross server scripting
function encodeText(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
//validates the new tweet form text area,
//if there are 0  or more then 140 characters respectively,
//the .warning div element is modified to display the appropriate paragraph element for
//either false validation
function validateText(str) {
  str = str.trim();
    if(str.length === 0) {
      $(".warning > #zerochars").css("display", "block");
      return false;
    } else if(str.length > 140) {
      $(".warning > #maxchars").css("display", "block");
      return false;
    } else {
        return true;
    }
}
//if form data is invalid (see above) upon submission, this function will be called
//instead of the ajax post request
//the warning displays for 1.5 seconds
function displayWarning() {
  $(".warning").css("display", "block");
  setTimeout(function() {
    $(".warning").css("display", "none");
    $(".warning > #maxchars").css("display", "none");
    $(".warning > #zerochars").css("display", "none");
  }, 2000);

}

