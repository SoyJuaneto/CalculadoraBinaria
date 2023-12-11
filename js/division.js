function isNumber(entradaA, entradaB, entradaC) {
  var x = /^-?\d+$/;
  if (x.test(entradaA) && x.test(entradaB) && x.test(entradaC)) {
    return true;
  } else {
    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function DivisionB() {
  const binarioA = document.getElementById("binarioA").value;
  const binarioB = document.getElementById("binarioB").value;
  const bitsB = parseInt(document.getElementById("numBitsDos").value);

  const resultadoBinarios = divisionBinarioConSigno(binarioA, binarioB, bitsB);
  let cocienteBinario = convertirDecABin(resultadoBinarios.cociente);
  let residuoBinario = convertirDecABin(resultadoBinarios.residuo);
  if (isNumber(binarioA, binarioB, bitsB)) {
    if (![4, 8, 16].includes(bitsB)) {
      alert("EL DATO INGRESADO ES INVALIDO");
      cleanB();
    } else {
      if (resultadoBinarios.huboDesbordamientoBin == true) {
        alert("EXISTE DESBORDAMIENTO");
      }
      document.getElementById(
        "resultado2"
      ).innerText = `Cociente de la operación: ${resultadoBinarios.cociente}
            Residuo: ${resultadoBinarios.residuo} 
            Cociente en binario: ${cocienteBinario}
            Residuo en binario: ${residuoBinario}`;
    }
  }
}

function DivisionE() {
  const decimalA = parseInt(document.getElementById("decimalA").value);
  const decimalB = parseInt(document.getElementById("decimalB").value);
  const bitsE = parseInt(document.getElementById("numBits").value);

  const resultado = divisiondecimalConSigno(decimalA, decimalB, bitsE);
  let cocienteBinario = convertirDecABin(resultado.cociente);
  let residuoBinario = convertirDecABin(resultado.residuo);

  if (isNumber(decimalA, decimalB, bitsE)) {
    if (![4, 8, 16].includes(bitsE)) {
      alert("EL DATO INGRESADO ES INVALIDO");
      cleanE();
    } else {
      if (resultado.huboDesbordamiento == true) {
        alert("EXISTE DESBORDAMIENTO");
      }
      document.getElementById(
        "resultado"
      ).innerText = `Cociente en Decimal: ${resultado.cociente}
          Residuo en Decimal: ${resultado.residuo} 
          Cociente en Binario: ${cocienteBinario}
          Residuo en Binario ${residuoBinario}`;
    }
  }
}

function divisiondecimalConSigno(decimal1, decimal2, bits) {
  const dividendo = Math.abs(decimal1);
  const divisor = Math.abs(decimal2);
  const signoResultado = (decimal1 < 0) ^ (decimal2 < 0) ? -1 : 1;

  if (divisor === 0) {
    alert("División por 0");
    cleanE();
    return "Error: División por cero";
  }

  let cociente = Math.floor(dividendo / divisor) * signoResultado;

  const maxPositiveValue = (1 << (bits - 1)) - 1;
  const minNegativeValue = -(1 << (bits - 1));

  if (cociente > maxPositiveValue || cociente < minNegativeValue) {
    cociente = cociente & ((1 << bits) - 1);
  }

  const residuo = (Math.abs(decimal1) % Math.abs(decimal2)) * signoResultado;

  return { cociente, residuo };
}

function divisionBinarioConSigno(binario1, binario2, bits) {
  binario1 = convertirNumero(binario1);
  binario2 = convertirNumero(binario2);
  const dividendo = Math.abs(binario1);
  const divisor = Math.abs(binario2);
  const signoResultado = (binario1 < 0) ^ (binario2 < 0) ? -1 : 1;

  if (divisor === 0) {
    alert("División por 0");
    cleanB();
    return "Error: División por cero";
  }

  let cociente = Math.floor(dividendo / divisor) * signoResultado;

  const maxPositiveValue = (1 << (bits - 1)) - 1;
  const minNegativeValue = -(1 << (bits - 1));

  if (cociente > maxPositiveValue || cociente < minNegativeValue) {
    cociente = cociente & ((1 << bits) - 1);
  }

  const residuo = (Math.abs(binario1) % Math.abs(binario2)) * signoResultado;

  return { cociente, residuo };
}
function cleanE() {
  document.getElementById("decimalA").value = "";
  document.getElementById("decimalB").value = "";
  document.getElementById("numBits").value = "";
}
function cleanB() {
  document.getElementById("binarioA").value = "";
  document.getElementById("binarioB").value = "";
  document.getElementById("numBitsDos").value = "";
}

function convertirDecABin(numero, bits) {
  const esNegativo = numero < 0;
  if (esNegativo) {
    numero = (1 << bits) + numero;
  }
  return numero.toString(2).padStart(bits, esNegativo ? "1" : "0");
}
function convertirNumero(binario) {
  const esNegativo = binario[0] === "1";

  if (esNegativo) {
    let complementoA2 = "";
    for (let i = 0; i < binario.length; i++) {
      complementoA2 += binario[i] === "0" ? "1" : "0";
    }
    return -(parseInt(complementoA2, 2) + 1);
  }
  return parseInt(binario, 2);
}
