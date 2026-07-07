import { useEffect, useMemo, useState } from 'react';
import Carrito from '../../components/pedido/Carrito';
import CarruselDestacados from '../../components/pedido/CarruselDestacados';
import CatalogoPedido from '../../components/pedido/CatalogoPedido';
import CompartirPedido from '../../components/pedido/CompartirPedido';
import FormularioCliente from '../../components/pedido/FormularioCliente';
import ModalConfirmacion from '../../components/ui/ModalConfirmacion';
import { buscarProducto, obtenerCatalogo } from '../../data/productos';
import { useCarrito } from '../../hooks/useCarrito';
import { totalCarrito } from '../../utils/carrito';
import { guardarPedido } from '../../utils/pedidosStorage';
import { clp } from '../../utils/formato';

export default function Home() {
  const { carrito, agregar: agregarAlCarrito, quitar, vaciar, estaVacio } = useCarrito();
  const [catalogo, setCatalogo] = useState(() => obtenerCatalogo());
  const [filtro, setFiltro] = useState('');
  const [validado, setValidado] = useState(false);
  const [mostrarVacio, setMostrarVacio] = useState(false);
  const [modalPedido, setModalPedido] = useState(false);
  const [resumenPedido, setResumenPedido] = useState('');

  const visibles = useMemo(
    () => catalogo.filter((p) => !filtro || p.categoria === filtro),
    [catalogo, filtro]
  );

  useEffect(() => {
    setCatalogo(obtenerCatalogo());
  }, []);

  function agregar(id, cant) {
    agregarAlCarrito(id, cant);
    setMostrarVacio(false);
  }

  function validarPedido(form) {
    setValidado(true);
    setMostrarVacio(estaVacio);
    return form.checkValidity() && !estaVacio;
  }

  function extraerDatosPedido(form) {
    const fd = new FormData(form);
    const items = carrito.map((linea) => {
      const p = buscarProducto(linea.productoId);
      return {
        sku: p?.sku,
        nombre: p?.nombre,
        cantidad: linea.cantidad,
        subtotal: p ? p.precio * linea.cantidad : 0,
      };
    });
    return {
      nombreCliente: String(fd.get('clienteNombre') || '').trim(),
      email: String(fd.get('clienteEmail') || '').trim(),
      tipoCliente: fd.get('tipo_cliente'),
      despacho: fd.get('despacho'),
      aceptaTerminos: form.aceptaTerminosVenta?.checked,
      items,
      total: totalCarrito(carrito),
    };
  }

  function confirmarPedido(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!validarPedido(form)) return;

    const datos = extraerDatosPedido(form);
    guardarPedido(datos);
    setResumenPedido(
      <>
        <p className="mb-2">
          Pedido registrado para <strong>{datos.nombreCliente}</strong>.
        </p>
        <p className="mb-2">
          Total: <strong>{clp(datos.total)}</strong> ({datos.items.length} producto
          {datos.items.length === 1 ? '' : 's'}).
        </p>
        <p className="mb-0 small text-muted">
          Coordina la confirmación por WhatsApp o en el local. El pedido quedó guardado en el historial.
        </p>
      </>
    );
    setModalPedido(true);
    vaciar();
    setValidado(false);
    form.reset();
  }

  return (
    <main className="container py-4">
      <div
        id="hero-pedido"
        className="hero-banner p-4 p-md-5 mb-4 rounded-4"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/banner.jpg)`,
        }}
      >
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
            onSubmit={confirmarPedido}
          >
            <FormularioCliente>
              <CatalogoPedido
                filtro={filtro}
                onFiltroChange={setFiltro}
                mostrarVacio={mostrarVacio}
                productos={visibles}
                onAgregar={agregar}
              />
            </FormularioCliente>
          </form>
        </div>

        <div className="col-lg-4">
          <Carrito carrito={carrito} onQuitar={quitar} onVaciar={vaciar} />
          <CompartirPedido carrito={carrito} />
        </div>
      </div>

      <CarruselDestacados productos={catalogo} />

      <ModalConfirmacion
        id="modalConfirmarPedido"
        titulo="Pedido confirmado"
        mensaje={resumenPedido}
        visible={modalPedido}
        onCerrar={() => setModalPedido(false)}
        onConfirmar={() => setModalPedido(false)}
        textoConfirmar="Entendido"
        variante="success"
        mostrarCancelar={false}
      />
    </main>
  );
}
