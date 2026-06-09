import CryptoJS from 'crypto-js';

const CLAVE = process.env.REACT_APP_CIFRADO_CLAVE || 'pescaderia-donde-chifla-clave-aes';

/** Cifra el RUT con AES (crypto-js) antes de guardarlo en localStorage. */
export function cifrarRut(rut) {
  return CryptoJS.AES.encrypt(String(rut || ''), CLAVE).toString();
}

/** Descifra el RUT almacenado; si el valor es legado en texto plano, lo devuelve tal cual. */
export function descifrarRut(textoCifrado) {
  if (!textoCifrado) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(textoCifrado, CLAVE);
    const plano = bytes.toString(CryptoJS.enc.Utf8);
    return plano || textoCifrado;
  } catch {
    return textoCifrado;
  }
}
