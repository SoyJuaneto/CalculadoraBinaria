function isNumber(x1, x2, x3) {
  var x = /^-?\d+$/;

  if (x.test(x1) && x.test(x2) && x.test(x3)) {
    return true;
  } else {
    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function RestaB() {
  const binarioA = document.getElementById("binarioA").value;
  const binarioB = document.getElementById("binarioB").value;
  const bitsB = parseInt(document.getElementById("numBitsDos").value);

  const resultadoBinarios = restaComplementoB(binarioA, binarioB, bitsB);

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
      ).innerText = `Resultado de la resta en binario: ${resultadoBinarios.resultadoBin}
            Resultado de la resta en decimal: ${resultadoBinarios.resultadoDecimalBin}`;
    }
  }
}

function RestaE() {
  const decimalA = parseInt(document.getElementById("decimalA").value);
  const decimalB = parseInt(document.getElementById("decimalB").value);
  const bitsE = parseInt(document.getElementById("numBits").value);

  const resultado = restaComplementoE(decimalA, decimalB, bitsE);

  if (isNumber(decimalA, decimalB, bitsE)) {
    if (![4, 8, 16].includes(bitsE)) {
      alert("EL DATO INGRESADO ES INVALIDO");
      cleanE();
    } else {
      if (resultado.huboDesbordamientoBin == true) {
        alert("EXISTE DESBORDAMIENTO");
      }
      // Mostrar resultado
      document.getElementById(
        "resultado"
      ).innerText = `Resultado de la resta en decimal: ${resultado.resultadoDecimal}
            Resultado de la resta en binario: ${resultado.resultado}`;
    }
  }
}

function restaComplementoB(binarioA, binarioB, numBits) {
  let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

  let complementoB = "";
  for (let i = 0; i < binarioB.length; i++) {
    complementoB += binarioB[i] === "0" ? "1" : "0";
  }

  let carry = 1;
  let sumaComplementoB = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitB = parseInt(complementoB[i] || "0");
    const suma = bitB + carry;

    sumaComplementoB = (suma % 2) + sumaComplementoB;
    carry = Math.floor(suma / 2);
  }

  let carrySuma = 0;
  let resultadoBin = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitA = parseInt(binarioA[i] || "0");
    const bitSumaComplementoB = parseInt(sumaComplementoB[i] || "0");
    const suma = bitA + bitSumaComplementoB + carrySuma;

    resultadoBin = (suma % 2) + resultadoBin;
    carrySuma = Math.floor(suma / 2);
  }

  const maxPositiveValue = (1 << (numBits - 1)) - 1;
  const minNegativeValue = -(1 << (numBits - 1));

  let huboDesbordamientoBin = false;
  if (
    parseInt(resultadoBin, 2) > maxPositiveValue ||
    parseInt(resultadoBin, 2) < minNegativeValue
  ) {
    resultadoBin = resultadoBin.slice(1);
    huboDesbordamientoBin = true;
  }

  resultadoBin = resultadoBin.slice(-numBits);
  let resultadoDecimalBin = convertirNumero(resultadoBin);
  return { resultadoBin, huboDesbordamientoBin, resultadoDecimalBin };
}

function restaComplementoE(decimalA, decimalB, numBits) {
  let binarioA = (decimalA >>> 0).toString(2);
  let binarioB = (decimalB >>> 0).toString(2);

  let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

  binarioA = binarioA.padStart(maxLength, "0");
  binarioB = binarioB.padStart(maxLength, "0");

  let complementoB = "";
  for (let i = 0; i < binarioB.length; i++) {
    complementoB += binarioB[i] === "0" ? "1" : "0";
  }

  let carry = 1;
  let sumaComplementoB = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitB = parseInt(complementoB[i] || "0");
    const suma = bitB + carry;

    sumaComplementoB = (suma % 2) + sumaComplementoB;
    carry = Math.floor(suma / 2);
  }

  let carrySuma = 0;
  let resultado = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitA = parseInt(binarioA[i] || "0");
    const bitSumaComplementoB = parseInt(sumaComplementoB[i] || "0");
    const suma = bitA + bitSumaComplementoB + carrySuma;

    resultado = (suma % 2) + resultado;
    carrySuma = Math.floor(suma / 2);
  }

  const maxPositiveValue = (1 << (numBits - 1)) - 1;
  const minNegativeValue = -(1 << (numBits - 1));

  let huboDesbordamientoBin = false;
  if (
    parseInt(resultado, 2) > maxPositiveValue ||
    parseInt(resultado, 2) < minNegativeValue
  ) {
    resultado = resultado.slice(1);
    huboDesbordamientoBin = true;
  }

  resultado = resultado.slice(-numBits);
  let resultadoDecimal = convertirNumero(resultado);
  return { resultado, huboDesbordamientoBin, resultadoDecimal };
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
