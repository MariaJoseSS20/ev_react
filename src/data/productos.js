import { buscarProductoPorId, listarProductos } from '../utils/productosStorage';

export { PRODUCTOS_INICIALES } from './productosIniciales';

export function buscarProducto(id) {
  return buscarProductoPorId(id);
}

export function obtenerCatalogo() {
  return listarProductos();
}
