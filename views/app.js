/*
  DO NOT USE! DO NOT USE!
  DO NOT USE! DO NOT USE!

  USE APP2.JS
*/

var data = ["", ""];
var signOp = "";
var dec = 0;
var decVal = false;

//Check for decimal return true if data has it...
function checkDec(val) {
  if(val == "." && data[0].includes(".") && dec === 0) {
    decVal = true;
  }
  else if(val == "." && data[1].includes(".") && dec === 1) {
    decVal = true;
  } else {
    decVal = false;
  }
}

//output to screen..
var screen = document.getElementById("screen");

//Select all buttons then add value to data[i]
var numBtn = document.querySelectorAll(".btn");
numBtn.forEach((el) => {
  el.addEventListener("click", function() {
    if(signOp == "" && el.value != 0) {
      //check decimal // remove libe below
      checkDec(el.value);
      if(!decVal) {
        data[0] += el.value;
        screen.innerHTML = data[0];
        console.log(data[0]);
      }
    }  else {
      if(!decVal) {
        data[1] += el.value;
        screen.innerHTML = data[1];
        console.log(data[1]);
      }
    }
  });
});

//Select operator to determin type if expression
var opBtn = document.querySelectorAll(".operator");
opBtn.forEach((el) => {
  el.addEventListener("click", function() {
    //reverse to keep track of dec //remove line below
    dec === 0 ? dec = 1 : dec = 0;
    if(data[0] > 0) {
      signOp = el.value;
    }
  });
});

//figure out expression and return answer...
document.getElementById("equal").addEventListener("click", function(){
  console.log("clicked");
  var expression;
  data[0] = parseFloat(data[0]);
  data[1] = parseFloat(data[1]);

  switch (signOp) {
    case "+":
      expression = data[0] + data[1];
      break;
    case "-":
      expression = data[0] - data[1];
      break;
    case "*":
      expression = data[0] * data[1];
      break;
    case "/":
      expression = data[0] / data[1];
    }
    screen.innerHTML = expression;
    //Console.log final expression
    console.log(`${data[0]} ${signOp} ${data[1]} = ${expression}`);
    console.log(`Answer: ${expression}`);
});

//clear data for clear button...
document.getElementById("clear").addEventListener("click", function() {
  data[0] = "";
  data[1] = "";
  signOp = "";
  dec = false
  screen.innerHTML = "0000"
});
