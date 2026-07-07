export default function QuienesSomos() {
  return (
    <main className="container py-4">
      <h1 className="h3 mb-3">Quiénes somos</h1>
      <div className="card p-3 mb-3">
        <h2 className="h5">Misión</h2>
        <p className="mb-0">
          Acercar productos del mar frescos y seleccionados, con atención cercana, información clara y
          una experiencia de compra simple.
        </p>
      </div>
      <img
        src="https://plus.unsplash.com/premium_photo-1663040295966-8ae70c5b93c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Pescadería y productos del mar"
        className="img-fluid rounded mb-3"
        loading="lazy"
      />
      <div className="card p-3">
        <h2 className="h5">Visión</h2>
        <p className="mb-0">
          Consolidarnos como una pescadería local referente en calidad, confianza y cumplimiento en
          cada pedido.
        </p>
      </div>
    </main>
  );
}
