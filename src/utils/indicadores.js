const API_BASE = 'https://mindicador.cl/api';

export async function obtenerIndicador(codigo) {
  const res = await fetch(`${API_BASE}/${codigo}`);
  if (!res.ok) throw new Error(`No se pudo obtener ${codigo}`);
  const data = await res.json();
  return {
    nombre: data.nombre,
    codigo: data.codigo,
    unidad: data.unidad_medida,
    valor: data.serie?.[0]?.valor ?? null,
    fecha: data.serie?.[0]?.fecha ?? null,
  };
}

/** Convierte cantidad de UF, euro o UTM a pesos chilenos. */
export function convertirAPesos(valorIndicador, cantidad) {
  const cant = parseFloat(String(cantidad).replace(',', '.'));
  if (!valorIndicador || Number.isNaN(cant) || cant <= 0) return null;
  return Math.round(valorIndicador * cant);
}
