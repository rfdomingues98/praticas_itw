function calcula() {
  var x = parseFloat(document.getElementById("op1").value);
  var y = parseFloat(document.getElementById("op2").value);
  var op = document.getElementById("op-view").value;
  var res = document.getElementById("res");
  switch (op) {
    case "+":
      res.value = x + y;
      break;
    case "-":
      res.value = x - y;
      break;
    case "*":
      res.value = x * y;
      break;
    case "/":
      if (y == 0) {
        alert("Cannot divide by 0!");
        break;
      }
      res.value = x / y;
      break;
    case "%":
      res.value = x % y;
      break;
    case "!":
      if (x < 0) {
        alert("Cannot factorialize negative numbers!");
        break;
      }
      res.value = factorial(x);
      break;
    default:
      alert("Invalid operation");
      break;
  }
}

function factorial(num) {
  if (num < 0) return -1;
  else if (num == 0) return 1;
  else {
    return num * factorial(num - 1);
  }
}
