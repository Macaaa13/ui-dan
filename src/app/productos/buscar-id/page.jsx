'use client';
import { useState } from 'react';

import Link from 'next/link';
import {buscarProducto} from "@/lib/productos-api";

export default function Productos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  
  const handleSearch = async () => {
    const lista = await buscarProducto(searchTerm);
    console.log(lista);
    setResults(lista);
  };

  return (
    <>
      <h1>Productos Page</h1>
      <input 
        type="text" 
        placeholder="Buscar por número o nombre de producto" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
      />
      <button onClick={handleSearch}>Buscar</button>
      <Link href="/productos/new">
        <button>Crear nuevo producto</button>
      </Link>
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
    </>
  );
};
