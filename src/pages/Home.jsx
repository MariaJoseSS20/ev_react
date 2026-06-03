import { useMemo, useState } from 'react';
import Carrito from '../components/Carrito';
import CatalogoPedido from '../components/CatalogoPedido';
import CompartirPedido from '../components/CompartirPedido';
import FormularioCliente from '../components/FormularioCliente';
import { productos } from '../data/productos';
import { useCarrito } from '../hooks/useCarrito';

export default function Home() {
  const { carrito, agregar: agregarAlCarrito, quitar, vaciar, estaVacio } = useCarrito();
  const [filtro, setFiltro] = useState('');
  const [validado, setValidado] = useState(false);
  const [mostrarVacio, setMostrarVacio] = useState(false);

  const visibles = useMemo(
    () => productos.filter((p) => !filtro || p.categoria === filtro),
    [filtro]
  );

  function agregar(id, cant) {
    agregarAlCarrito(id, cant);
    setMostrarVacio(false);
  }

  function validarPedido(form) {
    setValidado(true);
    setMostrarVacio(estaVacio);
    return form.checkValidity() && !estaVacio;
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
    </main>
  );
}
