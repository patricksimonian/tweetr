
$(document).ready(function () {
  //composition field
  let newtweetForm = $('.counter').closest('form');
  //initial load of tweets in database
  (function loadPage() {
    renderTheme("Classic");
    loadTweets(true);
  })();

//===========COMPOSITION FORM=======================//
 //post tweet field to server
  $(".new-tweet > form").on("submit", function(event) {
    var textarea = $(this).children("textarea");
    textarea.val(encodeText(textarea.val()));
    event.preventDefault();
    if(validateText(textarea.val())) {
      $.ajax({
        url: "/tweets/",
        method: "POST",
        data: $(this).serialize()
      }).done(loadTweets(false));
    } else {
      displayWarning();
    }
  });

  //update tweet char count
  newtweetForm.children('textarea').keyup(function(event) {
    checkTweetCounter(this);
  });

  //clear tweet message field
  newtweetForm.children('.clear').on("click", function() {
    clearField()
  });

  //toggle tweet field
  $('#compose').on("click", function() {
    checkTweetCounter(newtweetForm.children('textarea'));
    newtweetForm.closest('section').slideToggle("medium");
    newtweetForm.children('textarea').focus();
   });


//===============THEME DROP DOWN===============//
  //themes dropdown menu
  $("#themes").on('mouseover', function() {
    $('.dropdown').children().slideDown("fast");
  });
  //themees dropdown destroy
  $(".dropdown").on('mouseleave', function() {
    $('.dropdown').children().slideUp("fast");
  });
  //render theme
  $('.dropdown > li').on('click', function (event) {
    renderTheme(event.target.innerHTML);
    event.stopPropagation();
  });
});
