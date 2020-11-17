let res = document.getElementById("res");
let op1 = "";
let op2 = "";
let op = "";
let ctrl = 1;

function addNumber(e) {
  if (ctrl == 1) {
    if (op1 == "") op1 = e.value.toString();
    else op1 += e.value.toString();
    res.innerHTML = op1;
  } else if (ctrl == 2) {
    if (op2 == "") op2 = e.value.toString();
    else op2 += e.value.toString();
    res.innerHTML = op2;
  }
  console.log(ctrl, op1, op2, op);
}

function addOperation(e) {
  if (ctrl === 1 && !op) {
    ctrl = 2;
  } else if (ctrl === 2 && !op) {
    ctrl = 1;
  }
  if (op1 && op2 && op) {
    op1 = calculate().toString();
    op2 = "";
  }
  op = e.value.toString();
  console.log(ctrl, op1, op2, op);
}

function clearResult() {
  res.innerHTML = "0";
  op1 = "";
  op2 = "";
  op = "";
  ctrl = 1;
  console.log(ctrl, op1, op2, op);
}

function calculate() {
  let result = 0;
  switch (op) {
    case "+":
      result = parseInt(op1) + parseInt(op2);
      break;
    case "-":
      result = parseInt(op1) - parseInt(op2);
      break;
    case "*":
      result = parseInt(op1) * parseInt(op2);
      break;
    case "/":
      if (parseInt(op2) == 0) {
        op2 = "";
        alert("Cannot divide by 0!");
        break;
      }
      result = parseInt(op1) / parseInt(op2);
      break;
  }
  res.innerHTML = result.toString();
  return result;
}
