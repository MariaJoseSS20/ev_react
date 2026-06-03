import { buscarProducto } from '../data/productos';
import { clp } from './formato';

export function totalCarrito(carrito) {
  return carrito.reduce((acc, linea) => {
    const p = buscarProducto(linea.productoId);
    return p ? acc + p.precio * linea.cantidad : acc;
  }, 0);
}

export function textoPedido(carrito) {
  const partes = carrito
    .map((linea) => {
      const p = buscarProducto(linea.productoId);
      return p ? `${p.nombre} ×${linea.cantidad}` : null;
    })
    .filter(Boolean);
  return `Pescadería "Donde Chifla" — Pedido: ${partes.join(', ')}. Total ${clp(totalCarrito(carrito))}.`;
}
