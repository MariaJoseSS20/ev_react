const STORAGE_PEDIDOS = 'pescaderia_pedidos_crud';

function leerCrudos() {
  try {
    const raw = localStorage.getItem(STORAGE_PEDIDOS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function listarPedidos() {
  return leerCrudos();
}

export function guardarPedido(pedido) {
  const lista = leerCrudos();
  const nuevo = {
    id: Date.now(),
    fecha: new Date().toISOString(),
    ...pedido,
  };
  lista.unshift(nuevo);
  localStorage.setItem(STORAGE_PEDIDOS, JSON.stringify(lista));
  return nuevo;
}

export function buscarPedidoPorId(id) {
  return leerCrudos().find((p) => p.id === id) || null;
}

export function eliminarPedido(id) {
  const lista = leerCrudos().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_PEDIDOS, JSON.stringify(lista));
  return lista;
}
