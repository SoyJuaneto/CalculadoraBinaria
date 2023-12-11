function addNumber(value, input) {
  const inputField = document.getElementById(input);
  const currentValue = inputField.value;

  // Verificar si el valor es un signo negativo y si ya está presente
  if (value === "-" && currentValue.includes("-")) {
    return;
  }

  // Verificar si el valor ya contiene un signo negativo
  if (currentValue.includes("-") && !currentValue.startsWith("-")) {
    inputField.value = "-" + currentValue.replace("-", "");
  } else {
    inputField.value = currentValue + value;
  }
}

function clearInput(input) {
  document.getElementById(input).value = "";
}

function clearAll(x, y, z, q) {
  document.getElementById(x).value = "";
  document.getElementById(y).value = "";
  document.getElementById(z).value = "";
  document.getElementById(q).innerText = "RESULTADO:";
}
