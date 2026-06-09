export const EDAD_MIN_REGISTRO = 16;
export const EDAD_MAX_REGISTRO = 100;

/** Calcula edad en años a partir de fecha YYYY-MM-DD. Retorna null si es inválida o futura. */
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

/** Fecha mínima de nacimiento (edad máxima 100 años). */
export function fechaNacimientoMinima() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - EDAD_MAX_REGISTRO);
  return d.toISOString().slice(0, 10);
}

/** Fecha máxima de nacimiento (edad mínima 16 años). */
export function fechaNacimientoMaxima() {
  const d = new Date();
  d.setFullYear(d.getFullYear() - EDAD_MIN_REGISTRO);
  return d.toISOString().slice(0, 10);
}

export function validarEdadRegistro(fechaNacimiento) {
  const edad = calcularEdad(fechaNacimiento);
  if (edad === null) {
    return { ok: false, mensaje: 'Fecha inválida o futura.' };
  }
  if (edad < EDAD_MIN_REGISTRO) {
    return { ok: false, mensaje: 'Debes tener al menos 16 años para registrarte.' };
  }
  if (edad > EDAD_MAX_REGISTRO) {
    return { ok: false, mensaje: 'La edad máxima permitida es 100 años.' };
  }
  return { ok: true, edad };
}
