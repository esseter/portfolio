$(document).ready(function() {

  $('#inputBar').focus();


  // Using XMLHttpRequest
  $('#searchBar').keydown(function(event) {
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      var keyword = document.getElementById('inputBar').value;
      $.ajax({
        url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword +"&srlimit=8&prop=info&inprop=url&utf8=&format=json",

        dataType: "jsonp",
        success: function(response) {

          console.log(response.query.search);
          if (response.query.searchinfo.totalhits === 0) {
            $('#results').empty();
            $('#searchBar').html('<input type="text" class="form-control" placeholder="I cannot find anything..." id="inputBar"><span class="form-control-feedback" id="searchIcon"><i class="fa fa-search" aria-hidden="true"></i></span>');
            $('#inputBar').css('border-color', 'red');
            $('#searchIcon').css('color', 'red');
            $('#inputBar').focus();
          }
          else {
            var objectOne = response[0];
            $('#inputBar').empty();
            $('#results').empty();
            for (var i = 0; i < 8; i++) {
              var title = response.query.search[i].title;
              var description = response.query.search[i].snippet;
              var html = '<div class="col-md-3">  <div class="article">  <div class="well" id="box"><a href="https://en.wikipedia.org/wiki/' + title + '" target="_blanck"><h3 class="title">'+ title + '</h3><p class="description">'+ description +'...</p></a></div></div></div>';
              $('#results').append(html);
              $('#searchBar').html('<input type="text" class="form-control" placeholder="Results for '+ keyword + '..." id="inputBar"><span class="form-control-feedback" id="searchIcon"><i class="fa fa-search" aria-hidden="true"></i></span>');
              $('#inputBar').focus();
            };
            console.log(response);
          }
        },
       error: function () {
        alert("Error retrieving search results, please refresh the page");
       }
      });
    }
  });
});
