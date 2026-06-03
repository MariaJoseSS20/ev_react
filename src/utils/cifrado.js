const CLAVE_CESAR = 5;

/** Cifrado César simple (solo letras y números visibles). */
export function cifrarTexto(texto) {
  return String(texto || '')
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 + CLAVE_CESAR) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 + CLAVE_CESAR) % 26) + 97);
      }
      if (code >= 48 && code <= 57) {
        return String.fromCharCode(((code - 48 + CLAVE_CESAR) % 10) + 48);
      }
      return ch;
    })
    .join('');
}

export function descifrarTexto(texto) {
  return String(texto || '')
    .split('')
    .map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - CLAVE_CESAR + 26) % 26) + 65);
      }
      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - CLAVE_CESAR + 26) % 26) + 97);
      }
      if (code >= 48 && code <= 57) {
        return String.fromCharCode(((code - 48 - CLAVE_CESAR + 10) % 10) + 48);
      }
      return ch;
    })
    .join('');
}

const STORAGE_CIFRADO = 'pescaderia_mensajes_cifrados';

export function listarMensajesCifrados() {
  try {
    const raw = localStorage.getItem(STORAGE_CIFRADO);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function guardarMensajeCifrado(entrada, cifrado) {
  const lista = listarMensajesCifrados();
  const registro = {
    id: Date.now(),
    entrada,
    cifrado,
    fecha: new Date().toISOString(),
  };
  lista.unshift(registro);
  localStorage.setItem(STORAGE_CIFRADO, JSON.stringify(lista.slice(0, 20)));
  return registro;
}

export function eliminarMensajeCifrado(id) {
  const lista = listarMensajesCifrados().filter((m) => m.id !== id);
  localStorage.setItem(STORAGE_CIFRADO, JSON.stringify(lista));
  return lista;
}
