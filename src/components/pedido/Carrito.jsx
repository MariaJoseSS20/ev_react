import { buscarProducto } from '../../data/productos';
import { clp } from '../../utils/formato';
import { totalCarrito } from '../../utils/carrito';

export default function Carrito({ carrito, onQuitar, onVaciar }) {
  return (
    <div className="card venta-bloque-carrito border-0 shadow-sm mb-3 p-3 p-md-4">
      <h2 className="h5 mb-1">Carrito</h2>
      <div className="table-responsive carrito-tabla-wrap rounded-3">
        <table className="table table-sm mb-0 align-middle carrito-tabla">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">SKU</th>
              <th scope="col" className="text-end">
                Cant.
              </th>
              <th scope="col" className="text-end">
                Subtotal
              </th>
              <th scope="col" className="text-end" />
            </tr>
          </thead>
          <tbody>
            {carrito.length === 0 ? (
              <tr>
                <td colSpan={5} className="carrito-vacio small">
                  Carrito vacío. Agrega productos desde el catálogo.
                </td>
              </tr>
            ) : (
              carrito.map((linea) => {
                const p = buscarProducto(linea.productoId);
                if (!p) return null;
                return (
                  <tr key={linea.productoId}>
                    <td>{p.nombre}</td>
                    <td>
                      <span className="font-monospace small text-muted">{p.sku}</span>
                    </td>
                    <td className="text-end">{linea.cantidad}</td>
                    <td className="text-end">{clp(p.precio * linea.cantidad)}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onQuitar(linea.productoId)}
                      >
                        Quitar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="carrito-pie d-flex flex-wrap align-items-center justify-content-between gap-2 mt-3 pt-3 border-top">
        <button type="button" className="btn btn-outline-danger btn-sm" onClick={onVaciar}>
          Vaciar
        </button>
        <strong id="totalCarrito">{clp(totalCarrito(carrito))}</strong>
      </div>
    </div>
  );
}
