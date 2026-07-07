import { useEffect, useState } from 'react';
import {
  listarProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../../utils/productosStorage';
import ModalConfirmacion from '../../components/ui/ModalConfirmacion';
import ModalImagen from '../../components/ui/ModalImagen';
import { clp } from '../../utils/formato';

const FORM_VACIO = {
  sku: '',
  nombre: '',
  precio: '',
  categoria: 'pescado',
  imagen: '',
};
const ERRORES_VACIO = { sku: '', nombre: '', precio: '', imagen: '' };

function esUrlImagenValida(url) {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function CrudProductos() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [errores, setErrores] = useState(ERRORES_VACIO);
  const [editId, setEditId] = useState(null);
  const [aviso, setAviso] = useState('');
  const [idEliminar, setIdEliminar] = useState(null);
  const [imagenVer, setImagenVer] = useState(null);
  const [previewFormOk, setPreviewFormOk] = useState(true);

  function recargar() {
    setProductos(listarProductos());
  }

  useEffect(() => {
    recargar();
  }, []);

  useEffect(() => {
    if (!aviso) return undefined;
    const t = setTimeout(() => setAviso(''), 3500);
    return () => clearTimeout(t);
  }, [aviso]);

  function onChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => ({ ...prev, [campo]: '' }));
    if (campo === 'imagen') setPreviewFormOk(true);
  }

  function validar() {
    const nuevos = { ...ERRORES_VACIO };
    let ok = true;
    if (!form.sku.trim()) {
      nuevos.sku = 'Indica el SKU.';
      ok = false;
    }
    if (!form.nombre.trim()) {
      nuevos.nombre = 'Indica el nombre del producto.';
      ok = false;
    }
    if (!form.precio || Number(form.precio) <= 0) {
      nuevos.precio = 'Precio debe ser mayor a 0.';
      ok = false;
    }
    if (!form.imagen.trim()) {
      nuevos.imagen = 'Indica la URL de la imagen.';
      ok = false;
    } else if (!esUrlImagenValida(form.imagen)) {
      nuevos.imagen = 'La URL debe comenzar con http:// o https://.';
      ok = false;
    }
    setErrores(nuevos);
    return ok;
  }

  function guardar(e) {
    e.preventDefault();
    if (!validar()) return;

    const datos = { ...form };
    if (editId) {
      actualizarProducto(editId, datos);
      setAviso('Producto actualizado.');
    } else {
      crearProducto(datos);
      setAviso('Producto creado.');
    }
    setForm(FORM_VACIO);
    setEditId(null);
    recargar();
  }

  function editar(p) {
    setEditId(p.id);
    setForm({
      sku: p.sku,
      nombre: p.nombre,
      precio: String(p.precio),
      categoria: p.categoria,
      imagen: p.imagen,
    });
    setErrores(ERRORES_VACIO);
  }

  function confirmarEliminar() {
    if (idEliminar == null) return;
    eliminarProducto(idEliminar);
    if (editId === idEliminar) {
      setEditId(null);
      setForm(FORM_VACIO);
    }
    setAviso('Producto eliminado.');
    recargar();
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">CRUD de productos</h1>
      <p className="text-muted small">
        Gestión del catálogo de productos.
      </p>

      <section className="card p-3 mb-4">
        <h2 className="h5">{editId ? 'Editar producto' : 'Nuevo producto'}</h2>
        <form onSubmit={guardar} noValidate>
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="prodSku" className="form-label">
                SKU
              </label>
              <input
                id="prodSku"
                className={`form-control${errores.sku ? ' is-invalid' : ''}`}
                value={form.sku}
                onChange={(e) => onChange('sku', e.target.value)}
              />
              <div className="invalid-feedback d-block">{errores.sku}</div>
            </div>
            <div className="col-md-5">
              <label htmlFor="prodNombre" className="form-label">
                Nombre
              </label>
              <input
                id="prodNombre"
                className={`form-control${errores.nombre ? ' is-invalid' : ''}`}
                value={form.nombre}
                onChange={(e) => onChange('nombre', e.target.value)}
              />
              <div className="invalid-feedback d-block">{errores.nombre}</div>
            </div>
            <div className="col-md-2">
              <label htmlFor="prodPrecio" className="form-label">
                Precio
              </label>
              <input
                id="prodPrecio"
                type="number"
                min="1"
                className={`form-control${errores.precio ? ' is-invalid' : ''}`}
                value={form.precio}
                onChange={(e) => onChange('precio', e.target.value)}
              />
              <div className="invalid-feedback d-block">{errores.precio}</div>
            </div>
            <div className="col-md-2">
              <label htmlFor="prodCat" className="form-label">
                Categoría
              </label>
              <select
                id="prodCat"
                className="form-select"
                value={form.categoria}
                onChange={(e) => onChange('categoria', e.target.value)}
              >
                <option value="pescado">Pescado</option>
                <option value="marisco">Marisco</option>
              </select>
            </div>
            <div className="col-12">
              <label htmlFor="prodImg" className="form-label">
                URL imagen
              </label>
              <input
                id="prodImg"
                type="url"
                className={`form-control${errores.imagen ? ' is-invalid' : ''}`}
                value={form.imagen}
                onChange={(e) => onChange('imagen', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              <div className="invalid-feedback d-block">{errores.imagen}</div>
              {form.imagen.trim() && (
                <div className="mt-2">
                  {previewFormOk ? (
                    <img
                      src={form.imagen.trim()}
                      alt="Vista previa"
                      className="producto-preview-img rounded border"
                      onError={() => setPreviewFormOk(false)}
                    />
                  ) : (
                    <p className="small text-muted mb-0">Vista previa no disponible.</p>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="mt-3 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {editId ? 'Actualizar' : 'Crear'}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm(FORM_VACIO);
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card p-3">
        <h2 className="h5 mb-3">Listado ({productos.length})</h2>
        <div className="table-responsive">
          <table className="table table-sm table-striped align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>SKU</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary producto-thumb-btn"
                      onClick={() => setImagenVer({ url: p.imagen, nombre: p.nombre })}
                      aria-label={`Ver imagen de ${p.nombre}`}
                      title="Ver imagen"
                    >
                      <img
                        src={p.imagen}
                        alt=""
                        className="producto-list-thumb"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('d-none');
                        }}
                      />
                      <span className="producto-thumb-icon d-none" aria-hidden="true">
                        🖼
                      </span>
                    </button>
                  </td>
                  <td>{p.sku}</td>
                  <td>{p.nombre}</td>
                  <td>{clp(p.precio)}</td>
                  <td>{p.categoria === 'pescado' ? 'Pescado' : 'Marisco'}</td>
                  <td className="text-end text-nowrap">
                    <button type="button" className="btn btn-sm btn-outline-primary me-1" onClick={() => editar(p)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setIdEliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {aviso && (
        <div className="crud-aviso-toast alert alert-success shadow-sm mb-0 py-2 px-3" role="alert">
          {aviso}
        </div>
      )}

      <ModalImagen
        id="modalVerImagenProducto"
        src={imagenVer?.url}
        titulo={imagenVer?.nombre || 'Imagen del producto'}
        visible={imagenVer != null}
        onCerrar={() => setImagenVer(null)}
      />

      <ModalConfirmacion
        id="modalEliminarProducto"
        titulo="Eliminar producto"
        mensaje="¿Eliminar este producto?"
        visible={idEliminar != null}
        onCerrar={() => setIdEliminar(null)}
        onConfirmar={confirmarEliminar}
        textoConfirmar="Eliminar"
        variante="danger"
      />
    </main>
  );
}
