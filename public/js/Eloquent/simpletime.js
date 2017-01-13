
var time = new Date();

var outputTime = new ExternalHTML();

outputTime.theHTML = 
  "<h1>The time</h1>" +
  "<p>The time is " +
  time.getHours() + ":" + time.getMinutes() +
  "</p>" +
  "<p>And, you are at " +
  document.location.href +
  ".</p>";

var DOMElement = document.getElementById("cowport");
DOMElement.innerHTML = outputTime.toHTML();
