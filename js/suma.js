function isNumber(x1, x2, x3) {
  var x = /^-?\d+$/;

  if (x.test(x1) && x.test(x2) && x.test(x3)) {
    return true;
  } else {
    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function SumaB() {
  const binarioA = document.getElementById("binarioA").value;
  const binarioB = document.getElementById("binarioB").value;
  const bitsB = parseInt(document.getElementById("numBitsDos").value);

  const resultadoBinarios = sumaComplementoB(binarioA, binarioB, bitsB);

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
      ).innerText = `Resultado de la suma en binario: ${resultadoBinarios.resultadoBin}
            Resultado de la en decimal: ${resultadoBinarios.resultadoDecimalBin}`;
    }
  }
}

function SumaE() {
  const decimalA = parseInt(document.getElementById("decimalA").value);
  const decimalB = parseInt(document.getElementById("decimalB").value);
  const bitsE = parseInt(document.getElementById("numBits").value);

  const resultado = sumaComplementoE(decimalA, decimalB, bitsE);

  if (isNumber(decimalA, decimalB, bitsE)) {
    if (![4, 8, 16, 32].includes(bitsE)) {
      alert("EL DATO INGRESADO ES INVALIDO");
      cleanE();
    } else {
      if (resultado.huboDesbordamiento == true) {
        alert("EXISTE DESBORDAMIENTO");
      }

      document.getElementById(
        "resultado"
      ).innerText = `Resultado de la suma en decimal: ${resultado.resultadoDecimal}
      Resultado de la suma en binario: ${resultado.resultado}`;
    }
  }
}

function sumaComplementoB(binarioA, binarioB, numBits) {
  decimalA = convertirNumero(binarioA);
  decimalB = convertirNumero(binarioB);
  binarioA = (decimalA >>> 0).toString(2);
  binarioB = (decimalB >>> 0).toString(2);

  let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

  binarioA = binarioA.padStart(maxLength, "0");
  binarioB = binarioB.padStart(maxLength, "0");

  let carry = 0;
  let resultadoBin = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitA = parseInt(binarioA[i] || "0");
    const bitB = parseInt(binarioB[i] || "0");
    const suma = bitA + bitB + carry;

    resultadoBin = (suma % 2) + resultadoBin;
    carry = Math.floor(suma / 2);
  }

  if (carry !== 0) {
    resultadoBin = resultadoBin.slice(1);
  }

  resultadoBin = resultadoBin.slice(-numBits);

  const msbBefore = resultadoBin.charAt(0);
  const msbAfter = resultadoBin.charAt(1);

  const huboDesbordamientoBin = msbBefore !== msbAfter;
  let resultadoDecimalBin = convertirNumero(resultadoBin);

  return { resultadoBin, huboDesbordamientoBin, resultadoDecimalBin };
}

function sumaComplementoE(decimalA, decimalB, numBits) {
  let binarioA = (decimalA >>> 0).toString(2);
  let binarioB = (decimalB >>> 0).toString(2);

  let maxLength = Math.max(binarioA.length, binarioB.length, numBits);

  binarioA = binarioA.padStart(maxLength, "0");
  binarioB = binarioB.padStart(maxLength, "0");

  let carry = 0;
  let resultado = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    const bitA = parseInt(binarioA[i] || "0");
    const bitB = parseInt(binarioB[i] || "0");
    const suma = bitA + bitB + carry;

    resultado = (suma % 2) + resultado;
    carry = Math.floor(suma / 2);
  }

  if (carry !== 0) {
    resultado = resultado.slice(1);
  }

  resultado = resultado.slice(-numBits);

  const msbBefore = resultado.charAt(0);
  const msbAfter = resultado.charAt(1);

  const huboDesbordamiento = msbBefore !== msbAfter;
  let resultadoDecimal = convertirNumero(resultado);
  return { resultado, huboDesbordamiento, resultadoDecimal };
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
