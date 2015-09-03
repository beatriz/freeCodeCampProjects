$(document).ready(function() {
  var x = document.getElementById("demo");
  var long;
  var lat;
  var unitsBool = false;
  var unitsDescArray = ['metric', 'imperial'];
  var tempUnitsArray = [' ºC', ' ºF'];
  var speedUnitsArray = [' m/s', ' mi/h'];
  var backgroundImgLinks = {
    thunderstorm: 'http://i.imwx.com/holidays/july4/thunderstorm-ga.jpg',
    drizzle: 'http://i.dailymail.co.uk/i/pix/2010/12/29/article-1342455-0C99F143000005DC-191_634x423.jpg',
    rain: 'http://www.nationalweatherstation.com/wp-content/uploads/2014/08/rain.jpg',
    snow: 'http://i.telegraph.co.uk/multimedia/archive/01553/Snowy-canal_1553861c.jpg',
    fog: 'http://i.telegraph.co.uk/multimedia/archive/02061/leicester-park_2061557i.jpg',
    tornado: 'http://www.noaa.gov/features/03_protecting/images/tornado_vortex2.jpg',
    clearSky: 'http://www.gannett-cdn.com/-mm-/1f09360cfabb773cdf6fa082f2fafe397a2d03b1/c=28-0-479-338&r=x404&c=534x401/local/-/media/FortMyers/2014/12/08/B9315415807Z.1_20141208164230_000_GI99BRCAH.1-0.jpg',
    clouds: 'https://irenetravelogue.files.wordpress.com/2013/07/dscf21611.jpg',
    wind: 'http://www.weatherforkids.org/images/wind-tree.jpg',
    storm: 'http://cleversurvivalist.com/wp-content/uploads/2013/06/Super-Cell.jpg'

  }

  function geolocationSuccess(units) {
    return function callAPI(position) {
      $.ajax({
          url: 'http://api.openweathermap.org/data/2.5/weather',
          data: {
            'lat': position.coords.latitude,
            'lon': position.coords.longitude,
            'units': units
          },
          jsonp: "jsonp",
          dataType: 'json'
        })
        .done(processAPIResponse)
        .fail(function() {
          //alert("error");
          $('#response').text('error');
        })
        .complete(function() {
          $('#latitude').text(position.coords.latitude);
          $('#longitude').text(position.coords.longitude);
          $('#units-button').removeClass('disabled');
        });
    }
  }

  function processAPIResponse(response) {
    $('#response').text('sucess');
    $('body').css('background-image', 'url(' + getImageByCode(response.weather.id) + ')');
    $('#city').text(response.name);
    $('#temperature').text(response.main.temp + tempUnitsArray[unitsBool ? 1 : 0]);
    $('#description').text(response.weather[0].description);
    $('#temperature').prepend('<img src=http://openweathermap.org/img/w/' + response.weather[0].icon + '.png>')
    $('#wind-info').text(degToCompass(response.wind.deg) + ' ' + response.wind.speed + speedUnitsArray[unitsBool ? 1 : 0]);
    
  }

  function getImageByCode(code) {
    if (code == 960 || code == 961 || code == 771) {
      return backgroundImgLinks.storm;
    } else if (code >= 956 && code <= 959) {
      return backgroundImgLinks.wind;
    } else if (code == 800 || (code >= 951 && code <= 955)) {
      return backgroundImgLinks.clearSky;
    } else if (Math.floor(code / 100) == 8) {
      return backgroundImgLinks.clouds;
    } else if (Math.floor(code / 100) == 9) {
      return backgroundImgLinks.tornado;
    } else if (Math.floor(code / 100) == 7) {
      return backgroundImgLinks.fog;
    } else if (Math.floor(code / 100) == 6) {
      return backgroundImgLinks.snow;
    } else if (Math.floor(code / 100) == 5) {
      return backgroundImgLinks.rain;
    } else if (Math.floor(code / 100) == 3) {
      return backgroundImgLinks.drizzle;
    } else if (Math.floor(code / 100) == 2) {
      return backgroundImgLinks.thunderstorm;
    } else {
      return backgroundImgLinks.clouds;
    }
  }

  function getWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geolocationSuccess(unitsDescArray[unitsBool ? 1 : 0]));
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  $('#units-button').click(function() {
    $('#units-button').addClass('disabled');
    unitsBool = !unitsBool;
    getWeather();

    $('#units-button').text('Change to ' + unitsDescArray[unitsBool ? 0 : 1]);
    
  });
  getWeather();
  $('#units-button').text('Change to ' + unitsDescArray[unitsBool ? 0 : 1]);

});

function degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}