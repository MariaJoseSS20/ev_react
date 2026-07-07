import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer border-top border-white border-opacity-10 mt-5 bg-mar pt-5 pb-4 text-white">
      <div className="container">
        <div className="row g-4 g-lg-5 justify-content-between">
          <div className="col-lg-5 col-xl-4">
            <p className="mb-2">
              <strong className="fw-semibold">Pescadería &quot;Donde Chifla&quot;</strong>
            </p>
            <p className="small text-white text-opacity-75 mb-0 lh-base">
              Pesca y mariscos frescos en Porvenir. Pedidos desde este catálogo; confirmación y
              disponibilidad según el local.
            </p>
          </div>
          <div className="col-sm-6 col-lg-4 col-xl-4">
            <p className="text-uppercase small fw-semibold text-white text-opacity-50 mb-3">Sitio</p>
            <nav aria-label="Enlaces del sitio">
              <ul className="nav flex-column gap-2 small">
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/contacto"
                  >
                    Contacto y ubicación
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/quienes-somos"
                  >
                    Quiénes somos
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/terminos"
                  >
                    Términos y condiciones
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="col-sm-6 col-lg-3 col-xl-3">
            <p className="text-uppercase small fw-semibold text-white text-opacity-50 mb-3">
              Documentación
            </p>
            <nav aria-label="Documentación del sitio">
              <ul className="nav flex-column gap-2 small">
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/manual"
                  >
                    Manual de usuario
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/productos"
                  >
                    Productos
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/pedidos"
                  >
                    Pedidos
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link px-0 link-light link-offset-2 link-underline-opacity-0 link-underline-opacity-75-hover"
                    to="/alcance"
                  >
                    Alcance
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr className="border-white border-opacity-25 my-4 mt-lg-5" />
        <p className="small text-white text-opacity-75 text-center text-lg-start mb-0">
          © 2026 · Pescadería &quot;Donde Chifla&quot;. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
