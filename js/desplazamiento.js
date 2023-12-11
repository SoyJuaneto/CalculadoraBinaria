function isNumber(entradaA, entradaB, entradaC) {
  var patron = /^-?\d+$/;

  if (patron.test(entradaA) && patron.test(entradaB) && patron.test(entradaC)) {
    return true;
  } else {
    alert("EL DATO INGRESADO ES INVALIDO");
    return false;
  }
}

function desplazar(direccion) {
  const entrada = document.getElementById("entrada").value;
  const bitsRepre = parseInt(document.getElementById("numBits2").value);
  const desplazar = document.getElementById("cantBits").value;

  const resultado = desplazamiento(entrada, bitsRepre, desplazar, direccion);

  if (isNumber(entrada, bitsRepre, desplazar)) {
    if (![4, 8, 16].includes(bitsRepre)) {
      alert("DEBE SELECCIONAR 4 8 U 16 BITS UNICAMENTE");
      cleanE();
    } else {
      document.getElementById(
        "resultado4"
      ).innerText = `Desplazamiento: ${resultado}`;
    }
  }
}

function extenderSigno(numeroBinario, numBits) {
  const bitSigno = numeroBinario.charAt(0);
  return bitSigno.repeat(numBits - numeroBinario.length) + numeroBinario;
}

function desplazamiento(
  numeroDecimalOBinario,
  numBitsRepresentacion,
  numBitsDesplazamiento,
  direccion
) {
  let numeroBinario;
  if (typeof numeroDecimalOBinario === "number") {
    numeroBinario = convertirDecABin(
      numeroDecimalOBinario,
      numBitsRepresentacion
    );
  } else if (
    typeof numeroDecimalOBinario === "string" &&
    /^[01]+$/.test(numeroDecimalOBinario)
  ) {
    numeroBinario = numeroDecimalOBinario.padStart(numBitsRepresentacion, "0");
  } else {
    alert("ENTRADA NO VÁLIDA");
    return "Entrada no válida";
  }

  const longitud = numeroBinario.length;

  if (direccion === "izquierda") {
    return numeroBinario.slice(numBitsDesplazamiento).padEnd(longitud, "0");
  } else if (direccion === "derecha") {
    const bitsSigno = numeroBinario.charAt(0).repeat(numBitsDesplazamiento);
    const bitsRestantes = numeroBinario.slice(
      0,
      longitud - numBitsDesplazamiento
    );
    return extenderSigno(bitsSigno + bitsRestantes, longitud);
  } else {
    alert("DIRECCIÓN  DE DESPLAZAMIENTO NO VÁLIDA");
    return "Dirección de desplazamiento inválida";
  }
}
function cleanE() {
  document.getElementById("entrada").value = "";
  document.getElementById("numBits").value = "";
  document.getElementById("cantBits").value = "";
}

function convertirDecABin(numeroDecimal, numBits) {
  if (numeroDecimal >= 0) {
    return numeroDecimal.toString(2).padStart(numBits, "0");
  } else {
    const complemento = (Math.pow(2, numBits) + numeroDecimal).toString(2);
    return complemento;
  }
}
