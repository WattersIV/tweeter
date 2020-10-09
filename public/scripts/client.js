//Takes in tweet data and formats it in html
  function createTweetElement (tweet) {    
  const tweetCreation = tweet.created_at 
  let output = ''  
  output += '<article>'
  output += '<header>'
  output += '<div>'
  output += `<img src="${tweet.user.avatars}" style="width: 2em; height: 2em;">`
  output += `<p> ${tweet.user.name} </p>` 
  output += '</div>'
  output += `<p class="username"> ${tweet.user.handle} </p>` 
  output += '</header>' 
  output += `<p> ${escape(tweet.content.text)} </p>` 
  output += '<footer>' 
  output += `<p class="time"> ${time(tweetCreation)} </p>` 
  output += '<div class="interact">'
  output += '<i class="fas fa-flag"></i>'
  output += '<i class="fas fa-retweet"></i>'
  output += '<i class="fas fa-heart"></i>'
  output += '</div> </footer> <div> </div> </article>'  
  return output;
} 

//creates safe tweet body
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Takes in formatted html text and renders it on the page
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet)
    $(`.tweets`).append($tweet) 
  } 
} 
 
let errorMsg = false

//processes the post req for tweet then starts get process to post it
$(document).ready(() => {  
  loadTweets() //When doc loaded calls renderTweets 
  $('form').on('submit', event => { 
    event.preventDefault() 
    if (errorMsg === true) {
      slideUp()
    } 
    const postData = $('#tweet-text').val()
    if (isValidTweet(postData) === true) {  
      $.ajax({
        type: 'POST', 
        url: '/tweets', 
        data: $('#tweet-text').serialize() 
      }).then(() => {
        loadTweets()
        $('form').trigger('reset') 
        $('#counter').text(140)}) 
      } else if (isValidTweet(postData) === false) {
        errorMsg = true
        $('form').slideDown(() => {
          sendAlert('Your tweet is empty')
        })
      } else {
        $('form').slideDown(()=> {
          errorMsg = true 
          sendAlert('Your tweet is too long')
      })
    }
  }) 
}) 

//Slides up err msg
const slideUp = function () {
  $('.error').slideUp(() => {  
    //do nothing
  })
}

//Posts error message and keeps it there until told otherwise
const sendAlert = function (errorType) {
  $('.error').text(errorType)             
  $('.error').slideDown(() => {
    //do nothing
  })
}

//get route for new tweet
const loadTweets = () => {
  $.ajax({
    type: 'GET', 
    url: '/tweets', 
    dataType: 'JSON'
  }).then(function (data) {
    $(`.tweets`).html('')
    const newToOld = data.reverse() 
    renderTweets(newToOld)
  })
} 

//Valid-True Too long-False Too Short-String 
const isValidTweet = (tweet) => {
  if (tweet.length >= 1 && tweet.length <= 140) {
    return true;
  } else if (tweet.length > 140) {
    return 'too long'
  } else {
    return false;
  }
} 

//Scroll to top on click
$(document).ready(() => { 
  $('#toTop').on('click', () => { 
    document.documentElement.scrollTop = 0
  })
})  

// Formats the ms into the appropriate metric
const time = created => {
  const timePassed = Date.now() - created;
  if (timePassed < 1000) {
    return "Just now";
  } else if (timePassed < 60000) {
    return Math.floor(timePassed / 1000) + " second(s)";
  } else if (timePassed < 360000) {
    return Math.floor(timePassed / 60000) + " minute(s)";
  } else if (timePassed < 86400000) {
    return Math.floor(timePassed / 360000) + " hour(s)";
  } else if (timePassed < 31536000000) {
    return Math.floor(timePassed / 86400000) + " day(s)";
  } else {
    return Math.floor(timePassed / 31536000000) + " year(s)";
  }
};