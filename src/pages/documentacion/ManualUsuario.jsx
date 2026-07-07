import { Link } from 'react-router-dom';

export default function ManualUsuario() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Manual de usuario</h1>
      <p className="text-muted">
        Guía de navegación y uso del sitio Pescadería &quot;Donde Chifla&quot;.
      </p>

      <section className="card p-3 mb-4">
        <h2 className="h5">1. Realizar un pedido</h2>
        <ol className="mb-0">
          <li>
            En <Link to="/">Inicio</Link>, al final de la página revisa el <strong>carrusel</strong> de
            productos destacados.
          </li>
          <li>Completa nombre, correo y tipo de cliente en el formulario.</li>
          <li>Filtra el catálogo, indica cantidad y pulsa <strong>Agregar</strong>.</li>
          <li>Elige retiro o envío y acepta los términos.</li>
          <li>
            Al confirmar, se abre un <strong>modal</strong> y el pedido queda guardado en el historial.
          </li>
          <li>Comparte el pedido por WhatsApp o Facebook desde el panel lateral.</li>
        </ol>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5">2. Gestionar clientes</h2>
        <p className="mb-0">
          En <Link to="/clientes">Ingreso Clientes</Link> puedes crear, editar y eliminar registros. El RUT
          se cifra con AES al guardar. Usa los botones <em>Mostrar/Ocultar</em> para colapsar formulario o
          tabla.
        </p>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5">3. Gestionar productos</h2>
        <p className="mb-0">
          En <Link to="/productos">Productos</Link> administra el catálogo. Los cambios se reflejan en el
          pedido del inicio.
        </p>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5">4. Historial de pedidos</h2>
        <p className="mb-0">
          En <Link to="/pedidos">Pedidos</Link> consulta pedidos guardados y elimínalos si corresponde.
        </p>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5">5. Indicadores económicos</h2>
        <p className="mb-0">
          En <Link to="/indicadores">Conversor de monedas</Link> se cargan UF, euro y UTM desde{' '}
          <code>mindicador.cl</code>. Cada cálculo queda registrado en el historial.
        </p>
      </section>

      <section className="card p-3">
        <h2 className="h5">6. Más información</h2>
        <ul className="mb-0">
          <li>
            <Link to="/alcance">Alcance</Link> — resumen del proyecto, validaciones y componentes técnicos.
          </li>
          <li>
            <Link to="/terminos">Términos y condiciones</Link> — textos en Bootstrap, Materialize y Bulma.
          </li>
        </ul>
      </section>
    </main>
  );
}
