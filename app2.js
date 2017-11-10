/*
  data is to hold two inputs for calculator
  signOp chooses the sign to varify expression
  dec is to make changes from 0 or 1 to keep track of data[0] or data[1]
  decVal is a boolean to determine if there is a decimal in the data

  CREATED BY __--<K3LLY>--__
*/

var data = ["", ""];
var signOp = "";
var dec = 0;
var decVal = false;
var signVal = false;

//Check for decimal return true if data has it...
function checkDec(val) {
  if(val == "." && data[0].includes(".") && dec === 0) {
     decVal = true;
  }
  if(val == "." && data[1].includes(".") && dec === 1) {
     decVal = true;
  }
}

//output to screen..
var screen = document.getElementById("screen");

//Select all buttons then add value to data[i]
var numBtn = document.querySelectorAll(".btn");
numBtn.forEach((el) => {
  el.addEventListener("click", function() {
    if(signOp == "" && el.value != 0) {
      //check decimal
      checkDec(el.value);
      if(!decVal || decVal == true && el.value != ".") {
        data[0] += el.value;
        screen.innerHTML = data[0];
        console.log(data[0]);
      }
    }  else {
      //check decimal
      checkDec(el.value);
      if(!decVal || decVal == true && el.value != ".") {
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
    //reverse decVal
    decVal = false;
    //check signVal
    if(!signVal) {
      console.log(decVal);
      console.log(`dec : ${dec}`);
      //call signVal
      signVal = true;
      console.log(`signVal : ${signVal}`);
      //last check is data[0] is greater then 0;
      if(data[0] > 0) {
        signOp = el.value;
      }
    }
  });
});

//figure out expression and return answer...
document.getElementById("equal").addEventListener("click", function(){
  console.log("clicked");
  //return signval to false
  signVal = false;
  var expression;
  //convert strings to float points
  data[0] = parseFloat(data[0]);
  data[1] = parseFloat(data[1]);

  //switch case to decide what function to rerturn...
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
    decVal = true;
});

//clear data for clear button...
document.getElementById("clear").addEventListener("click", function() {
  data[0] = "";
  data[1] = "";
  signOp = "";
  decVal = false
  dec = 0;
  screen.innerHTML = "0000"
});
