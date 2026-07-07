import { useState } from 'react';
import FrameworkPanel from '../../components/ui/FrameworkPanel';
import '../../styles/terminos.css';

const TEXTO_TERMINOS = [
  'Los precios publicados son referenciales y pueden variar según disponibilidad del día. La confirmación del pedido se realiza por los canales indicados en el sitio (WhatsApp, Facebook o contacto directo).',
  'Al usar este sitio aceptas el tratamiento básico de tus datos de contacto únicamente para gestionar tu pedido o consulta.',
  'Los productos pesables pueden presentar variación de peso; el precio final se confirma al momento del retiro o despacho.',
];

const PESTANAS = [
  { id: 'bootstrap', etiqueta: 'Bootstrap' },
  { id: 'materialize', etiqueta: 'Materialize' },
  { id: 'bulma', etiqueta: 'Bulma' },
];

const MATERIALIZE_CSS = [`${process.env.PUBLIC_URL}/css/materialize.min.css`];
const BULMA_CSS = [`${process.env.PUBLIC_URL}/css/bulma.min.css`];

function PanelBootstrap() {
  return (
    <div className="terminos-bootstrap">
      <div className="card border-success border-opacity-25 shadow-sm">
        <div className="card-header bg-success bg-opacity-10 fw-semibold text-success-emphasis">
          Bootstrap 5
        </div>
        <div className="card-body">
          {TEXTO_TERMINOS.map((p) => (
            <p key={p.slice(0, 24)} className="card-text">
              {p}
            </p>
          ))}
          <button type="button" className="btn btn-outline-success btn-sm" disabled>
            Acepto los términos
          </button>
        </div>
      </div>
    </div>
  );
}

function PanelMaterialize() {
  return (
    <FrameworkPanel cssHrefs={MATERIALIZE_CSS}>
      <div className="section" style={{ padding: '0.5rem 0' }}>
        <div className="card">
          <div className="card-content">
            <span className="card-title">Materialize CSS</span>
            {TEXTO_TERMINOS.map((p) => (
              <p key={`m-${p.slice(0, 18)}`}>{p}</p>
            ))}
          </div>
          <div className="card-action">
            <button type="button" className="btn waves-effect waves-light teal" disabled>
              Acepto los términos
            </button>
          </div>
        </div>
      </div>
    </FrameworkPanel>
  );
}

function PanelBulma() {
  return (
    <FrameworkPanel cssHrefs={BULMA_CSS}>
      <article className="message is-info">
        <div className="message-header">
          <p>Bulma</p>
        </div>
        <div className="message-body">
          {TEXTO_TERMINOS.map((p) => (
            <p key={`b-${p.slice(0, 18)}`}>{p}</p>
          ))}
          <button type="button" className="button is-info is-light mt-3" disabled>
            Acepto los términos
          </button>
        </div>
      </article>
    </FrameworkPanel>
  );
}

export default function Terminos() {
  const [activa, setActiva] = useState('bootstrap');

  return (
    <main className="container py-4 terminos-page">
      <h1 className="h3 mb-2">Términos y condiciones</h1>
      <p className="text-muted small mb-4">
        El mismo contenido legal se presenta con Bootstrap (sitio global), Materialize CSS y Bulma.
        Materialize y Bulma se cargan desde sus paquetes npm dentro de un Shadow DOM para no
        interferir con Bootstrap en el resto de la aplicación.
      </p>

      <div className="terminos-tabs" role="tablist" aria-label="Estilos de términos">
        {PESTANAS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activa === tab.id}
            className={`terminos-tab${activa === tab.id ? ' active' : ''}`}
            onClick={() => setActiva(tab.id)}
          >
            {tab.etiqueta}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {activa === 'bootstrap' && <PanelBootstrap />}
        {activa === 'materialize' && <PanelMaterialize />}
        {activa === 'bulma' && <PanelBulma />}
      </div>
    </main>
  );
}
