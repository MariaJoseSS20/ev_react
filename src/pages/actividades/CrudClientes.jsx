import { useEffect, useMemo, useState } from 'react';
import {
  listarClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  buscarClientePorId,
} from '../../utils/clientesStorage';
import {
  calcularEdad,
  fechaNacimientoMaxima,
  fechaNacimientoMinima,
  validarEdadRegistro,
} from '../../utils/edad';
import { formatearFechaDDMMYYYY } from '../../utils/formato';
import { validarRut, formatearRut, normalizarRut } from '../../utils/rut';

const FORM_VACIO = { nombre: '', rut: '', email: '', telefono: '', fechaNacimiento: '' };
const ERRORES_VACIO = { nombre: '', rut: '', email: '', telefono: '', fechaNacimiento: '' };

export default function CrudClientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState(ERRORES_VACIO);
  const [editId, setEditId] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [aviso, setAviso] = useState('');

  const edadRegistro = useMemo(
    () => (form.fechaNacimiento ? validarEdadRegistro(form.fechaNacimiento) : null),
    [form.fechaNacimiento]
  );

  function recargar() {
    setClientes(listarClientes());
  }

  useEffect(() => {
    recargar();
  }, []);

  useEffect(() => {
    if (!aviso) return undefined;
    const timer = setTimeout(() => setAviso(''), 3500);
    return () => clearTimeout(timer);
  }, [aviso]);

  function mostrarAviso(texto) {
    setAviso(texto);
  }

  function onChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: '' }));
  }

  function validarFormulario() {
    const nuevos = { ...ERRORES_VACIO };
    let ok = true;

    if (!form.nombre.trim() || form.nombre.trim().length < 2) {
      nuevos.nombre = 'El nombre debe tener al menos 2 caracteres.';
      ok = false;
    }

    const rutNorm = normalizarRut(form.rut);
    if (!validarRut(rutNorm)) {
      nuevos.rut = 'RUT inválido. Ejemplo: 12.345.678-5';
      ok = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nuevos.email = 'Indica un correo electrónico válido.';
      ok = false;
    }

    if (/[a-zA-Z]/.test(form.telefono)) {
      nuevos.telefono = 'El teléfono no puede contener letras.';
      ok = false;
    } else if (form.telefono.replace(/\D/g, '').length < 8) {
      nuevos.telefono = 'Teléfono inválido (mínimo 8 dígitos).';
      ok = false;
    }

    if (!form.fechaNacimiento) {
      nuevos.fechaNacimiento = 'Indica la fecha de nacimiento.';
      ok = false;
    } else {
      const edadVal = validarEdadRegistro(form.fechaNacimiento);
      if (!edadVal.ok) {
        nuevos.fechaNacimiento = edadVal.mensaje;
        ok = false;
      }
    }

    setErrores(nuevos);
    return ok;
  }

  function guardar(e) {
    e.preventDefault();
    if (!validarFormulario()) return;

    const datos = {
      nombre: form.nombre.trim(),
      rut: formatearRut(form.rut),
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      fechaNacimiento: form.fechaNacimiento,
    };

    if (editId) {
      actualizarCliente(editId, datos);
      mostrarAviso('Cliente actualizado correctamente.');
    } else {
      crearCliente(datos);
      mostrarAviso('Cliente creado correctamente.');
    }
    setForm(FORM_VACIO);
    setErrores(ERRORES_VACIO);
    setEditId(null);
    recargar();
  }

  function editar(id) {
    const c = buscarClientePorId(id);
    if (!c) return;
    setEditId(id);
    setForm({
      nombre: c.nombre,
      rut: c.rut,
      email: c.email,
      telefono: c.telefono,
      fechaNacimiento: c.fechaNacimiento || '',
    });
    setErrores(ERRORES_VACIO);
    setMostrarFormulario(true);
  }

  function borrar(id) {
    if (!window.confirm('¿Eliminar este cliente del almacenamiento local?')) return;
    eliminarCliente(id);
    if (editId === id) {
      setEditId(null);
      setForm(FORM_VACIO);
      setErrores(ERRORES_VACIO);
    }
    mostrarAviso('Cliente eliminado correctamente.');
    recargar();
  }

  function cancelarEdicion() {
    setEditId(null);
    setForm(FORM_VACIO);
    setErrores(ERRORES_VACIO);
  }

  const filas = [];
  for (let i = 0; i < clientes.length; i += 1) {
    const c = clientes[i];
    const edadCliente = calcularEdad(c.fechaNacimiento);
    filas.push(
      <tr key={c.id}>
        <td>{c.nombre}</td>
        <td className="font-monospace small text-break rut-cifrado-tabla">{c.rut}</td>
        <td>{formatearFechaDDMMYYYY(c.fechaNacimiento) || '—'}</td>
        <td>{edadCliente != null ? `${edadCliente} años` : '—'}</td>
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
      <h1 className="h3 mb-2">INGRESE SUS DATOS PARA REGISTRARSE</h1>


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
                  className={`form-control${errores.nombre ? ' is-invalid' : ''}`}
                  value={form.nombre}
                  onChange={(e) => onChange('nombre', e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  required
                  minLength={2}
                />
                <div className="invalid-feedback d-block">{errores.nombre}</div>
              </div>
              <div className="col-md-6">
                <label htmlFor="crudRut" className="form-label">
                  RUT
                </label>
                <input
                  id="crudRut"
                  type="text"
                  className={`form-control${errores.rut ? ' is-invalid' : ''}`}
                  value={form.rut}
                  onChange={(e) => onChange('rut', e.target.value)}
                  placeholder="12.345.678-5"
                  required
                />
                <div className="invalid-feedback d-block">{errores.rut}</div>
              </div>
              <div className="col-md-4">
                <label htmlFor="crudFechaNac" className="form-label">
                  Fecha de nacimiento
                </label>
                <input
                  id="crudFechaNac"
                  type="date"
                  className={`form-control${errores.fechaNacimiento ? ' is-invalid' : ''}`}
                  value={form.fechaNacimiento}
                  min={fechaNacimientoMinima()}
                  max={fechaNacimientoMaxima()}
                  onChange={(e) => onChange('fechaNacimiento', e.target.value)}
                  required
                />
                <div className="invalid-feedback d-block">{errores.fechaNacimiento}</div>
                {edadRegistro && !errores.fechaNacimiento && (
                  <p className={`small mb-0 mt-2${edadRegistro.ok ? '' : ' text-danger'}`}>
                    {edadRegistro.ok ? (
                      <>
                        Tienes <strong>{edadRegistro.edad}</strong> años
                      </>
                    ) : (
                      edadRegistro.mensaje
                    )}
                  </p>
                )}
              </div>
              <div className="col-md-4">
                <label htmlFor="crudEmail" className="form-label">
                  Correo
                </label>
                <input
                  id="crudEmail"
                  type="email"
                  className={`form-control${errores.email ? ' is-invalid' : ''}`}
                  value={form.email}
                  onChange={(e) => onChange('email', e.target.value)}
                  placeholder="cliente@correo.cl"
                  required
                />
                <div className="invalid-feedback d-block">{errores.email}</div>
              </div>
              <div className="col-md-4">
                <label htmlFor="crudTelefono" className="form-label">
                  Teléfono
                </label>
                <input
                  id="crudTelefono"
                  type="tel"
                  inputMode="tel"
                  className={`form-control${errores.telefono ? ' is-invalid' : ''}`}
                  value={form.telefono}
                  onChange={(e) => onChange('telefono', e.target.value)}
                  placeholder="+56 9 1234 5678"
                  required
                />
                <div className="invalid-feedback d-block">{errores.telefono}</div>
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
                    <th>RUT (cifrado)</th>
                    <th>Fecha nac.</th>
                    <th>Edad</th>
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

      {aviso && (
        <div className="crud-aviso-toast alert alert-success shadow-sm mb-0 py-2 px-3" role="alert">
          {aviso}
        </div>
      )}
    </main>
  );
}
