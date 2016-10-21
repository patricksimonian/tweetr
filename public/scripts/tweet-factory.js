
//=====================TWEET FACTORY==================//
//creates a nested tweet element with the structure of:
function createTweetElement(userObj) {
  var timeElapsed = Math.floor((Date.now() - userObj.created_at)/8.64e+7); //milliseconds in a day;
  var $tweet = $('<section></section>').addClass('tweet');
        //<section>
  $tweet.append(`<header>
                  <img src=${userObj.user.avatars.small}>
                  <h2>${userObj.user.name}</h2>
                  <span>${userObj.user.handle}</span>
                </header>
                <article><p>${userObj.content.text}</p></article>
                <footer>
                  <span>${timeElapsed} days ago</span>
                  <span class="icon">
                    <i class="fa fa-flag" aria-hidden="true"></i>
                    <i class="fa fa-heart" aria-hidden="true"></i>
                    <i class="fa fa-retweet" aria-hidden="true"></i>
                  </span>
                </footer>
  `);  //</section>
  return $tweet;
}
//renders a new tweet by passing in the appropriate data into the createTweetElement function
//and appended to the tweets container
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