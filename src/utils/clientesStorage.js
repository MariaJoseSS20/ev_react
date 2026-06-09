import { cifrarRut, descifrarRut } from './cifrado';

const STORAGE_CLIENTES = 'pescaderia_clientes_crud';

function listarClientesCrudos() {
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

/** Listado con RUT tal como está almacenado (cifrado AES). */
export function listarClientes() {
  return listarClientesCrudos();
}

export function crearCliente(datos) {
  const lista = listarClientesCrudos();
  const nuevo = {
    id: Date.now(),
    nombre: datos.nombre,
    email: datos.email,
    telefono: datos.telefono,
    fechaNacimiento: datos.fechaNacimiento,
    rut: cifrarRut(datos.rut),
  };
  lista.push(nuevo);
  guardarClientes(lista);
  return nuevo;
}

export function actualizarCliente(id, datos) {
  const lista = listarClientesCrudos().map((c) =>
    c.id === id
      ? {
          ...c,
          nombre: datos.nombre,
          email: datos.email,
          telefono: datos.telefono,
          fechaNacimiento: datos.fechaNacimiento,
          rut: cifrarRut(datos.rut),
          id,
        }
      : c
  );
  guardarClientes(lista);
  return lista.find((c) => c.id === id);
}

export function eliminarCliente(id) {
  const lista = listarClientesCrudos().filter((c) => c.id !== id);
  guardarClientes(lista);
  return lista;
}

/** Para edición: devuelve el RUT descifrado en el formulario. */
export function buscarClientePorId(id) {
  const cliente = listarClientesCrudos().find((c) => c.id === id);
  if (!cliente) return null;
  return { ...cliente, rut: descifrarRut(cliente.rut) };
}
