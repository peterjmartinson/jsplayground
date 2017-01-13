// Get local lat/long
// Display temperature and graphical conditions
// Allow user to change F <=> C
// -- Allow user to input a different location?

// NWS API:
// http://forecast.weather.gov/MapClick.php?lat=38.4247341&lon=-86.9624086&FcstType=json
// note, there are links to the correct weather icons in the JSON file!  lots of goodies there.
//
// Also note: Couldn't get geolocation from work, so the lat/long are hardcoded.  Dynamic stuff is commented out.
$(document).ready(function() {
  console.log("=========  BEGIN  ============");
  var units = 'F';

  var getWeather = function() {
    var url = "http://forecast.weather.gov/MapClick.php";
    
    if (navigator.geolocation) {
      var name, date, temp, weather;

      navigator.geolocation.getCurrentPosition(function(position) {
      
        $.getJSON( url + "?lat=" + position.coords.latitude 
                       + "&lon=" + position.coords.longitude
                       + "&FcstType=json", function ( response ) {
          name    = response.currentobservation.name;
          date    = response.currentobservation.Date;
          temp    = response.currentobservation.Temp;
          weather = response.currentobservation.Weather;
          if ( units == 'C' ) {
            temp = temp * 5 / 9 + 32;
          }
          $("#location")   .html( name );
          $("#date")       .html( date );
          $("#temperature").html( temp + "&deg; " + units);
        }); // $.getJSON
      }); // navigator.geolocation.getCurrentPosition()
    }; // if (navigator.geolocation)
  }; // var getWeather()

  var changeUnits = function () {
     if ( units == 'F' ) {
       units = 'C';
     }
     else {
       units = 'F';
     }
    getWeather();
  }
  
  getWeather();
  
//$("#changeUnits").on("click", console.log("clicked!"));
  $("#changeUnits").on("click", changeUnits());
//  console.log("hello" + getWeather());
  
});


