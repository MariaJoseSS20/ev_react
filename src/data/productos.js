export const productos = [
  {
    id: 1,
    sku: 'MER-05',
    nombre: 'Merluza austral fresca (aprox. 500 g)',
    precio: 8490,
    categoria: 'pescado',
    etiqueta: 'Pescado',
    imagen:
      'https://images.unsplash.com/photo-1700481935677-26f2336f6f36?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 2,
    sku: 'CHOR-KG',
    nombre: 'Choritos (aprox. 600 g)',
    precio: 10990,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://plus.unsplash.com/premium_photo-1708975618387-2b841723191e?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 3,
    sku: 'ALM-U',
    nombre: 'Almejas (bandeja)',
    precio: 8990,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://images.unsplash.com/photo-1633960413118-d22d9be39641?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 4,
    sku: 'CHO-KG',
    nombre: 'Cholga fresca bandeja (1 kg)',
    precio: 8990,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://plus.unsplash.com/premium_photo-1707227207495-7fdb0101dafd?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 5,
    sku: 'CAM-KG',
    nombre: 'Camarones cocidos (aprox. 400 g)',
    precio: 12990,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://plus.unsplash.com/premium_photo-1667115593089-17f5b6116217?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 6,
    sku: 'CAL-750',
    nombre: 'Calamares (aprox. 750 g)',
    precio: 9590,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://images.unsplash.com/photo-1623910270365-9b45727235c4?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 7,
    sku: 'SAL-LON',
    nombre: 'Lomo de salmón (aprox. 550 g)',
    precio: 14490,
    categoria: 'pescado',
    etiqueta: 'Pescado',
    imagen:
      'https://images.unsplash.com/photo-1763062550082-2c9f94096abb?auto=format&fit=crop&w=640&q=80',
  },
  {
    id: 8,
    sku: 'PUL-O',
    nombre: 'Pulpo cocido medallones (aprox. 400 g)',
    precio: 11990,
    categoria: 'marisco',
    etiqueta: 'Marisco',
    imagen:
      'https://images.unsplash.com/photo-1583180527676-8dbfe98c2c87?auto=format&fit=crop&w=640&q=80',
  },
];

export function buscarProducto(id) {
  return productos.find((p) => p.id === id) || null;
}
