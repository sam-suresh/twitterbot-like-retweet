let Twitter = require('twitter');
let config = require('./config.js');
let T = new Twitter(config);

// search term / hash tag to monitor
let params = {
  q: '#mudotmy', // hashtag
  count: 10, // number of results
  result_type: 'recent', // type of results - see twitter docs
  lang: 'en' // 
}

T.get('search/tweets', params, function(err, data, response) {
  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
      let id = { id: data.statuses[i].id_str }
      T.post('favorites/create', id, function(err, response){
        if(err){
          console.log(err[0].message);
        }
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Hell yeah! I love: ', `https://www.twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
});

function retweetmu(){
T.get('search/tweets', params, function(err, data, response){
  if(!err){
    for(let i = 0; i < data.statuses.length; i++){
      let id = { id: data.statuses[i].id_str }
      T.post('statuses/retweet/', id, function(err, response){
        if(err){
          console.log(err[0].message);
        }
        else{
          let username = response.user.screen_name;
          let tweetId = response.id_str;
          console.log('Hell yeah! I retweeted: ', `https://www.twitter.com/${username}/status/${tweetId}`)
        }
      });
    }
  } else {
    console.log(err);
  }
})
}


retweetmu();
setInterval(retweetmu, 1000 * 30 * 30);
