import { useEffect, useState } from 'react';
import { obtenerIndicador, convertirAPesos } from '../../utils/indicadores';
import {
  guardarConsultaIndicadores,
  listarHistorialIndicadores,
  eliminarConsultaIndicador,
} from '../../utils/indicadoresStorage';
import { clp, formatearFechaDDMMYYYY } from '../../utils/formato';

const INDICADORES = [
  { codigo: 'uf', etiqueta: 'UF', ayuda: 'Unidad de Fomento' },
  { codigo: 'euro', etiqueta: 'Euro', ayuda: 'Euro' },
  { codigo: 'utm', etiqueta: 'UTM', ayuda: 'Unidad Tributaria Mensual' },
];

export default function Indicadores() {
  const [valores, setValores] = useState({});
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [cantidad, setCantidad] = useState('1');
  const [resultados, setResultados] = useState([]);
  const [historial, setHistorial] = useState([]);

  function recargarHistorial() {
    setHistorial(listarHistorialIndicadores());
  }

  useEffect(() => {
    recargarHistorial();
  }, []);

  useEffect(() => {
    let activo = true;
    async function cargar() {
      setCargando(true);
      setError('');
      try {
        const datos = {};
        for (let i = 0; i < INDICADORES.length; i += 1) {
          const item = INDICADORES[i];
          datos[item.codigo] = await obtenerIndicador(item.codigo);
        }
        if (activo) setValores(datos);
      } catch (err) {
        if (activo) setError(err.message || 'Error al consultar la API.');
      } finally {
        if (activo) setCargando(false);
      }
    }
    cargar();
    return () => {
      activo = false;
    };
  }, []);

  function calcular() {
    const lista = [];
    for (let i = 0; i < INDICADORES.length; i += 1) {
      const item = INDICADORES[i];
      const info = valores[item.codigo];
      const pesos = convertirAPesos(info?.valor, cantidad);
      lista.push({
        etiqueta: item.etiqueta,
        valorUnitario: info?.valor,
        pesos,
        unidad: info?.unidad,
      });
    }
    setResultados(lista);
    guardarConsultaIndicadores({
      cantidad,
      resultados: lista,
      valoresApi: valores,
    });
    recargarHistorial();
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-2">Indicadores económicos</h1>
      <p className="text-muted small mb-3">
        Datos desde{' '}
        <a href="https://www.mindicador.cl/" target="_blank" rel="noopener noreferrer">
          mindicador.cl
        </a>
        .
      </p>

      {cargando && <p className="text-muted">Cargando indicadores…</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!cargando && !error && (
        <>
          <div className="row g-3 mb-4">
            {INDICADORES.map((item) => {
              const info = valores[item.codigo];
              return (
                <div key={item.codigo} className="col-md-4">
                  <div className="card p-3 h-100">
                    <h2 className="h6 mb-1">{item.etiqueta}</h2>
                    <p className="small text-muted mb-2">{item.ayuda}</p>
                    <p className="mb-0 fw-semibold">
                      {info?.valor != null ? clp(info.valor) : '—'}
                      <span className="small fw-normal text-muted"> / {info?.unidad}</span>
                    </p>
                    {info?.fecha && (
                      <p className="small text-muted mb-0 mt-1">
                        Fecha: {formatearFechaDDMMYYYY(info.fecha)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <section className="card p-3 mb-4">
            <h2 className="h5 mb-3">Calculadora</h2>
            <div className="row g-3 align-items-end">
              <div className="col-sm-6 col-md-4">
                <label htmlFor="cantIndicador" className="form-label">
                  Cantidad (UF, euro o UTM)
                </label>
                <input
                  id="cantIndicador"
                  type="number"
                  className="form-control"
                  min="0.01"
                  step="0.01"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </div>
              <div className="col-sm-6 col-md-4">
                <button type="button" className="btn btn-success w-100" onClick={calcular}>
                  Calcular en pesos
                </button>
              </div>
            </div>

            {resultados.length > 0 && (
              <ul className="list-group list-group-flush mt-4">
                {resultados.map((r) => (
                  <li key={r.etiqueta} className="list-group-item d-flex justify-content-between">
                    <span>
                      {cantidad} {r.etiqueta} × {r.valorUnitario != null ? clp(r.valorUnitario) : '—'}
                    </span>
                    <strong>{r.pesos != null ? clp(r.pesos) : 'Dato no disponible'}</strong>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="card p-3">
            <h2 className="h5 mb-3">Historial de consultas</h2>
            {historial.length === 0 ? (
              <p className="text-muted mb-0">Aún no hay cálculos guardados.</p>
            ) : (
              <ul className="list-group list-group-flush">
                {historial.map((h) => (
                  <li key={h.id} className="list-group-item d-flex justify-content-between align-items-start gap-2">
                    <div>
                      <strong>{formatearFechaDDMMYYYY(h.fecha)}</strong> — cantidad {h.cantidad}
                      <ul className="small mb-0 mt-1">
                        {h.resultados.map((r) => (
                          <li key={`${h.id}-${r.etiqueta}`}>
                            {r.etiqueta}: {r.pesos != null ? clp(r.pesos) : '—'}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        eliminarConsultaIndicador(h.id);
                        recargarHistorial();
                      }}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </main>
  );
}
