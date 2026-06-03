import ProductoCard from './ProductoCard';

export default function CatalogoPedido({
  filtro,
  onFiltroChange,
  mostrarVacio,
  productos,
  onAgregar,
}) {
  return (
    <div className="venta-bloque-catalogo">
      <h2 className="h5 mb-1" id="catalogo-pedido">
        Productos
      </h2>
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <label className="form-label mb-0 small" htmlFor="filtroCategoriaVentas">
          Tipo de producto
        </label>
        <select
          id="filtroCategoriaVentas"
          className="form-select form-select-sm"
          value={filtro}
          onChange={(e) => onFiltroChange(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="pescado">Pescado</option>
          <option value="marisco">Marisco</option>
        </select>
      </div>

      <div
        id="mensajeCarritoVacioVentas"
        className={`alert alert-warning py-2 mb-3${mostrarVacio ? '' : ' d-none'}`}
        role="alert"
      >
        Agrega al menos un producto.
      </div>

      <div className="row g-3">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} onAgregar={onAgregar} />
        ))}
      </div>
    </div>
  );
}
