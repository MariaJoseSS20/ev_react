import { useMemo, useState } from 'react';
import { productos, buscarProducto } from '../data/productos';
import { clp } from '../utils/formato';

function totalCarrito(carrito) {
  return carrito.reduce((acc, linea) => {
    const p = buscarProducto(linea.productoId);
    return p ? acc + p.precio * linea.cantidad : acc;
  }, 0);
}

function textoPedido(carrito) {
  const partes = carrito.map((linea) => {
    const p = buscarProducto(linea.productoId);
    return p ? `${p.nombre} ×${linea.cantidad}` : null;
  }).filter(Boolean);
  return `Pescadería "Donde Chifla" — Pedido: ${partes.join(', ')}. Total ${clp(totalCarrito(carrito))}.`;
}

export default function Home() {
  const [carrito, setCarrito] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [cantidades, setCantidades] = useState(() =>
    Object.fromEntries(productos.map((p) => [p.id, '1']))
  );
  const [validado, setValidado] = useState(false);
  const [mostrarVacio, setMostrarVacio] = useState(false);

  const visibles = useMemo(
    () => productos.filter((p) => !filtro || p.categoria === filtro),
    [filtro]
  );

  function agregar(id) {
    const cant = parseInt(cantidades[id], 10);
    if (Number.isNaN(cant) || cant < 1 || cant > 999) return;
    setCarrito((prev) => {
      const existe = prev.find((l) => l.productoId === id);
      if (existe) {
        return prev.map((l) =>
          l.productoId === id ? { ...l, cantidad: l.cantidad + cant } : l
        );
      }
      return [...prev, { productoId: id, cantidad: cant }];
    });
    setMostrarVacio(false);
  }

  function quitar(id) {
    setCarrito((prev) => prev.filter((l) => l.productoId !== id));
  }

  function vaciar() {
    setCarrito([]);
  }

  function validarPedido(form) {
    setValidado(true);
    const vacio = carrito.length === 0;
    setMostrarVacio(vacio);
    return form.checkValidity() && !vacio;
  }

  function compartirWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(textoPedido(carrito))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function compartirFacebook() {
    const base = window.location.origin;
    const params = new URLSearchParams({
      u: base,
      quote: textoPedido(carrito),
    });
    window.open(`https://www.facebook.com/sharer/sharer.php?${params}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <main className="container py-4">
      <div id="hero-pedido" className="hero-banner p-4 p-md-5 mb-4 rounded-4">
        <div className="hero-banner-inner">
          <span className="hero-marca badge rounded-pill border border-white border-opacity-25 bg-white bg-opacity-10 text-white fw-semibold px-3 py-2 mb-3">
            Realiza tu pedido en línea
          </span>
          <h1 className="display-6 fw-semibold mb-3 text-white">
            <strong>Pescadería &quot;Donde Chifla&quot;</strong>
          </h1>
          <p className="lead text-white text-opacity-90 mb-3 mb-md-4">
            Del mar a tu casa. Navega nuestro catálogo y realiza tu pedido.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <form
            id="formVenta"
            className={`card p-3 needs-validation${validado ? ' was-validated' : ''}`}
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (validarPedido(e.currentTarget)) {
                alert('Pedido validado. Coordina la confirmación por WhatsApp o en el local.');
              }
            }}
          >
            <div className="venta-bloque-cliente">
              <h2 className="h5 mb-1">Datos cliente</h2>
              <div className="mb-2">
                <label htmlFor="clienteNombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  id="clienteNombre"
                  className="form-control"
                  required
                  minLength={2}
                  maxLength={60}
                />
                <div className="invalid-feedback">Usa al menos 2 caracteres para el nombre.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="clienteEmail" className="form-label">
                  Correo
                </label>
                <input type="email" id="clienteEmail" className="form-control" required maxLength={254} />
                <div className="invalid-feedback">Indica un correo válido.</div>
              </div>
              <p className="mb-1 fw-semibold">Tipo de cliente</p>
              <div className="mb-2 d-flex flex-wrap gap-3">
                <div className="form-check form-check-inline mb-0">
                  <input className="form-check-input" type="radio" name="tipo_cliente" id="tc_persona" value="persona" required />
                  <label className="form-check-label" htmlFor="tc_persona">
                    Persona
                  </label>
                </div>
                <div className="form-check form-check-inline mb-0">
                  <input className="form-check-input" type="radio" name="tipo_cliente" id="tc_empresa" value="empresa" />
                  <label className="form-check-label" htmlFor="tc_empresa">
                    Empresa
                  </label>
                </div>
              </div>
            </div>

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
                  style={{ minWidth: '10.5rem' }}
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
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
                {visibles.map((p) => (
                  <div key={p.id} className="col-12 col-md-6 col-lg-6 producto-item" data-categoria={p.categoria}>
                    <div className="card card-producto h-100 border shadow-sm overflow-hidden">
                      <img
                        className="card-img-top card-producto-img"
                        src={p.imagen}
                        alt={p.nombre}
                        width={640}
                        height={160}
                        loading="lazy"
                      />
                      <div className="card-body">
                        <span className="producto-cat-tag">{p.etiqueta}</span>
                        <p className="fw-semibold mb-2">{p.nombre}</p>
                        <p className="small text-muted mb-2">
                          <span className="font-monospace">{p.sku}</span>
                          <span className="card-producto-precio ms-2">{clp(p.precio)}</span>
                        </p>
                        <div className="d-flex align-items-center gap-2">
                          <label className="form-label small mb-0" htmlFor={`cant_${p.id}`}>
                            Cantidad
                          </label>
                          <input
                            id={`cant_${p.id}`}
                            type="number"
                            className="form-control form-control-sm cantidad-por-producto"
                            min={1}
                            max={999}
                            value={cantidades[p.id]}
                            onChange={(e) =>
                              setCantidades((prev) => ({ ...prev, [p.id]: e.target.value }))
                            }
                          />
                        </div>
                        <button
                          type="button"
                          className="btn btn-success btn-sm w-100 mt-2"
                          onClick={() => agregar(p.id)}
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mb-1 mt-3 fw-semibold">Retiro o envío</p>
            <div className="mb-3 d-flex flex-wrap gap-3">
              <div className="form-check form-check-inline mb-0">
                <input className="form-check-input" type="radio" name="despacho" id="d_retiro" value="retiro" required />
                <label className="form-check-label" htmlFor="d_retiro">
                  Retiro en tienda
                </label>
              </div>
              <div className="form-check form-check-inline mb-0">
                <input className="form-check-input" type="radio" name="despacho" id="d_envio" value="envio" />
                <label className="form-check-label" htmlFor="d_envio">
                  Envío
                </label>
              </div>
            </div>

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="aceptaTerminosVenta" required />
              <label className="form-check-label" htmlFor="aceptaTerminosVenta">
                Acepto los términos y condiciones
              </label>
              <div className="invalid-feedback">Debes aceptar los términos para continuar.</div>
            </div>

            <button className="btn btn-success" type="submit">
              Confirmar pedido
            </button>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card venta-bloque-carrito border-0 shadow-sm mb-3 p-3 p-md-4">
            <h2 className="h5 mb-1">Carrito</h2>
            <div className="table-responsive carrito-tabla-wrap rounded-3">
              <table className="table table-sm mb-0 align-middle carrito-tabla">
                <thead>
                  <tr>
                    <th scope="col">Producto</th>
                    <th scope="col">SKU</th>
                    <th scope="col" className="text-end">Cant.</th>
                    <th scope="col" className="text-end">Subtotal</th>
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
                              onClick={() => quitar(linea.productoId)}
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
              <button type="button" className="btn btn-outline-danger btn-sm" onClick={vaciar}>
                Vaciar
              </button>
              <strong id="totalCarrito">{clp(totalCarrito(carrito))}</strong>
            </div>
          </div>

          <section className="card venta-bloque-finalizar-pedido border-0 shadow-sm p-3">
            <h2 className="h5 mb-2">¡Comparte tu pedido!</h2>
            <div className="d-grid gap-2">
              <button type="button" className="btn btn-success btn-sm" onClick={compartirWhatsApp}>
                WhatsApp
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={compartirFacebook}>
                Facebook
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
