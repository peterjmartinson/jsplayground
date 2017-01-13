
var webservice = new ExternalHTML();

webservice.theHTML = 
"<h1>Mighty Gumball Sales</h1>" +
"<div id=\"sales\">" +
"</div>";

var DOMElement = document.getElementById("cowport");
DOMElement.innerHTML = webservice.toHTML(); 


window.onload = function() {
  var url = "http://intense-bayou-74317.herokuapp.com/sales.json";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = function() {
    if (request.status == 200) {
      updateSales(request.responseText);
    }
  };
  request.send(null);
}

function updateSales(responseText) {
  var salesDiv = document.getElementById("sales");
  salesDiv.innerHTML = responseText;
}












