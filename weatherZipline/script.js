$(document).ready(function() {
  var x = document.getElementById("demo");
  var long;
  var lat;

  function geolocationSuccess(position) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
          'lat': position.coords.latitude,
          'lon': position.coords.longitude,
          'units': 'metric'
        },
        jsonp: "jsonp",
        dataType: 'json'

      })
      .done(function(response) {
        $('#response').text('sucess');
        $('#city').text(response.name);
        $('#temperature').text(response.main.temp + 'ºC');
        $('#description').text(response.weather[0].description);
        $('#temperature').prepend('<img src=http://openweathermap.org/img/w/' + response.weather[0].icon + '.png>')
        $('#wind-info').text(degToCompass(response.wind.deg) + ' ' + response.wind.speed + ' m/s')
      })
      .fail(function() {
        //alert("error");
        $('#response').text('error');
      })
      .complete(function() {
        $('#latitude').text(position.coords.latitude);
        $('#longitude').text(position.coords.longitude);

      });
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geolocationSuccess);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
});

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}