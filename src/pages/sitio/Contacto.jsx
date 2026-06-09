import { useRef } from 'react';

export default function Contacto() {
  const toastRef = useRef(null);

  function mostrarToast(mensaje) {
    const el = toastRef.current;
    if (!el || !window.bootstrap) return;
    const body = el.querySelector('.toast-body');
    if (body) body.textContent = mensaje;
    window.bootstrap.Toast.getOrCreateInstance(el).show();
  }

  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Contacto</h1>
      <div className="row g-4">
        <div className="col-lg-6">
          <section className="card p-3">
            <h2 className="h5">Formulario simple</h2>
            <form
              id="formContacto"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                if (!form.checkValidity()) {
                  form.reportValidity();
                  return;
                }
                mostrarToast('Formulario válido. Gracias por tu mensaje.');
                form.reset();
              }}
            >
              <div className="mb-3">
                <label className="form-label" htmlFor="contactoNombre">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="contactoNombre"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="contactoEmail">
                  Correo
                </label>
                <input type="email" className="form-control" id="contactoEmail" required maxLength={254} />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="contactoTelefono">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="contactoTelefono"
                  required
                  placeholder="+56 9 0000 0000"
                  maxLength={20}
                />
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="contactoMensaje">
                  Mensaje
                </label>
                <textarea
                  className="form-control"
                  id="contactoMensaje"
                  rows={4}
                  required
                  minLength={5}
                  maxLength={1000}
                />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="contactoPrivacidad" required />
                <label className="form-check-label" htmlFor="contactoPrivacidad">
                  Acepto uso básico de datos.
                </label>
              </div>
              <button type="submit" className="btn btn-success">
                Enviar
              </button>
            </form>
          </section>
        </div>
        <div className="col-lg-6">
          <section className="card p-3">
            <h2 className="h5">Ubicación</h2>
            <iframe
              title="Pescadería Donde Chifla en el mapa"
              className="rounded w-100"
              height={450}
              style={{ border: 0 }}
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2384.0424956453817!2d-70.36494170000005!3d-53.30668519999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xbdb2f1cf17588dbf%3A0x3d2e1298e0bb088!2sPescader%C3%ADa%20Donde%20Chifla!5e0!3m2!1ses-419!2scl!4v1778004818727!5m2!1ses-419!2scl"
            />
          </section>
          <section className="mt-3 card p-3">
            <h3 className="h6">Horario</h3>
            <p className="mb-0 small">Lunes a sábado: 9:00 a 20:00.</p>
          </section>
        </div>
      </div>

      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1090 }}>
        <div
          ref={toastRef}
          className="toast align-items-center text-bg-success border-0 shadow"
          role="alert"
          aria-live="polite"
          data-bs-delay={5500}
        >
          <div className="d-flex">
            <div className="toast-body fw-medium text-white" />
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Cerrar"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
