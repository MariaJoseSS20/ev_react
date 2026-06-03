export default function DiagramaCasosUso() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Diagrama de casos de uso</h1>
      <section className="card p-3 mb-4">
        <figure className="mb-0 text-center">
          <img
            src={`${process.env.PUBLIC_URL}/img/diagrama-casos-uso.png`}
            alt="Diagrama de casos de uso"
            className="img-fluid rounded-3 border shadow-sm d-block mx-auto"
            loading="lazy"
          />
        </figure>
      </section>
      <p className="small text-muted mb-0">
        Casos: registrar pedido, filtrar catálogo, administrar clientes (CRUD), consultar indicadores
        y usar herramientas de edad y cifrado.
      </p>
    </main>
  );
}
