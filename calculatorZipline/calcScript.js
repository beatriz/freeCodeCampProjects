$(document).ready(function(){
  var result;
  var currentNumber;
  var operation; // 1 = + ; 2 = - ; 3 = * ; 4 = /
  var displayStr = "";
  var firstNum; //is the first number introduced
  result = 0;
  currentNumber = 0;
  firstNum = true;

  $(".btn-num").click(function(){
    addDigit($(this).data("number"));
  });

  $("#btn-dot").click(addDot());

  $(".btn-oper").click(function(){
    if(firstNum){ //first number, then put as result and don't calculate
      result = parseFloat(displayStr);
      firstNum = false;
    } else { // set displayStr as current and make calculation
      currentNumber = parseFloat(displayStr);
      operate();
    }
    setOperation($(this).data("oper"));
  });

  $("#btn-equals").click(function(){
    if(!firstNum){
      currentNumber = parseFloat(displayStr);
      operate();
      displayStr = result;
      clearMemory();
      $("#display").text(displayStr);
    }
  });

  $("#btn-ac").click(function(){
    clearMemory();
    clearDisplay();
  });

  $("#btn-ce").click(function(){
    clearDisplay();
  });

  //add a digit to the display
  //se 0, substituir
  function addDigit(digit){
    if(displayStr == "0"){
      displayStr = "" + digit;
    } else{
      displayStr += digit;
    }
    $("#display").text(displayStr);
  }

  //add a dot to the display (if not there already)
  function addDot(){
    return function(){
      if(displayStr.indexOf(".") == -1)
        displayStr += ".";
        $("#display").text(displayStr);
    };
  }

  //makes the calculation between result and current
  // if not firstNum
  function operate(){
    switch (operation) {
      case "plus":
        result += currentNumber;
        break;
      case "minus":
        result -= currentNumber;
        break;
      case "times":
        result *= currentNumber;
        break;
      case "div":
        result /= currentNumber;
        break;
      default:
    }
  }

  // sets the operation with new and empties displayStr
  function setOperation(oper){
    displayStr = "";
    operation = oper;
  }

  //clears numbers in memory
  function clearMemory(){
    result = null;
    currentNumber = null;
    operation = null;
    firstNum = true;
  }
  function clearDisplay(){
    displayStr = "0";
    $("#display").text(displayStr);
  }
});
