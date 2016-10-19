/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  //initial load of tweets in database
  (function loadPage() {
    loadTweets(true);
  })();

  function encodeText(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

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
  function displayWarning() {
    $(".warning").css("display", "block");
    setTimeout(function() {
      $(".warning").css("display", "none");
      $(".warning > #maxchars").css("display", "none");
      $(".warning > #zerochars").css("display", "none");
    }, 1500);

  }
  function createTweetElement(userObj) {
    var $tweet = $('<section></section>').addClass('tweet');
    var timeElapsed = Math.floor((Date.now() - userObj.created_at)/8.64e+7) //milliseconds in a day;
    $tweet.append('<header>');
    $tweet.append(`<article><p>${userObj.content.text}</p></article>`);
    $tweet.append('<footer>');
    $tweet.children('header').append(`<img src=${userObj.user.avatars.small}>`);
    $tweet.children('header').append(`<h2>${userObj.user.name}</h2>`);
    $tweet.children('header').append(`<span>${userObj.user.handle}</span>`);
    $tweet.children('header').children('span').addClass("handler");
    $tweet.children('footer').append(`<span>${timeElapsed} days ago</span>`);

    return $tweet;
  }

  function  renderTweet(tweets) {
    var $tweet = null;
  //will porbably duplicate results . need to find a way of validating
  //appends so they dont repeat if that  user/timestamp is already there
    if(Array.isArray(tweets)) {
      tweets.forEach(function(obj) {
        $tweet = createTweetElement(obj);
        $('.tweets-container').prepend($tweet);
      });
    } else {
      $tweet = createTweetElement(tweets);
      $('.tweets-container').prepend($tweet);
    }
  }
  //loadTweets takes a boolean as a paramater. if true, it will render the
  //tweets.json array, if false it will only render the last index of the tweets.json
  //array
  function loadTweets(onLoad) {
    var tweetData = $.ajax({
       method: "GET",
       url: "/tweets/",
       dataType: "json",
    });
    tweetData.done(function(tweetDataObj) {
      if(onLoad) {
        return renderTweet(tweetDataObj);
      }
      return renderTweet(tweetDataObj[tweetDataObj.length -1]);
    });
  }
  //clears the composition text field
  function clearField() {
    newtweetForm.children('textarea').val("");
    newtweetForm.children('.counter').text(0);
    checkTweetCounter(newtweetForm.children('textarea'));
  }
////////////////////////////////////////////////////////////////////////////////
  //need to make this modular.. ie pass in the ame string into a function that
  //changes css from a themes object for each name
  //themes dropdown menu
  $("#themes").on('mouseover', function() {
    $('.dropdown').children().slideDown("fast");
  });
  //themees dropdown destroy
  $(".dropdown").on('mouseleave', function() {
    $('.dropdown').children().slideUp("fast");
  });
  $("#strawberry").on('click', function() {
    $('body').css("background-color", "#ff3b51");
    $('#nav-bar').css("background-color", "#ffc083");
    $('#nav-bar').css("color", "black");
    $('.dropdown').children('li').css("background-color", "#ffc083");
    $('.dropdown').css("background-color", "#ffc083");
  });
  $("#classic").on('click', function() {
    $('body').css("background-color", "#eee");
    $('#nav-bar').css("background-color", "#009f86");
    $('#nav-bar').css("color", "#e8fdff");
    $('.dropdown').css("background-color", "#009f86");
    $('.dropdown').children('li').css("background-color", "#009f86");

  });
////////////////////////////////////////////////////////////////////////////
  //composition field
  var newtweetForm = $('.counter').closest('form');

  //toggle tweet field
  ($('#compose')).on("click", function() {
    checkTweetCounter(newtweetForm.children('textarea'));
    newtweetForm.closest('section').slideToggle("medium");
    newtweetForm.children('textarea').focus();
   });
 //need to redirect to composer form after
  //update tweet char count
  newtweetForm.children('textarea').keyup(function(event) { checkTweetCounter(this); });

  //clear tweet message field

  newtweetForm.children('.clear').on("click", function() {
    clearField()
  });
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
      clearField();
    } else {
      displayWarning();
    }
  });



});

//reset text box



/////////////////////////////
//themes
/*
body background: #eee

Head:

nav bar background: #009f86
color: #e8fdff







*/