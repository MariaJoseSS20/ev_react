export default function Alcance() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Alcance del proyecto</h1>
      <div className="card p-3">
        <p>
          SPA en React para la Pescadería &quot;Donde Chifla&quot;: catálogo y pedido en línea,
          gestión de clientes con CRUD en localStorage (RUT cifrado con AES), conversión de
          indicadores económicos vía API mindicador.cl y documentación del sistema.
        </p>
        <ul>
          <li>Actividad 1: validaciones, RUT, CRUD y cifrado del RUT con crypto-js.</li>
          <li>Actividad 2: API externa y cálculos en pesos chilenos.</li>
          <li>Actividad 3: diagrama de clases y casos de uso.</li>
        </ul>
      </div>
    </main>
  );
}
