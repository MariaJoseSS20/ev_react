import { Link, NavLink } from 'react-router-dom';

function navClass({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-mar sticky-top py-lg-2">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <strong>Pescadería &quot;Donde Chifla&quot;</strong>
        </Link>
        <button
          type="button"
          className="navbar-toggler navbar-mar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#navbarPrincipal"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarPrincipal">
          <div className="navbar-nav ms-auto gap-lg-1 align-items-lg-center navbar-mar-links">
            <NavLink end className={navClass} to="/">
              Inicio
            </NavLink>
            <NavLink className={navClass} to="/contacto">
              Contacto y ubicación
            </NavLink>
            <NavLink className={navClass} to="/quienes-somos">
              Quiénes somos
            </NavLink>
            <NavLink className={navClass} to="/terminos">
              Términos y condiciones
            </NavLink>
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/#explora"
                id="navExploraSitio"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-haspopup="true"
              >
                Explora el sitio
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navExploraSitio">
                <li>
                  <Link className="dropdown-item" to="/alcance">
                    Alcance
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/diagrama-clases">
                    Diagrama de clases
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/diagrama-casos-uso">
                    Casos de uso
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/clientes">
                    CRUD clientes (Act. 1)
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/indicadores">
                    Indicadores API (Act. 2)
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/laboratorio">
                    Laboratorio (Act. 3)
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
