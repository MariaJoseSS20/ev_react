const STORAGE_HISTORIAL = 'pescaderia_indicadores_historial';

function leerCrudos() {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORIAL);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function listarHistorialIndicadores() {
  return leerCrudos();
}

export function guardarConsultaIndicadores({ cantidad, resultados, valoresApi }) {
  const lista = leerCrudos();
  const registro = {
    id: Date.now(),
    fecha: new Date().toISOString(),
    cantidad: String(cantidad),
    resultados,
    valoresApi,
  };
  lista.unshift(registro);
  const recortada = lista.slice(0, 20);
  localStorage.setItem(STORAGE_HISTORIAL, JSON.stringify(recortada));
  return registro;
}

export function eliminarConsultaIndicador(id) {
  const lista = leerCrudos().filter((r) => r.id !== id);
  localStorage.setItem(STORAGE_HISTORIAL, JSON.stringify(lista));
  return lista;
}
