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
        src="https://images.unsplash.com/photo-1588168333986-5078d3ae3946?auto=format&fit=crop&w=900&q=80"
        alt="Pescadería y productos del mar"
        className="img-fluid rounded mb-3"
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
