import { textoPedido } from '../utils/carrito';

export default function CompartirPedido({ carrito }) {
  function compartirWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(textoPedido(carrito))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function compartirFacebook() {
    const base = window.location.origin;
    const params = new URLSearchParams({
      u: base,
      quote: textoPedido(carrito),
    });
    window.open(`https://www.facebook.com/sharer/sharer.php?${params}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="card venta-bloque-finalizar-pedido border-0 shadow-sm p-3">
      <h2 className="h5 mb-2">¡Comparte tu pedido!</h2>
      <div className="d-grid gap-2">
        <button type="button" className="btn btn-success btn-sm" onClick={compartirWhatsApp}>
          WhatsApp
        </button>
        <button type="button" className="btn btn-primary btn-sm" onClick={compartirFacebook}>
          Facebook
        </button>
      </div>
    </section>
  );
}
