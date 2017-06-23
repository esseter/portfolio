$(document).ready(function() {

  var users = ['summit1g','TimTheTatman','TSM_Dyrus','PlayHearthstone','FreeCodeCamp','GeekandSundry','RPGLimitBreak', 'comster404']

  for (var i = 0; i < users.length; i++) {
    var urlStream = 'https://wind-bow.glitch.me/twitch-api/streams/' + users[i];
    var urlChannel = 'https://wind-bow.glitch.me/twitch-api/channels/' + users[i];
    var urlBio = 'https://wind-bow.glitch.me/twitch-api/users/' + users[i];



    $.getJSON(urlStream, function(data){
      if (data.stream === null) {

        var links = data._links.channel;
        function makeLinksGreatAgain(links) {
          links = links.split("/");
          var lastSpots = links[links.length - 1];
          var realLinks = 'https://wind-bow.glitch.me/twitch-api/channels/' + lastSpots;
          return realLinks;
        };



        $.getJSON(makeLinksGreatAgain(data._links.channel), function(dataBis) {
          console.log(dataBis);
          if (dataBis.status === 422) {
            var htmlDead = '<div class="streamer"><div class="row"><div class="col-xs-3"><img src="https://d30y9cdsu7xlg0.cloudfront.net/png/116547-200.png" alt="'+ users[i] + '" class="logo"></div><div class="stream"><div class="col-xs-6"><p class="activityDead">'+ dataBis.message +'</p></div></div><div class="streamStatus"><div class="col-xs-3"><i class="icon-ban-circle"></i></div></div></div></div>';
            $('#all').append(htmlDead);
          }

          else {
            var gameOff = dataBis.game;
            var nameOff = dataBis.display_name;
            var logoOff = dataBis.logo;
            var urlOff = dataBis.url;
            var htmlOff = '<div class="streamer"><a id="links" href="' + urlOff +'" target="_blanck"><div class="row"><div class="col-xs-3"><img src="'+ logoOff +'" alt="'+ nameOff + '" class="logo"></div><div class="stream"><div class="col-xs-6"><h4 class="streamerName">' + nameOff + '</h4><p class="activity">Usually playing: '+ gameOff +'</p></div></div><div class="streamStatus"><div class="col-xs-3"><i class="fa fa-toggle-off" aria-hidden="true"></i></div></div></div></a></div>';
            $ ('#all').append(htmlOff);
            $('#offline').append(htmlOff);
          }
        });
      }

      else {
        var game = data.stream.game;
        var name = data.stream.channel.display_name;
        var logo = data.stream.channel.logo;
        var url = data.stream.channel.url;

        var html = '<div class="streamer"><a id="links" href="' + url +'" target="_blanck"><div class="row"><div class="col-xs-3"><img src="'+ logo +'" alt="'+ name + '" class="logo"></div><div class="stream"><div class="col-xs-6"><h4 class="streamerName">' + name + '</h4><p class="activity">Currently playing: '+ game +'</p></div></div><div class="streamStatus"><div class="col-xs-3"><i class="fa fa-toggle-on" aria-hidden="true"></i></div></div></div></a></div>';
        $('#all').append(html);
        $('#online').append(html);

        };
    });
  };
});
