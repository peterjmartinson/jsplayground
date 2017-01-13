/* BEGIN useful functions  */
/* Author: Peter Martinson */

/*
 * ExternalHTML
 * Creates HTML based on whatever's in 
 * the this.theHTML property
*/
function ExternalHTML() {
  var theHTML;
  theHTML = '<h1>placeholder</h1>';
  this.theHTML = theHTML;
}
ExternalHTML.prototype.toHTML = function() {
  var characters = [];
  var endOfLine = this.theHTML.length - 1;
  characters.push("<pre>");
  characters.push(this.theHTML);
  characters.push("</pre>");
  return characters.join("");
};
/* END useful functions */

