let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let currentInfo = document.getElementById("currentInfo");

function shuffle() {
  let squares = document.querySelectorAll(".square");
  for (let i = 0; i < 4; i++) {
    let elem = squares[i];
    let x = Math.floor(
      Math.random() *
        (WIDTH - parseInt(getComputedStyle(elem).width.replace("px", "")) - 300)
    );
    let y = Math.floor(
      Math.random() *
        (HEIGHT -
          parseInt(getComputedStyle(elem).height.replace("px", "")) -
          300)
    );

    elem.style.left = x + "px";
    elem.style.top = y + "px";
    squares[i] = elem;
  }
}

function setCurrentDiv(elem) {
  currentInfo.innerText = `Olá! Eu sou o ${elem.classList[1]} \n 
  top: ${getComputedStyle(elem).top} \n
  left: ${getComputedStyle(elem).left}`;
}

function clearSelected() {
  currentInfo.innerText = "";
}
