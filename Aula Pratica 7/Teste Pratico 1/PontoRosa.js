//--- TODO
$(".carousel").carousel({
  interval: 2000,
});

var quant = document.querySelector("#quantidades");
var total = document.querySelector("#total");

function addProduct(n) {
  var prodQuantity = document.querySelector(`#qty${n}`);

  prodQuantity.value = parseInt(prodQuantity.value) + 1;
  calculate();
}

function calculate() {
  var count = 0;
  while (true) {
    if (
      document.querySelector(`#qty${count + 1}`) === null ||
      document.querySelector(`#price${count + 1}`) === null
    ) {
      break;
    }
    count++;
  }

  var qty = [];
  var price = [];

  for (var i = 1; i <= count; i++) {
    qty.push(parseInt(document.getElementById(`qty${i}`).value));
    price.push(parseFloat(document.getElementById(`price${i}`).value));
  }

  var tempQuant = 0;
  var tempPrice = 0;

  for (var i = 0; i < 6; i++) {
    tempQuant += qty[i];
    tempPrice += qty[i] * price[i];
  }

  if (tempQuant >= 5) {
    tempPrice *= 0.95;
  }
  if (tempPrice > 100) {
    tempPrice *= 0.95;
  }

  quant.innerText = tempQuant;
  total.innerText = tempPrice.toFixed(2);
}

function valid() {
  if (parseInt(quant.innerText) <= 0) {
    alert("Erro! Quantidade inválida!");
    return false;
  }
  return true;
}

function clean() {
  quant.innerHTML = "0";
  total.innerHTML = "0.00";
  var i = 1;
  while (true) {
    document.querySelector(`#qty${i}`).value = "0";
    if (document.querySelector(`#qty${i + 1}`) === null) {
      break;
    }
    i++;
  }
}
