import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Monta contenido con CSS de un framework dentro de Shadow DOM
 * para no interferir con Bootstrap en el resto del sitio.
 */
export default function FrameworkPanel({ cssHrefs, wrapperClassName = '', children }) {
  const hostRef = useRef(null);
  const [mountEl, setMountEl] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || host.shadowRoot) return undefined;

    const shadow = host.attachShadow({ mode: 'open' });
    cssHrefs.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      shadow.appendChild(link);
    });

    const wrapper = document.createElement('div');
    if (wrapperClassName) wrapper.className = wrapperClassName;
    shadow.appendChild(wrapper);
    setMountEl(wrapper);

    return undefined;
  }, [cssHrefs, wrapperClassName]);

  return (
    <div ref={hostRef} className="terminos-framework-host">
      {mountEl && createPortal(children, mountEl)}
    </div>
  );
}
