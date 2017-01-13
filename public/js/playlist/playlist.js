// first, the markup
var newpage = new ExternalHTML();

newpage.theHTML = 
'<form>' +
'  <input type="text" id="songTextInput" size="40" placeholder="Song name"><br>' +
'  <input type="button" id="addButton" value="Add Song">' +
'</form>' +
'<ul id="playlist">' +
'' +
'</ul>';

var DOMElement = document.getElementById("cowport");
DOMElement.innerHTML = newpage.toHTML();

// second, the event handler
window.onload = init;

function init() {
  var button = document.getElementById("addButton");
  button.onclick = handleButtonClick;
  loadPlaylist();
}

function handleButtonClick() {
  var textInput = document.getElementById("songTextInput"),
      songName = textInput.value,
      li = document.createElement("li"),
      ul = document.getElementById("playlist");

  li.innerHTML = songName;
  ul.appendChild(li);
  save(songName);
}

