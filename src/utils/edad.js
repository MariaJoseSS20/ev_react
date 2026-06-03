/**
 * Calcula edad en años completos a partir de fecha de nacimiento (YYYY-MM-DD).
 * Retorna null si la fecha es inválida o futura.
 */
export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const nac = new Date(`${fechaNacimiento}T12:00:00`);
  if (Number.isNaN(nac.getTime())) return null;
  const hoy = new Date();
  if (nac > hoy) return null;

  let edad = hoy.getFullYear() - nac.getFullYear();
  const mesDiff = hoy.getMonth() - nac.getMonth();
  const diaDiff = hoy.getDate() - nac.getDate();
  if (mesDiff < 0 || (mesDiff === 0 && diaDiff < 0)) {
    edad -= 1;
  }
  return edad >= 0 ? edad : null;
}

export function descripcionEdad(edad) {
  if (edad === null) return '';
  if (edad === 0) return 'Menor de 1 año';
  if (edad === 1) return '1 año';
  return `${edad} años`;
}
