$(document).ready(function() {
  var x = document.getElementById("demo");
  var long;
  var lat;

  function geolocationSuccess(position) {
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/weather',
        data: {
          'lat': position.coords.latitude,
          'long': position.coords.longitude
        },
        jsonp: "jsonp",
        dataType: 'json'
      })
      .done(function(response) {
        $('#response').text('sucess');
        $('#city').text(response.name)
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