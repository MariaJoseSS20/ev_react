import { clp } from '../../utils/formato';

export default function CarruselDestacados({ productos }) {
  if (!productos.length) return null;

  const destacados = productos.slice(0, 5);

  return (
    <section className="mt-4 mb-4" aria-label="Productos destacados">
      <h2 className="h5 mb-3">Productos destacados</h2>
      <div id="carruselDestacados" className="carousel slide carousel-destacados shadow-sm rounded-4 overflow-hidden">
        <div className="carousel-indicators">
          {destacados.map((p, i) => (
            <button
              key={p.id}
              type="button"
              data-bs-target="#carruselDestacados"
              data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''}
              aria-current={i === 0 ? 'true' : undefined}
              aria-label={`Slide ${i + 1}: ${p.nombre}`}
            />
          ))}
        </div>
        <div className="carousel-inner">
          {destacados.map((p, i) => (
            <div key={p.id} className={`carousel-item${i === 0 ? ' active' : ''}`}>
              <img src={p.imagen} className="d-block w-100 carousel-destacados-img" alt={p.nombre} />
              <div className="carousel-caption carousel-destacados-caption text-start">
                <span className="badge bg-success mb-2">{p.etiqueta}</span>
                <h3 className="h5">{p.nombre}</h3>
                <p className="mb-0 fw-semibold">{clp(p.precio)}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carruselDestacados"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Anterior</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carruselDestacados"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}
