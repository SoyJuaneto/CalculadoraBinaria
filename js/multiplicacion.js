function isNumber(entradaA, entradaB, entradaC) {
  var x = /^-?\d+$/;

  if (x.test(entradaA) && x.test(entradaB) && x.test(entradaC)) {
    return true;
  } else {
    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function MultiplicacionB() {
  const binarioA = document.getElementById("binarioA").value;
  const binarioB = document.getElementById("binarioB").value;
  const bitsB = parseInt(document.getElementById("numBitsDos").value);

  const resultadoBinarios = multiplicarBinSigno(binarioA, binarioB, bitsB);
  let resultadoDecimalBin = convertirNumero(resultadoBinarios);
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
      ).innerText = `Resultado de la multiplicación en Binario: ${resultadoBinarios}
            ,Resultado de la multiplicación en Decimal: ${resultadoDecimalBin}`;
    }
  }
}

function MultiplicacionE() {
  const decimalA = parseInt(document.getElementById("decimalA").value);
  const decimalB = parseInt(document.getElementById("decimalB").value);
  const bitsE = parseInt(document.getElementById("numBits").value);

  const resultado = multiplicarDecSigno(decimalA, decimalB, bitsE);
  let resultadoDecimal = convertirNumero(resultado);

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
      ).innerText = `Resultado de la multiplicación en decimal: ${resultadoDecimal}
            Resultado de la multiplicación en binario: ${resultado}`;
    }
  }
}

function multiplicarDecSigno(decimal1, decimal2, bits) {
  const binario1 = convertirDecABin(decimal1, bits);
  const binario2 = convertirDecABin(decimal2, bits);

  const multiplicando = parseInt(binario1, 2);
  const multiplicador = parseInt(binario2, 2);
  let resultado = multiplicando * multiplicador;

  const maxPositiveValue = (1 << (bits - 1)) - 1;
  const minNegativeValue = -(1 << (bits - 1));

  if (resultado > maxPositiveValue || resultado < minNegativeValue) {
    resultado = resultado & ((1 << bits) - 1);
  }

  return convertirDecABin(resultado, bits);
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

function multiplicarBinSigno(binario1, binario2, bits) {
  const multiplicando = parseInt(binario1, 2);
  const multiplicador = parseInt(binario2, 2);
  let resultado = multiplicando * multiplicador;

  const maxPositiveValue = (1 << (bits - 1)) - 1;
  const minNegativeValue = -(1 << (bits - 1));

  if (resultado > maxPositiveValue || resultado < minNegativeValue) {
    resultado = resultado & ((1 << bits) - 1);
  }

  return convertirDecABin(resultado, bits);
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
