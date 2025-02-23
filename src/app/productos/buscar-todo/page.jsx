'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { obtenerProductos } from '@/lib/productos-api';

export default function ProductosBuscarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Cargar todos los productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      const lista = await obtenerProductos();
      console.log(lista);
      setResults(lista);
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock Actual</th>
            <th>Stock Mínimo</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {results.map(producto => (
            <tr key={producto.id}>
              <td>
                <Link href={`/productos/${producto.id}`}>{producto.id}</Link>
              </td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.stockActual}</td>
              <td>{producto.stockMinimo}</td>
              <td>${producto.precio}</td>
              <td>{producto.descuento}%</td>
              <td>{producto.categoria.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/productos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}
