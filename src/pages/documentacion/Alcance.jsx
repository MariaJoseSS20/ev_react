import { Link } from 'react-router-dom';

const VALIDACIONES = [
  { campo: 'Nombre (pedido)', regla: 'Mínimo 2 caracteres', ubicacion: 'Home / FormularioCliente' },
  { campo: 'Correo (pedido)', regla: 'Formato email válido', ubicacion: 'Home / FormularioCliente' },
  { campo: 'Términos (pedido)', regla: 'Checkbox obligatorio', ubicacion: 'Home / FormularioCliente' },
  { campo: 'RUT (clientes)', regla: 'Módulo 11 chileno', ubicacion: 'CrudClientes / utils/rut.js' },
  { campo: 'Teléfono (clientes)', regla: 'Sin letras, mínimo 8 dígitos', ubicacion: 'CrudClientes' },
  { campo: 'Edad (clientes)', regla: 'Entre 16 y 100 años', ubicacion: 'utils/edad.js' },
  { campo: 'Precio (productos)', regla: 'Número mayor a 0', ubicacion: 'CrudProductos' },
];

const COMPONENTES = [
  {
    nombre: 'Cliente',
    atributos: 'id, nombre, email, telefono, fechaNacimiento, rut (AES)',
    metodos: 'crearCliente(), actualizarCliente(), eliminarCliente(), listarClientes()',
    pagina: '/clientes',
  },
  {
    nombre: 'Producto',
    atributos: 'id, sku, nombre, precio, categoria, etiqueta, imagen',
    metodos: 'crearProducto(), actualizarProducto(), eliminarProducto(), listarProductos()',
    pagina: '/productos',
  },
  {
    nombre: 'Pedido',
    atributos: 'nombreCliente, email, tipoCliente, despacho, items, total',
    metodos: 'guardarPedido(), listarPedidos(), eliminarPedido()',
    pagina: '/pedidos',
  },
  {
    nombre: 'Carrito / ItemCarrito',
    atributos: 'productoId, cantidad',
    metodos: 'agregar(), quitar(), vaciar(), totalCarrito()',
    pagina: '/',
  },
  {
    nombre: 'Indicadores (API)',
    atributos: 'uf, euro, utm, cantidad, resultados',
    metodos: 'obtenerIndicador(), convertirAPesos(), guardarConsultaIndicadores()',
    pagina: '/indicadores',
  },
];

export default function Alcance() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Alcance del proyecto</h1>
      <div className="card p-3 mb-4">
        <p>
          SPA en React para la Pescadería &quot;Donde Chifla&quot;: catálogo y pedido en línea con
          carrusel y modal de confirmación, gestión de clientes y productos, historial de pedidos,
          conversión de indicadores vía API mindicador.cl con historial de consultas, manual de usuario
          y documentación del sistema.
        </p>
        <ul>
          <li>Actividad 1: validaciones JavaScript, RUT, modal, colapsables y carrusel Bootstrap.</li>
          <li>Actividad 2: CRUD clientes, productos y pedidos; API e indicadores integrados.</li>
          <li>Actividad 3: manual de usuario y términos en Bootstrap/Materialize/Bulma.</li>
        </ul>
      </div>

      <section className="card p-3 mb-4">
        <h2 className="h5">Módulos del sistema</h2>
        <ul className="mb-0">
          <li>
            <code>pescaderia_clientes_crud</code> — clientes (RUT cifrado AES).
          </li>
          <li>
            <code>pescaderia_productos_crud</code> — catálogo editable.
          </li>
          <li>
            <code>pescaderia_pedidos_crud</code> — pedidos confirmados desde Inicio.
          </li>
          <li>
            <code>pescaderia_indicadores_historial</code> — cálculos tras consultar la API.
          </li>
        </ul>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5">Validaciones JavaScript</h2>
        <div className="table-responsive">
          <table className="table table-sm table-striped align-middle mb-0">
            <thead>
              <tr>
                <th>Campo</th>
                <th>Regla</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {VALIDACIONES.map((v) => (
                <tr key={v.campo}>
                  <td>{v.campo}</td>
                  <td>{v.regla}</td>
                  <td className="small">{v.ubicacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card p-3">
        <h2 className="h5">Componentes, atributos y métodos</h2>
        <div className="table-responsive">
          <table className="table table-sm align-middle mb-0">
            <thead>
              <tr>
                <th>Clase / módulo</th>
                <th>Atributos</th>
                <th>Métodos</th>
                <th>Ruta</th>
              </tr>
            </thead>
            <tbody>
              {COMPONENTES.map((c) => (
                <tr key={c.nombre}>
                  <td className="fw-semibold">{c.nombre}</td>
                  <td className="small">{c.atributos}</td>
                  <td className="small font-monospace">{c.metodos}</td>
                  <td>
                    <Link to={c.pagina}>{c.pagina}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
