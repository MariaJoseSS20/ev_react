import { PRODUCTOS_INICIALES } from '../data/productosIniciales';

const STORAGE_PRODUCTOS = 'pescaderia_productos_crud';

function etiquetaDesdeCategoria(categoria) {
  return categoria === 'pescado' ? 'Pescado' : 'Marisco';
}

function leerCrudos() {
  try {
    const raw = localStorage.getItem(STORAGE_PRODUCTOS);
    if (!raw) {
      localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(PRODUCTOS_INICIALES));
      return [...PRODUCTOS_INICIALES];
    }
    return JSON.parse(raw);
  } catch {
    return [...PRODUCTOS_INICIALES];
  }
}

export function guardarProductos(lista) {
  localStorage.setItem(STORAGE_PRODUCTOS, JSON.stringify(lista));
}

export function listarProductos() {
  return leerCrudos();
}

export function buscarProductoPorId(id) {
  return leerCrudos().find((p) => p.id === id) || null;
}

export function crearProducto(datos) {
  const lista = leerCrudos();
  const nuevo = {
    id: Date.now(),
    sku: datos.sku.trim(),
    nombre: datos.nombre.trim(),
    precio: Number(datos.precio),
    categoria: datos.categoria,
    etiqueta: etiquetaDesdeCategoria(datos.categoria),
    imagen: datos.imagen.trim(),
  };
  lista.push(nuevo);
  guardarProductos(lista);
  return nuevo;
}

export function actualizarProducto(id, datos) {
  const lista = leerCrudos().map((p) =>
    p.id === id
      ? {
          ...p,
          sku: datos.sku.trim(),
          nombre: datos.nombre.trim(),
          precio: Number(datos.precio),
          categoria: datos.categoria,
          etiqueta: etiquetaDesdeCategoria(datos.categoria),
          imagen: datos.imagen.trim(),
        }
      : p
  );
  guardarProductos(lista);
  return lista.find((p) => p.id === id);
}

export function eliminarProducto(id) {
  const lista = leerCrudos().filter((p) => p.id !== id);
  guardarProductos(lista);
  return lista;
}
