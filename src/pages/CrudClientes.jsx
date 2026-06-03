import { useEffect, useState } from 'react';
import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientePorId,
} from '../utils/clientesStorage';
import { validarRut, formatearRut, normalizarRut } from '../utils/rut';

const FORM_VACIO = { nombre: '', rut: '', email: '', telefono: '' };

export default function CrudClientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [editId, setEditId] = useState(null);
  const [rutError, setRutError] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [mensaje, setMensaje] = useState('');

  function recargar() {
    setClientes(listarClientes());
  }

  useEffect(() => {
    recargar();
  }, []);

  function onChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (campo === 'rut') setRutError('');
  }

  function validarFormulario() {
    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      setMensaje('El nombre debe tener al menos 2 caracteres.');
      return false;
    }
    const rutNorm = normalizarRut(form.rut);
    if (!validarRut(rutNorm)) {
      setRutError('RUT inválido. Ejemplo: 12.345.678-5');
      setMensaje('Revisa el RUT ingresado.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMensaje('Correo electrónico inválido.');
      return false;
    }
    if (!form.telefono.trim() || form.telefono.trim().length < 8) {
      setMensaje('Teléfono inválido (mínimo 8 caracteres).');
      return false;
    }
    setRutError('');
    setMensaje('');
    return true;
  }

  function guardar(e) {
    e.preventDefault();
    if (!validarFormulario()) return;

    const datos = {
      nombre: form.nombre.trim(),
      rut: formatearRut(form.rut),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
    };

    if (editId) {
      actualizarCliente(editId, datos);
      setMensaje('Cliente actualizado en localStorage.');
    } else {
      crearCliente(datos);
      setMensaje('Cliente creado en localStorage.');
    }
    setForm(FORM_VACIO);
    setEditId(null);
    recargar();
  }

  function editar(id) {
    const c = buscarClientePorId(id);
    if (!c) return;
    setEditId(id);
    setForm({ nombre: c.nombre, rut: c.rut, email: c.email, telefono: c.telefono });
    setMostrarFormulario(true);
    setMensaje('Modo edición: actualiza los datos y guarda.');
  }

  function borrar(id) {
    if (!window.confirm('¿Eliminar este cliente del almacenamiento local?')) return;
    eliminarCliente(id);
    if (editId === id) {
      setEditId(null);
      setForm(FORM_VACIO);
    }
    setMensaje('Cliente eliminado.');
    recargar();
  }

  function cancelarEdicion() {
    setEditId(null);
    setForm(FORM_VACIO);
    setRutError('');
    setMensaje('');
  }

  const filas = [];
  for (let i = 0; i < clientes.length; i += 1) {
    const c = clientes[i];
    filas.push(
      <tr key={c.id}>
        <td>{c.nombre}</td>
        <td className="font-monospace small">{c.rut}</td>
        <td>{c.email}</td>
        <td>{c.telefono}</td>
        <td className="text-end text-nowrap">
          <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => editar(c.id)}>
            Editar
          </button>
          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => borrar(c.id)}>
            Eliminar
          </button>
        </td>
      </tr>
    );
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-2">CRUD de clientes (Actividad 1)</h1>
      <p className="text-muted small mb-4">
        Create, Read, Update y Delete con <code>localStorage</code>, validación de RUT y paneles que
        se muestran u ocultan con JavaScript (React).
      </p>

      <div className="d-flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setMostrarFormulario((v) => !v)}
        >
          {mostrarFormulario ? 'Ocultar' : 'Mostrar'} formulario
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setMostrarTabla((v) => !v)}
        >
          {mostrarTabla ? 'Ocultar' : 'Mostrar'} tabla
        </button>
      </div>

      {mensaje && (
        <div className="alert alert-info py-2" role="status">
          {mensaje}
        </div>
      )}

      <div id="panelFormulario" className={mostrarFormulario ? '' : 'd-none'}>
        <section className="card p-3 mb-4">
          <h2 className="h5">{editId ? 'Editar cliente' : 'Nuevo cliente'}</h2>
          <form onSubmit={guardar} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="crudNombre" className="form-label">
                  Nombre
                </label>
                <input
                  id="crudNombre"
                  type="text"
                  className="form-control"
                  value={form.nombre}
                  onChange={(e) => onChange('nombre', e.target.value)}
                  required
                  minLength={2}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="crudRut" className="form-label">
                  RUT
                </label>
                <input
                  id="crudRut"
                  type="text"
                  className={`form-control${rutError ? ' is-invalid' : ''}`}
                  value={form.rut}
                  onChange={(e) => onChange('rut', e.target.value)}
                  placeholder="12.345.678-5"
                  required
                />
                <div className="invalid-feedback d-block">{rutError}</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="crudEmail" className="form-label">
                  Correo
                </label>
                <input
                  id="crudEmail"
                  type="email"
                  className="form-control"
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="crudTelefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="crudTelefono"
                  type="tel"
                  className="form-control"
                  value={form.telefono}
                  onChange={(e) => onChange('telefono', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mt-3 d-flex gap-2">
              <button type="submit" className="btn btn-success">
                {editId ? 'Actualizar' : 'Crear'}
              </button>
              {editId && (
                <button type="button" className="btn btn-outline-secondary" onClick={cancelarEdicion}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>
      </div>

      <div id="panelTabla" className={mostrarTabla ? '' : 'd-none'}>
        <section className="card p-3">
          <h2 className="h5 mb-3">Listado ({clientes.length})</h2>
          {clientes.length === 0 ? (
            <p className="text-muted mb-0">No hay registros. Crea el primero con el formulario.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm table-striped align-middle">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>{filas}</tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
