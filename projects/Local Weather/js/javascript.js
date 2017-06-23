$(document).ready(function() {

  /* Get the location using the web browser plugin

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
*/
  $.ajax({
    url:'http://ipinfo.io/json',
    success: function(ex) {
      var city = ex.city;
      console.log(city);

      // Calling the openweathermap API because it is free and can help me fix the problem where the city isn't recognised in most of the weather APP because I live in China

      $.ajax({
        url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=8f5646040d13e59ad84bf826809b0216&units=metric',
        datatype: 'jsonp',
        jsonp : "callback",
        success: function(data) {
          var weather = data.weather[0].main;
          var temperature = data.main.temp;
          var description = data.weather[0].description;
          $('#city').html(city);
          $('#Weather').html(weather);
          $('#temperature').html(temperature + ' °C');
          $('#description').html(description);

          //changing the background-color according to the temperature

          if (temperature >= 20) {
            var background = $('#fullDiv').css('background-color','#ffcb00');
            var newBackground = $('#fullDiv').css('background-color','red');
            background.hide(0);
            background.show(1500);
            background.queue(function(){
              newBackground.show(1500);
            });
          }

          else if (temperature < 20 && temperature >= 10) {
            var background = $('#fullDiv').css('background-color','#ffcb00');
            var newBackground = $('#fullDiv').css('background-color','#b2dfdb');
            background.hide(0);
            background.show(1500);
            background.queue(function(){
              newBackground.show(1500);
            });
          }
          else {
            var background = $('#fullDiv').css('background-color','#ffcb00');
            var newBackground = $('#fullDiv').css('background-color','#e1f5fe');
            background.hide(0);
            background.show(1500);
            background.queue(function(){
              newBackground.show(1500);
            });
          }

          // converting celsius to fahrenheit and vice-versa

          function convertToF(temperature) {
            var fahrenheit;

            fahrenheit = temperature * (9/5) + 32;
            return fahrenheit;
          }


          $('#convert').click(function() {
            $('#convert').toggleClass('celcius');
            $('#convert').toggleClass('fahrenheit');
            if ($(this).hasClass('celcius')) {
              $('#temperature').html(convertToF(temperature) + ' °F');
              $('#convert').html('Convert to °F');
              return;
            }

              $('#temperature').html(temperature + ' °C');
              $('#convert').html('Convert to °C')
          });

        }
      })
    }
  });
})
