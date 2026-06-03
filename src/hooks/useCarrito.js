import { useCallback, useState } from 'react';

export function useCarrito() {
  const [carrito, setCarrito] = useState([]);

  const agregar = useCallback((id, cant) => {
    setCarrito((prev) => {
      const existe = prev.find((l) => l.productoId === id);
      if (existe) {
        return prev.map((l) =>
          l.productoId === id ? { ...l, cantidad: l.cantidad + cant } : l
        );
      }
      return [...prev, { productoId: id, cantidad: cant }];
    });
  }, []);

  const quitar = useCallback((id) => {
    setCarrito((prev) => prev.filter((l) => l.productoId !== id));
  }, []);

  const vaciar = useCallback(() => {
    setCarrito([]);
  }, []);

  return {
    carrito,
    agregar,
    quitar,
    vaciar,
    estaVacio: carrito.length === 0,
  };
}
