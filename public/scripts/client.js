function createTweetElement (tweet) {   
  let output = ''  
  console.log(tweet)
  output += '<article>'
  output += '<header>'
  output += '<div>'
  output += `<img src="${tweet.user.avatars}" style="width: 2em; height: 2em;">` 
  output += `<p> ${tweet.user.name} </p>` 
  output += '</div>'
  output += `<p class = "username"> ${tweet.user.handle}` 
  output += '</header>' 
  output += `<p> ${tweet.content.text} </p>` 
  output += '<footer>' 
  output += `<p> ${tweet.created_at} </p>` 
  output += '<p> img 1 </p>'
  output += '<p> img 2 </p>'
  output += '<p> img 3 </p>'
  output += '</div> </footer> </article>' 
  return output;
} 


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
$(document).ready(() => { 
  const $tweet = createTweetElement(tweetData[0]) 
  console.log($tweet)
  $(`#tweets-container`).append($tweet) 
})
