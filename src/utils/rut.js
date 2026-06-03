/** Normaliza RUT chileno: quita puntos y deja guión antes del dígito verificador. */
export function normalizarRut(valor) {
  return String(valor || '')
    .trim()
    .replace(/\./g, '')
    .replace(/\s/g, '')
    .toUpperCase();
}

/** Calcula dígito verificador para el cuerpo numérico del RUT. */
export function digitoVerificador(cuerpo) {
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i -= 1) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  if (resto === 11) return '0';
  if (resto === 10) return 'K';
  return String(resto);
}

/** Valida formato y módulo 11 del RUT chileno. */
export function validarRut(valor) {
  const limpio = normalizarRut(valor);
  if (!/^\d{7,8}-[\dK]$/.test(limpio)) return false;
  const [cuerpo, dv] = limpio.split('-');
  return digitoVerificador(cuerpo) === dv;
}

export function formatearRut(valor) {
  const limpio = normalizarRut(valor).replace('-', '');
  if (limpio.length < 2) return limpio;
  const dv = limpio.slice(-1);
  const cuerpo = limpio.slice(0, -1);
  const conPuntos = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${conPuntos}-${dv}`;
}
