window.onload = function() {

function convertToRoman(num) {
  var cardinals = [1000, 500, 100, 50, 10, 5, 1],
      romans = ['M', 'D', 'C', 'L', 'X', 'V', 'I'],
      coefficients = [],
      i, j,
      numeralArray = [],
      numeral;
  
  // POPULATE COEFFICIENTS ARRAY
  for (i = 0; i < cardinals.length; i++) {
    coefficients[i] = Math.floor(num/cardinals[i]);
    num = num-cardinals[i]*coefficients[i];
  }
  
  // GENERATE ROMAN NUMERAL ARRAY
  for (i = cardinals.length - 1; i >= 0; i--) {
    if ( coefficients[i] !== 0 ) {
      if ( coefficients[i] < 4) {
        for (j = 0; j < coefficients[i]; j++) {
          numeralArray.push(romans[i]);
        }
      }
      else {
        if ( coefficients[i-1] === 0 ) {
          numeralArray.push(romans[i-1]);
          numeralArray.push(romans[i]);
        }
        else {
          numeralArray.push(romans[i-2]);
          numeralArray.push(romans[i]);
          coefficients[i-1]--;
        }
      }
    }
  }
  numeral = numeralArray.reverse().join('');
  return numeral;
}


  function chunkArrayInGroups(arr, size) {
    var chunks = Math.floor(arr.length/size);
    var remainder = arr.length%size;
    var returnArray = [];
    var counter = 0;
    for (var i = 0; i < chunks; i++ ) {
      returnArray[i] = arr.slice(size*i,size*i+size);
    }
    if ( remainder ) { returnArray[i] = arr.slice(size*i); }
    console.log("returnArray: " + returnArray[i]);
    console.log("====  END  ====");
    return returnArray;
  }

  function DiffTwoArrays(array1, array2) {
    var outputArray = [],
        indexArray1 = [],
        indexArray2 = [],
        i;
    // THIS RELIES ON indexOf RETURNING ONLY FIRST INSTANCE OF MATCH

    // GET INDICES OF array1 ELEMENTS IN array2
    for (i = 0; i < array1.length; i++) {
      indexArray1[i] = array2.indexOf(array1[i]);
    }

    // GET INDICES OF array2 ELEMENTS IN array1
    for (i = 0; i < array2.length; i++) {
      indexArray2[i] = array1.indexOf(array2[i]);
    }

    // PUSH ELEMENTS CORRESPONDING TO INDICES != 1
    for (i = 0; i < array1.length; i++) {
      if (indexArray1[i] != -1) { outputArray.push(array1[i]); }
    }
    for (i = 0; i < array1.length; i++) {
    // need to check for duplicates here!!
      if (indexArray2[i] != -1 && outputArray.indexOf(array2[i]) == -1) {
        outputArray.push(array2[i]);
      }
    }

    return outputArray;
  }

var out1 = DiffTwoArrays([1,2,3,4],[1,2,3,4,5]); // should return [5]
var out2 = DiffTwoArrays([1,3,5,7],[1,2,3,4]);   // should return [2,5,7]
var out3 = DiffTwoArrays([1,2,3,4],[1,2,4,5]);   // should return [3,5]
console.log("out1: " + out1);
console.log("out2: " + out2);
console.log("out3: " + out3);

  var output = new ExternalHTML();

  output.theHTML = "<p>Output:</p>"
    + "<br>"
    + "<p>36 = " + convertToRoman(36) + "</p>"
    + "<p>1909 = " + convertToRoman(1909) + "</p>"
    + "<p>1000 = " + convertToRoman(1000) + "</p>"
    + "<p>1001 = " + convertToRoman(1001) + "</p>"
    + "<p>1009 = " + convertToRoman(1009) + "</p>"
    + "<p>3999 = " + convertToRoman(3999) + "</p>";

  var cowport = document.getElementById("cowport");
  cowport.innerHTML = output.toHTML();
}












