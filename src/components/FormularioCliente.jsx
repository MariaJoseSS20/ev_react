export default function FormularioCliente({ children }) {
  return (
    <>
      <div className="venta-bloque-cliente">
        <h2 className="h5 mb-1">Datos cliente</h2>
        <div className="mb-2">
          <label htmlFor="clienteNombre" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            id="clienteNombre"
            className="form-control"
            required
            minLength={2}
            maxLength={60}
          />
          <div className="invalid-feedback">Usa al menos 2 caracteres para el nombre.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="clienteEmail" className="form-label">
            Correo
          </label>
          <input type="email" id="clienteEmail" className="form-control" required maxLength={254} />
          <div className="invalid-feedback">Indica un correo válido.</div>
        </div>
        <p className="mb-1 fw-semibold">Tipo de cliente</p>
        <div className="mb-2 d-flex flex-wrap gap-3">
          <div className="form-check form-check-inline mb-0">
            <input
              className="form-check-input"
              type="radio"
              name="tipo_cliente"
              id="tc_persona"
              value="persona"
              required
            />
            <label className="form-check-label" htmlFor="tc_persona">
              Persona
            </label>
          </div>
          <div className="form-check form-check-inline mb-0">
            <input
              className="form-check-input"
              type="radio"
              name="tipo_cliente"
              id="tc_empresa"
              value="empresa"
            />
            <label className="form-check-label" htmlFor="tc_empresa">
              Empresa
            </label>
          </div>
        </div>
      </div>

      {children}

      <p className="mb-1 mt-3 fw-semibold">Retiro o envío</p>
      <div className="mb-3 d-flex flex-wrap gap-3">
        <div className="form-check form-check-inline mb-0">
          <input className="form-check-input" type="radio" name="despacho" id="d_retiro" value="retiro" required />
          <label className="form-check-label" htmlFor="d_retiro">
            Retiro en tienda
          </label>
        </div>
        <div className="form-check form-check-inline mb-0">
          <input className="form-check-input" type="radio" name="despacho" id="d_envio" value="envio" />
          <label className="form-check-label" htmlFor="d_envio">
            Envío
          </label>
        </div>
      </div>

      <div className="form-check mb-3">
        <input className="form-check-input" type="checkbox" id="aceptaTerminosVenta" required />
        <label className="form-check-label" htmlFor="aceptaTerminosVenta">
          Acepto los términos y condiciones
        </label>
        <div className="invalid-feedback">Debes aceptar los términos para continuar.</div>
      </div>

      <button className="btn btn-success" type="submit">
        Confirmar pedido
      </button>
    </>
  );
}
