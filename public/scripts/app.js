/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //composition field
  var newtweetForm = $('.counter').closest('form');
  //initial load of tweets in database
  (function loadPage() {
    renderTheme("Classic");
    loadTweets(true);
  })();
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
    }, 1500);

  }
  //creates a nested tweet element with the structure of:
  // section[class=tweet]>(header>img+h2+span)+(article>p)+(footer>span)
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
    $tweet.children('footer').append(`<span class="icon"></span>`);
    $tweet.children('footer').children(".icon").append(`<i class="fa fa-flag" aria-hidden="true"></i>`);
    $tweet.children('footer').children(".icon").append(`<i class="fa fa-heart" aria-hidden="true"></i>`);
    $tweet.children('footer').children(".icon").append(`<i class="fa fa-retweet" aria-hidden="true"></i>`);


    return $tweet;
  }
  //renders a new tweet by passing in the appropriate data into the createTweetElement function
  //on page load this function accepts an Array of objects from tweets.json and is thereign itterated through
  //and appended to the tweets container, beyond page load only a single object from the last index of tweets.json
  //is rendered
  function  renderTweet(tweets) {
    var $tweet = null;
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
  //loadTweets takes a boolean as a paramater if true, it will render the
  //tweets.json array, if false it will only render the last index of the tweets.json
  //array
  function loadTweets(onLoad) {
    clearField();
    var tweetData = $.ajax({
       method: "GET",
       url: "/tweets/",
       dataType: "json",
    });
    tweetData.done(function(tweetDataObj) {
      if(onLoad) {
        return renderTweet(tweetDataObj);
      }
      console.log(tweetDataObj)
      return renderTweet(tweetDataObj[tweetDataObj.length -1]);
    });
  }
  //clears the composition text field
  function clearField() {
    newtweetForm.children('textarea').val("");
    newtweetForm.children('.counter').text(0);
    checkTweetCounter(newtweetForm.children('textarea'));
  }

  //toggle tweet field
  $('#compose').on("click", function() {
    checkTweetCounter(newtweetForm.children('textarea'));
    newtweetForm.closest('section').slideToggle("medium");
    newtweetForm.children('textarea').focus();
   });
 //need to redirect to composer form after

  //update tweet char count
  newtweetForm.children('textarea').keyup(function(event) {
    checkTweetCounter(this);
  });

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
    } else {
      displayWarning();
    }
  });

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
