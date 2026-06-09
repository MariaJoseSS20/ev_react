import { Link } from 'react-router-dom';

export default function DiagramaClases() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Diagrama de clases</h1>
      <section className="card p-3 mb-4 border-success border-opacity-25">
        <figure className="mb-0 text-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/diagrama-clases.png`}
            alt="Diagrama de clases del sistema de pedidos"
            className="img-fluid rounded-3 border shadow-sm d-block mx-auto"
            loading="lazy"
          />
        </figure>
      </section>
      <p className="small text-muted mb-3">
        Clases principales: Cliente, Producto, Pedido, DetallePedido y Carrito (persistencia en
        localStorage para clientes con RUT cifrado en AES).
      </p>
      <Link to="/diagrama-casos-uso">Ir a casos de uso</Link>
    </main>
  );
}
