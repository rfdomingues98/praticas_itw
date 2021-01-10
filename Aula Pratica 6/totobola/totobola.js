//--- variáveis globais
var Status1 = document.getElementById("Status1");
var StatusX = document.getElementById("StatusX");
var Status2 = document.getElementById("Status2");
var botao = document.getElementById("botao");
var bets = document.getElementById("bets").childElementCount;

var linhas = 0;
var apostas = 1;
var selected1 = 0;
var selectedX = 0;
var selected2 = 0;

//--- função ativada sempre que se carrega em qualquer das caixas
function boxClicked() {
  linhas = 0;
  apostas = 1;
  selected1 = 0;
  selectedX = 0;
  selected2 = 0;

  for (var i = 1; i <= bets; i++) {
    var apostasNaLinha = 1;
    var x = document.getElementById(`Jogo${i}_1`).checked;
    var y = document.getElementById(`Jogo${i}_x`).checked;
    var z = document.getElementById(`Jogo${i}_2`).checked;

    if (x) selected1++;
    if (y) selectedX++;
    if (z) selected2++;

    if (x | y | z) linhas++;
    if ((x && y) || (x && z) || (y && z)) apostasNaLinha = 2;
    if (x && y && z) apostasNaLinha = 3;

    apostas *= apostasNaLinha;
  }
  setStatus();
}

function setStatus() {
  Status1.innerText = selected1;
  StatusX.innerText = selectedX;
  Status2.innerText = selected2;
  if (linhas == 13 && apostas > 1 && apostas <= 384) {
    var x = document.getElementById(`multiplas${apostas}`);
    if (x != null) {
      x.checked = true;
    }
    botao.disabled = "";
  } else {
    var arr = document.getElementsByName("multiplas");
    for (var i = 0; i < arr.length; i++) {
      arr[i].checked = false;
    }
    botao.disabled = "disabled";
  }
}
