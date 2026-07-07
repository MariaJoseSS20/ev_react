import { useEffect, useState } from 'react';
import { listarPedidos, eliminarPedido } from '../../utils/pedidosStorage';
import ModalConfirmacion from '../../components/ui/ModalConfirmacion';
import { clp, formatearFechaDDMMYYYY } from '../../utils/formato';

export default function HistorialPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [idEliminar, setIdEliminar] = useState(null);

  function recargar() {
    setPedidos(listarPedidos());
  }

  useEffect(() => {
    recargar();
  }, []);

  function confirmarEliminar() {
    if (!idEliminar) return;
    eliminarPedido(idEliminar);
    setIdEliminar(null);
    recargar();
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Historial de pedidos</h1>
      <p className="text-muted small mb-4">
        Pedidos registrados.
      </p>

      {pedidos.length === 0 ? (
        <div className="alert alert-info">No hay pedidos guardados. Confirma un pedido en Inicio.</div>
      ) : (
        <div className="accordion" id="acordeonPedidos">
          {pedidos.map((p, i) => (
            <div className="accordion-item" key={p.id}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button${i === 0 ? '' : ' collapsed'}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#pedido-${p.id}`}
                  aria-expanded={i === 0}
                >
                  {p.nombreCliente} — {formatearFechaDDMMYYYY(p.fecha)} — {clp(p.total)}
                </button>
              </h2>
              <div
                id={`pedido-${p.id}`}
                className={`accordion-collapse collapse${i === 0 ? ' show' : ''}`}
                data-bs-parent="#acordeonPedidos"
              >
                <div className="accordion-body">
                  <p className="mb-1">
                    <strong>Correo:</strong> {p.email}
                  </p>
                  <p className="mb-1">
                    <strong>Tipo:</strong> {p.tipoCliente} · <strong>Despacho:</strong> {p.despacho}
                  </p>
                  <ul className="mb-3">
                    {p.items.map((item) => (
                      <li key={`${p.id}-${item.sku}`}>
                        {item.nombre} × {item.cantidad} — {clp(item.subtotal)}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setIdEliminar(p.id)}>
                    Eliminar pedido
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalConfirmacion
        id="modalEliminarPedido"
        titulo="Eliminar pedido"
        mensaje="¿Eliminar este pedido del historial?"
        visible={idEliminar != null}
        onCerrar={() => setIdEliminar(null)}
        onConfirmar={confirmarEliminar}
        textoConfirmar="Eliminar"
        variante="danger"
      />
    </main>
  );
}
