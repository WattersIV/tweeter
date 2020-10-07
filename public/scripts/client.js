//Takes in tweet data and formats it in html
  function createTweetElement (tweet) {   
  let output = ''  
  console.log(tweet)
  output += '<article>'
  output += '<header>'
  output += '<div>'
  output += `<img src="${tweet.user.avatars}" style="width: 2em; height: 2em;">`
  output += `<p> ${tweet.user.name} </p>` 
  output += '</div>'
  output += `<p class ="username"> ${tweet.user.handle}` 
  output += '</header>' 
  output += `<p> ${tweet.content.text} </p>` 
  output += '<footer>' 
  output += `<p> ${tweet.created_at} </p>` 
  output += '<div>'
  output += '<p> img 1 </p>'
  output += '<p> img 2 </p>'
  output += '<p> img 3 </p>'
  output += '</div> </footer> <div> </div> </article>'  
  return output;
} 

//Takes in formatted html text and renders it on the page
const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    let $tweet = createTweetElement(tweet)
    $(`.tweets`).append($tweet) 
  } 
} 

//When doc loaded calls renderTweets 
$(document).ready(() => { 
  renderTweets(tweetData)
})  

//processes the post req for tweet then starts get process to post it
$(document).ready(() => {
  $('form').on('submit', event => { 
    event.preventDefault()
    const postData = $('#tweet-text').val()
    if (isValidTweet(postData) === true) {  
      $.ajax({
        type: 'POST', 
        url: '/tweets', 
        data: $('#tweet-text').serialize() 
      }).then(() => {
        loadTweets(); 
        $('form').trigger('reset')
        $('#counter').text(140)}) 
    } else if (isValidTweet(postData) === false) {
      alert('Tweet is empty')
    } else {
      alert('Tweet is too long')
    }
  }) 
}) 

//get route for new tweet
const loadTweets = () => {
  $.ajax({
    type: 'GET', 
    url: '/tweets', 
    dataType: 'JSON'
  }).then(function (data) {
    const newToOld = data.reverse() 
    renderTweets(newToOld)
  })
} 

const isValidTweet = (tweet) => {
  if (tweet.length >= 1 && tweet.length <= 140) {
    return true;
  } else if (tweet.length > 140) {
    return 'too long'
  } else {
    return false;
  }
}