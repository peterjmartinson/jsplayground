window.onload = function() {
  
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

  var something = ["Howdy 1","Howdy 2","Howdy 3"];


/* TERRARIUM */

/* BEGIN Special Functions/Constructors by Haverbeke */
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
/* END special functions */

var thePlan = 
  ["############################",
   "#   #     #               %#",
   "#    o        ~            #",
   "#         %       ##       #",
   "##     #   ###  o ##   #   #",
   "###  ##      #         #   #",
   "#         ~  ##        #####",
   "#      #      ###          #",
   "# ~     #  o           o   #",
   "#               %          #",
   "#   ###    #        #      #",
   "##      %  #   ###         #",
   "###             #  ###     #",
   "############################"];

function Point(x, y) {
  this.x = x;
  this.y = y;
}
Point.prototype.add = function(other) {
  return new Point(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
  this.width = width;
  this.height = height;
  this.cells = new Array(width * height);
}
Grid.prototype.valueAt = function(point) {
  return this.cells[point.y * this.width + point.x];
};
Grid.prototype.setValueAt = function(point, value) {
  this.cells[point.y * this.width + point.x] = value;
};
Grid.prototype.isInside = function(point) {
  return point.x >= 0 && point.y >= 0 &&
         point.x < this.width && point.y < this.height;
};
Grid.prototype.moveValue = function(from, to) {
  this.setValueAt(to, this.valueAt(from));
  this.setValueAt(from, undefined);
};
Grid.prototype.each = function(action) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var point = new Point(x, y);
      action(point, this.valueAt(point));
    }
  }
};

var directions = new Dictionary(
  {"n":  new Point( 0, -1),
   "ne": new Point( 1, -1),
   "e":  new Point( 1, 0),
   "se": new Point( 1, 1),
   "s":  new Point( 0, 1),
   "sw": new Point( -1, 1),
   "w":  new Point( -1, 0),
   "nw": new Point( -1, -1)}
);


var wall = {};
var creatureTypes = new Dictionary();
creatureTypes.register = function(constructor, character) {
  constructor.prototype.character = character;
  this.store(character, constructor);
};

function StupidBug() {};
StupidBug.prototype.act = function(surroundings) {
  return {type: "move", direction: "s"};
};
creatureTypes.register(StupidBug, "o");

function BouncingBug() {
  this.direction = "ne";
}
BouncingBug.prototype.act = function(surroundings) {
  if (surroundings[this.direction] != " ")
    this.direction = (this.direction == "ne" ? "sw" : "ne");
  return {type: "move", direction: this.direction};
};
creatureTypes.register(BouncingBug, "%");

function DrunkBug() {};
DrunkBug.prototype.act = function(surroundings) {
  return {type: "move", direction: randomElement(directions.names())};
};
creatureTypes.register(DrunkBug, "~");

function elementFromCharacter(character) {
  if (character == " ")
    return undefined;
  else if (character == "#")
    return wall;
  else if (creatureTypes.contains(character))
    return new (creatureTypes.lookup(character))();
  else
    throw new Error("Unknown character: " + character);
}

function Terrarium(plan) {
  var grid = new Grid(plan[0].length, plan.length);
  for (var y = 0; y < plan.length; y++) {
    var line = plan[y];
    for (var x = 0; x < line.length; x++) {
      grid.setValueAt(new Point(x, y), elementFromCharacter(line.charAt(x)));
    }
  }
  this.grid = grid;
}

wall.character = "#";
StupidBug.prototype.character = "o";

function characterFromElement(element) {
  if (element === undefined)
    return " ";
  else
    return element.character;
}

Terrarium.prototype.toString = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;
  this.grid.each(function(point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  return characters.join("");
};

Terrarium.prototype.toHTML = function() {
  var characters = [];
  var endOfLine = this.grid.width - 1;
  characters.push("<pre>");
  this.grid.each(function(point, value) {
    characters.push(characterFromElement(value));
    if (point.x == endOfLine)
      characters.push("\n");
  });
  characters.push("</pre>");
  return characters.join("");
};

function bind(func, object) {
  return function() {
    return func.apply(object, arguments);
  };
}
var x = [];
var pushX = bind(x.push, x);

// function method(object, name) {
//   return function() {
//     return object[name].apply(object, arguments);
//   };
// }
// var pushX = method(x, "push");

Terrarium.prototype.listActingCreatures = function() {
  var found = [];
  this.grid.each(function(point, value) {
    if (value != undefined && value.act)
      found.push({object: value, point: point});
  });
  return found;
};

Terrarium.prototype.listSurroundings = function(center) {
  var result = {};
  var grid = this.grid;
  directions.each(function(name, direction) {
    var place = center.add(direction);
    if (grid.isInside(place))
      result[name] = characterFromElement(grid.valueAt(place));
    else
      reslut[name] = "#";
  });
  return result;
};

Terrarium.prototype.processCreature = function(creature) {
  var action = creature.object.act(this.listSurroundings(creature.point));
  if (action.type == "move" && directions.contains(action.direction)) {
    var to = creature.point.add(directions.lookup(action.direction)); // added creature.
    if (this.grid.isInside(to) && this.grid.valueAt(to) == undefined)
      this.grid.moveValue(creature.point, to);
  }
  else {
    throw new Error("Unsupported action: " + action.type);
  }
};

Terrarium.prototype.step = function() {
  forEach(this.listActingCreatures(), bind(this.processCreature, this));
};



var terrarium = new Terrarium(thePlan);
terrarium.step();

console.log(terrarium.toString());



var DOMElement = document.getElementById("cowport");

// the following animates at one second intervals!!
setInterval( function() {
  terrarium.step();
  console.log(terrarium.toString());
  DOMElement.innerHTML = terrarium.toHTML();
}, 1000);


}

