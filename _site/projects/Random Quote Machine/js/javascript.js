$(document).ready(function(){

  /* BEGINNING OF TWEET ARRAY

  function twitterSplit(quote,author) {
    quote = quote.split("");
    var finalTweet = [];
    var correctQuote = [];
    var marks = "\""
    var marksEnding = "\", "

    for (var i = 3; i < quote.length - 6; i++) {
      correctQuote.push(quote[i]);
    };

    if (correctQuote.length + author.length <= 136) {
      correctQuote = correctQuote.join("");
      finalTweet.push(marks);
      finalTweet.push(correctQuote);
      finalTweet.push(marksEnding);
      finalTweet.push(author);
      finalTweet = finalTweet.join("");
    }
    else {
      var threeDots = "...";
      var splicedQuote = correctQuote.splice(0, 140 - author.length - 8);

      splicedQuote = splicedQuote.join("");
      finalTweet.push(marks);
      finalTweet.push(splicedQuote);
      finalTweet.push(threeDots);
      finalTweet.push(marksEnding);
      finalTweet.push(author);
      finalTweet = finalTweet.join("");
    }
    finalTweet = finalTweet.replace(/ /g,"%20");
    return finalTweet;
  };
   END OF TWEET ARRAY */

  //START OF API CALL


  $('#getQuote').on('click', function(e) {
      e.preventDefault();
      $.ajax( {
        url: 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        success: function(data) {
          var post = data.shift();
          var tweeterMessage = post.content;
          var tweeterAuthor = post.title;

          function twitterSplit(tweeterMessage, tweeterAuthor) {
            tweeterMessage = tweeterMessage.split("");
            var finalTweet = [];
            var correctQuote = [];
            var marks = "\""
            var marksEnding = "\", "

            for (var i = 3; i < tweeterMessage.length - 6; i++) {
              correctQuote.push(tweeterMessage[i]);
            };

            if (correctQuote.length + tweeterAuthor.length <= 136) {
              correctQuote = correctQuote.join("");
              finalTweet.push(marks);
              finalTweet.push(correctQuote);
              finalTweet.push(marksEnding);
              finalTweet.push(tweeterAuthor);
              finalTweet = finalTweet.join("");
            }
            else {
              var threeDots = "...";
              var splicedQuote = correctQuote.splice(0, 140 - tweeterAuthor.length - 8);

              splicedQuote = splicedQuote.join("");
              finalTweet.push(marks);
              finalTweet.push(splicedQuote);
              finalTweet.push(threeDots);
              finalTweet.push(marksEnding);
              finalTweet.push(tweeterAuthor);
              finalTweet = finalTweet.join("");
            }
            finalTweet = finalTweet.replace(/ /g,"%20");
            return finalTweet;
          };
          $('.quoter').html("<p><strong>" + post.title + "</strong></p>");
          $('.quote').html('<p><em> ' + post.content + '<em></p>');
          $('#tweet').attr("href", 'https://twitter.com/intent/tweet?text='+twitterSplit(post.content, post.title));
        },
        cache: false
      });
    });

// END OF API CALL

  });
