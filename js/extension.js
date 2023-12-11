function isNumberE(binario, bit) {
  var guia = /^-?\d+$/;

  if (guia.test(binario) && guia.test(bit)) {
    return true;
  } else {
    if (guia.test(binario)) {
      alert("Binario");
    } else {
      alert("bit");
    }

    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function extender() {
  const binario = document.getElementById("binario").value;
  const bitSalida = document.getElementById("bits").value;

  if (isNumberE(binario, bitSalida)) {
    const resultado = extension(binario, bitSalida);

    document.getElementById("resultado3").innerText = `Extensión: ${resultado}`;
  }
}

function extension(binario, bitsSalida) {
  if (bitsSalida !== 0) {
    if (bitsSalida > 0) {
      binario = binario.padStart(bitsSalida, binario.charAt(0));
    } else {
      binario = binario.slice(-bitsSalida);
    }
  }

  return binario;
}

function cleanE() {
  document.getElementById("binario").value = "";
  document.getElementById("bitSa").value = "";
}
