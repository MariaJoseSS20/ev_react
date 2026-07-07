import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

export default function ModalConfirmacion({
  id,
  titulo,
  mensaje,
  visible,
  onCerrar,
  onConfirmar,
  textoConfirmar = 'Confirmar',
  variante = 'primary',
  mostrarCancelar = true,
}) {
  const ref = useRef(null);
  const instancia = useRef(null);
  const onCerrarRef = useRef(onCerrar);
  const onConfirmarRef = useRef(onConfirmar);

  onCerrarRef.current = onCerrar;
  onConfirmarRef.current = onConfirmar;

  useEffect(() => {
    if (!ref.current) return undefined;
    instancia.current = Modal.getOrCreateInstance(ref.current, { backdrop: 'static' });
    const alOcultar = () => onCerrarRef.current?.();
    ref.current.addEventListener('hidden.bs.modal', alOcultar);
    return () => ref.current?.removeEventListener('hidden.bs.modal', alOcultar);
  }, []);

  useEffect(() => {
    if (!instancia.current) return;
    if (visible) instancia.current.show();
    else instancia.current.hide();
  }, [visible]);

  function cerrar() {
    onCerrarRef.current?.();
  }

  function confirmar() {
    onConfirmarRef.current?.();
    cerrar();
  }

  return (
    <div className="modal fade" id={id} ref={ref} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id={`${id}Label`}>
              {titulo}
            </h2>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={cerrar} />
          </div>
          <div className="modal-body">{mensaje}</div>
          <div className="modal-footer">
            {mostrarCancelar && (
              <button type="button" className="btn btn-outline-secondary" onClick={cerrar}>
                Cancelar
              </button>
            )}
            <button type="button" className={`btn btn-${variante}`} onClick={confirmar}>
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
