import { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse } from 'bootstrap';

function navClass({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

function obtenerCollapse() {
  const panel = document.getElementById('navbarPrincipal');
  if (!panel) return null;
  return Collapse.getOrCreateInstance(panel);
}

export default function Navbar() {
  const togglerRef = useRef(null);

  useEffect(() => {
    const panel = document.getElementById('navbarPrincipal');
    if (!panel || !togglerRef.current) return undefined;

    const actualizarAria = () => {
      togglerRef.current?.setAttribute('aria-expanded', panel.classList.contains('show') ? 'true' : 'false');
    };

    panel.addEventListener('shown.bs.collapse', actualizarAria);
    panel.addEventListener('hidden.bs.collapse', actualizarAria);
    return () => {
      panel.removeEventListener('shown.bs.collapse', actualizarAria);
      panel.removeEventListener('hidden.bs.collapse', actualizarAria);
    };
  }, []);

  function toggleMenu() {
    obtenerCollapse()?.toggle();
  }

  function cerrarMenu() {
    const panel = document.getElementById('navbarPrincipal');
    if (!panel?.classList.contains('show')) return;
    obtenerCollapse()?.hide();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-mar sticky-top py-lg-2">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={cerrarMenu}>
          <strong>Pescadería &quot;Donde Chifla&quot;</strong>
        </Link>
        <button
          ref={togglerRef}
          type="button"
          className="navbar-toggler navbar-mar-toggler"
          aria-controls="navbarPrincipal"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarPrincipal"
          onClick={(e) => {
            if (e.target.closest('a')) cerrarMenu();
          }}
        >
          <div className="navbar-nav ms-auto gap-lg-1 align-items-lg-center navbar-mar-links">
            <NavLink end className={navClass} to="/">
              Inicio
            </NavLink>
            <NavLink className={navClass} to="/clientes">
              Ingreso Clientes
            </NavLink>
            <NavLink className={navClass} to="/productos">
              Productos
            </NavLink>
            <NavLink className={navClass} to="/pedidos">
              Pedidos
            </NavLink>
            <NavLink className={navClass} to="/indicadores">
              Conversor de monedas
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
            <NavLink className={navClass} to="/manual">
              Manual de usuario
            </NavLink>
            <NavLink className={navClass} to="/alcance">
              Alcance
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
