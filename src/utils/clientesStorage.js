const STORAGE_CLIENTES = 'pescaderia_clientes_crud';

export function listarClientes() {
  try {
    const raw = localStorage.getItem(STORAGE_CLIENTES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function guardarClientes(lista) {
  localStorage.setItem(STORAGE_CLIENTES, JSON.stringify(lista));
}

export function crearCliente(datos) {
  const lista = listarClientes();
  const nuevo = { id: Date.now(), ...datos };
  lista.push(nuevo);
  guardarClientes(lista);
  return nuevo;
}

export function actualizarCliente(id, datos) {
  const lista = listarClientes().map((c) => (c.id === id ? { ...c, ...datos, id } : c));
  guardarClientes(lista);
  return lista.find((c) => c.id === id);
}

export function eliminarCliente(id) {
  const lista = listarClientes().filter((c) => c.id !== id);
  guardarClientes(lista);
  return lista;
}

export function buscarClientePorId(id) {
  const lista = listarClientes();
  for (let i = 0; i < lista.length; i += 1) {
    if (lista[i].id === id) return lista[i];
  }
  return null;
}
