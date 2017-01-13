

window.onload = getMyLocation();

function getMyLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
    alert("Oops, no geolocation support");
  }
}

function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log("latitude: " + latitude);
  console.log("longitude: " + longitude);

  var div = document.getElementById("cowport");
  div.innerHTML = "You are at Latitude: " + latitude + 
              "<br>      and Longitude: " + longitude;
}


