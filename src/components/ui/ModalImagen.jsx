import { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

export default function ModalImagen({ id, src, titulo, visible, onCerrar }) {
  const ref = useRef(null);
  const instancia = useRef(null);
  const onCerrarRef = useRef(onCerrar);

  onCerrarRef.current = onCerrar;

  useEffect(() => {
    if (!ref.current) return undefined;
    instancia.current = Modal.getOrCreateInstance(ref.current);
    const alOcultar = () => onCerrarRef.current?.();
    ref.current.addEventListener('hidden.bs.modal', alOcultar);
    return () => ref.current?.removeEventListener('hidden.bs.modal', alOcultar);
  }, []);

  useEffect(() => {
    if (!instancia.current) return;
    if (visible) instancia.current.show();
    else instancia.current.hide();
  }, [visible]);

  if (!src) return null;

  return (
    <div className="modal fade" id={id} ref={ref} tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title h5" id={`${id}Label`}>
              {titulo}
            </h2>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={() => onCerrarRef.current?.()} />
          </div>
          <div className="modal-body p-2 p-md-3 text-center bg-light">
            <img src={src} alt={titulo} className="img-fluid rounded shadow-sm producto-modal-img" />
          </div>
        </div>
      </div>
    </div>
  );
}
