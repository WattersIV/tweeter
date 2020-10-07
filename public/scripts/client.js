const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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


$(document).ready(() => {
  $('form').on('submit', event => { 
    event.preventDefault()
    console.log('Ajax call starting')  
    $.ajax({
      type: 'POST', 
      url: '/tweets', 
      data: $('#tweet-text').serialize() 
    }).then (() => {console.log('DONE')}) 
  }) 
})