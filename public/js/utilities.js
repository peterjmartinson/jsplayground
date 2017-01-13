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

/* BEGIN Special Functions/Constructors by Haverbeke */
function ArrayToString(array) {
  var output = '';
  for (var i = 0; i < array.length; i++) 
    output += i + " " + array[i] + "<br>";
  return output;
}

function forEach(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}

function forEachIn(object, action) {
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property))
      action(property, object[property]);
  }
}

function sum(numbers) {
  var total = 0;
  forEach(numbers, function (number) {
    total += number;
  });
  return total;
}

function negate(func) {
  return function (x) {
    return !func(x);
  };
}

var isNotNaN = negate(isNaN);
function Dictionary(startValues) {
  this.values = startValues || {};
}
Dictionary.prototype.store = function(name, value) {
  this.values[name] = value;
};
Dictionary.prototype.lookup = function(name) {
  return this.values[name];
};
Dictionary.prototype.contains = function(name) {
  return Object.prototype.propertyIsEnumerable.call(this.values, name);
};
Dictionary.prototype.each = function(action) {
  forEachIn(this.values, action);
};
Dictionary.prototype.names = function() {
  var names = [];
  this.each(function(name, value) {names.push(name);});
  return names;
};

function randomInteger(below) {
  return Math.floor(Math.random() * below);
}

function randomElement(array) {
  if (array.length == 0)
    throw new Error("The array is empty.");
  return array[Math.floor(Math.random() * array.length)];
}

// Prototypal Inheritance utilities
Object.prototype.inherit = function(baseConstructor) {
  this.prototype = clone(baseConstructor.prototype);
  this.prototype.constructor = this;
};
Object.prototype.method = function(name, func) {
  this.prototype[name] = func;
};

// use in place of "new"
Object.prototype.create = function() {
  var object = clone(this);
  if (object.construct != undefined)
    object.construct.apply(object, arguments);
  return object;
};

// inherit properties
Object.prototype.extend = function(properties) {
  var result = clone(this);
  forEachIn(properties, function(name, value) {
   result[name] = value;
  });
  return result;
};
// instanceof for this ghetto object constructor
Object.prototype.isA = function(prototype) {
  function DummyConstructor() {}
  DummyConstructor.prototype = prototype;
  return this instanceof DummyConstructor;
};




/* END Haverbeke functions */
