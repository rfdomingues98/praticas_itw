/* Função de validação  */
function validate() {
  var retVal = true; /* Vamos partir do princípio de que o formulário está válido ... */
  var x1 = checkName();
  var x2 = checkAddress();
  var x3 = checkCourse();
  var x4 = checkTransport();
  var x5 = checkColor();
  /* TODO */
  if (!x1 || !x2 || !x3 || !x4 || !x5) retVal = false;
  return retVal;
}

function checkName() {
  let nameInput = document.getElementById("Nome");
  if (nameInput.value.length < 3) {
    document.getElementById("NomeError").classList.remove("d-none");
    return false;
  } else {
    if (!document.getElementById("NomeError").classList.contains("d-none")) {
      document.getElementById("NomeError").classList.add("d-none");
    }
    return true;
  }
}

function checkAddress() {
  let addrInput = document.getElementById("Morada");
  let addr = addrInput.value.split(" ");
  if (addr.length < 3) {
    document.getElementById("MoradaError").classList.remove("d-none");
    return false;
  } else {
    if (!document.getElementById("MoradaError").classList.contains("d-none")) {
      document.getElementById("MoradaError").classList.add("d-none");
    }
    return true;
  }
}

function checkCourse() {
  let courseInput = document.getElementById("Curso");
  if (courseInput.value == "") {
    document.getElementById("CursoError").classList.remove("d-none");
    return false;
  } else {
    if (!document.getElementById("CursoError").classList.contains("d-none")) {
      document.getElementById("CursoError").classList.add("d-none");
    }
    return true;
  }
}

function checkTransport() {
  let bike = document.getElementById("bicicleta").checked;
  let car = document.getElementById("carro").checked;
  let train = document.getElementById("comboio").checked;
  let selected = [];
  if (bike) selected.push(bike);
  if (car) selected.push(car);
  if (train) selected.push(train);

  if (selected.length < 2) {
    document.getElementById("VehicleError").classList.remove("d-none");
    return false;
  } else {
    if (!document.getElementById("VehicleError").classList.contains("d-none")) {
      document.getElementById("VehicleError").classList.add("d-none");
    }
    return true;
  }
}

function checkColor() {
  let red = document.getElementById("vermelho").value;
  let green = document.getElementById("verde").value;
  let blue = document.getElementById("azul").value;
  let selected = [];
  if (red) selected.push(red);
  if (green) selected.push(green);
  if (blue) selected.push(blue);
  if (selected.length != 1) {
    document.getElementById("CorError").classList.remove("d-none");
    return false;
  } else {
    if (!document.getElementById("CorError").classList.contains("d-none")) {
      document.getElementById("CorError").classList.add("d-none");
    }
    return true;
  }
}
