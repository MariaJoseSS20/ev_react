export function clp(n) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(n);
}

/** Convierte YYYY-MM-DD o ISO (2026-06-09T04:00:00.000Z) a dd/mm/aaaa. */
export function formatearFechaDDMMYYYY(fecha) {
  if (!fecha) return '';
  const soloFecha = String(fecha).slice(0, 10);
  const [anio, mes, dia] = soloFecha.split('-');
  if (!anio || !mes || !dia) return String(fecha);
  return `${dia}/${mes}/${anio}`;
}
