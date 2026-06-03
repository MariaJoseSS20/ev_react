import { useEffect, useMemo, useState } from 'react';
import { calcularEdad, descripcionEdad } from '../utils/edad';
import {
  cifrarTexto,
  descifrarTexto,
  listarMensajesCifrados,
  guardarMensajeCifrado,
  eliminarMensajeCifrado,
} from '../utils/cifrado';
import { Link } from 'react-router-dom';

export default function Laboratorio() {
  const [fechaNac, setFechaNac] = useState('');
  const edad = useMemo(() => calcularEdad(fechaNac), [fechaNac]);
  const [textoPlano, setTextoPlano] = useState('');
  const [textoCifrado, setTextoCifrado] = useState('');
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(true);

  function recargarHistorial() {
    setHistorial(listarMensajesCifrados());
  }

  useEffect(() => {
    recargarHistorial();
  }, []);

  function cifrarYGuardar() {
    if (!textoPlano.trim()) return;
    const cifrado = cifrarTexto(textoPlano);
    setTextoCifrado(cifrado);
    guardarMensajeCifrado(textoPlano, cifrado);
    recargarHistorial();
  }

  function descifrarMostrar() {
    if (!textoCifrado.trim()) return;
    setTextoPlano(descifrarTexto(textoCifrado));
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Laboratorio (Actividad 3)</h1>

      <section className="card p-3 mb-4">
        <h2 className="h5 mb-2">Diagrama de clases</h2>
        <p className="small text-muted mb-2">
          Consulta el diagrama actualizado del sistema en la sección de documentación.
        </p>
        <Link to="/diagrama-clases" className="btn btn-outline-primary btn-sm">
          Ver diagrama de clases
        </Link>
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5 mb-3">Algoritmo: calcular edad</h2>
        <p className="small text-muted">
          Elige la fecha de nacimiento en el calendario; la edad se calcula al instante con el
          algoritmo (años cumplidos según mes y día respecto a hoy).
        </p>
        <div className="col-md-6 col-lg-5 px-0">
          <label htmlFor="fechaNacimiento" className="form-label">
            Fecha de nacimiento
          </label>
          <input
            id="fechaNacimiento"
            type="date"
            className="form-control"
            value={fechaNac}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setFechaNac(e.target.value)}
          />
        </div>
        {fechaNac && (
          <p className="mt-3 mb-0">
            {edad === null ? (
              <span className="text-danger">Fecha inválida o futura.</span>
            ) : (
              <>
                Edad: <strong>{descripcionEdad(edad)}</strong>
              </>
            )}
          </p>
        )}
      </section>

      <section className="card p-3 mb-4">
        <h2 className="h5 mb-3">Cifrado y localStorage</h2>
        <p className="small text-muted mb-3">
          Método César (desplazamiento 5). Al cifrar, el texto se guarda en{' '}
          <code>localStorage</code> para recuperarlo después.
        </p>
        <div className="mb-3">
          <label htmlFor="textoEntrada" className="form-label">
            Texto original
          </label>
          <textarea
            id="textoEntrada"
            className="form-control"
            rows={3}
            value={textoPlano}
            onChange={(e) => setTextoPlano(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="textoCifrado" className="form-label">
            Texto cifrado
          </label>
          <textarea
            id="textoCifrado"
            className="form-control font-monospace"
            rows={3}
            value={textoCifrado}
            onChange={(e) => setTextoCifrado(e.target.value)}
          />
        </div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          <button type="button" className="btn btn-success" onClick={cifrarYGuardar}>
            Cifrar y guardar
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={descifrarMostrar}>
            Descifrar a original
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => setMostrarHistorial((v) => !v)}
          >
            {mostrarHistorial ? 'Ocultar' : 'Mostrar'} historial guardado
          </button>
        </div>

        <div id="panelHistorialCifrado" className={mostrarHistorial ? '' : 'd-none'}>
          {historial.length === 0 ? (
            <p className="text-muted small mb-0">Sin registros en localStorage.</p>
          ) : (
            <ul className="list-group">
              {historial.map((m) => (
                <li key={m.id} className="list-group-item">
                  <div className="d-flex justify-content-between align-items-start gap-2">
                    <div className="small">
                      <div>
                        <strong>Original:</strong> {m.entrada}
                      </div>
                      <div className="font-monospace text-break">
                        <strong>Cifrado:</strong> {m.cifrado}
                      </div>
                      <div className="text-muted">{new Date(m.fecha).toLocaleString('es-CL')}</div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger flex-shrink-0"
                      onClick={() => {
                        eliminarMensajeCifrado(m.id);
                        recargarHistorial();
                      }}
                    >
                      Borrar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
