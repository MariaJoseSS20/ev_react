import { useState } from 'react';
import { clp } from '../../utils/formato';

export default function ProductoCard({ producto, onAgregar }) {
  const [cantidad, setCantidad] = useState('1');

  function handleAgregar() {
    const cant = parseInt(cantidad, 10);
    if (Number.isNaN(cant) || cant < 1 || cant > 999) return;
    onAgregar(producto.id, cant);
  }

  return (
    <div className="col-12 col-md-6 col-lg-6 producto-item" data-categoria={producto.categoria}>
      <div className="card card-producto h-100 border shadow-sm overflow-hidden">
        <img
          className="card-img-top card-producto-img"
          src={producto.imagen}
          alt={producto.nombre}
          width={640}
          height={160}
          loading="lazy"
        />
        <div className="card-body">
          <span className="producto-cat-tag">{producto.etiqueta}</span>
          <p className="fw-semibold mb-2">{producto.nombre}</p>
          <p className="small text-muted mb-2">
            <span className="font-monospace">{producto.sku}</span>
            <span className="card-producto-precio ms-2">{clp(producto.precio)}</span>
          </p>
          <div className="d-flex align-items-center gap-2">
            <label className="form-label small mb-0" htmlFor={`cant_${producto.id}`}>
              Cantidad
            </label>
            <input
              id={`cant_${producto.id}`}
              type="number"
              className="form-control form-control-sm cantidad-por-producto"
              min={1}
              max={999}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-success btn-sm w-100 mt-2"
            onClick={handleAgregar}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}
