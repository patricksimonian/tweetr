/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {



  //composition field
  var newtweetForm = $('.counter').closest('form');

  //toggle tweet field
  $('#nav-bar').children('p').on("click", function() {
    newtweetForm.closest('section').toggle();

   });
 //need to redirect to composer form after
  //update tweet char count
  newtweetForm.children('textarea').keyup(function(event) { checkTweetCounter(this); });

  //clear tweet message field

  newtweetForm.children('.clear').on("click", function() {
    newtweetForm.children('textarea').val("");
    newtweetForm.children('.counter').text(0);
    checkTweetCounter(newtweetForm.children('textarea'));
  });
  renderTweet(data);



});

//reset text box

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]

function createTweetElement(userObj) {
  var $tweet = $('<section></section>').addClass('tweet');
  var timeElapsed = Math.floor((Date.now() - userObj.created_at)/8.64e+7) //milliseconds in a day;
  $tweet.append('<header>');
  $tweet.append(`<article>${userObj.content.text}</article>`);
  $tweet.append('<footer>');
  $tweet.children('header').append(`<img src=${userObj.user.avatars.small}>`);
  $tweet.children('header').append(`<h2>${userObj.user.name}</h2>`);
  $tweet.children('header').append(`<span>${userObj.user.handle}</span>`);
  $tweet.children('header').children('span').addClass("handler");
  $tweet.children('footer').append(`<span>${timeElapsed} days ago</span>`);

  return $tweet;
}

function  renderTweet(tweets) {
//will porbably duplicate results . need to find a way of validating
//appends so they dont repeat if that  user/timestamp is already there
  tweets.forEach(function(obj) {
    var $tweet = createTweetElement(obj);
    $('.tweets-container').append($tweet);
  });

}