'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buscarProductosPorFiltro, eliminarProducto } from '@/lib/productos-api';

export default function ProductosBuscarPage() {
  const [filtros, setFiltros] = useState({
    id: '',
    nombre: '',
    precioMin: '',
    precioMax: '',
    stockMin: '',
    stockMax: '',
  });
  const [results, setResults] = useState([]);

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  // Función para realizar la búsqueda con los filtros
  const handleBuscar = async () => {
    try {
      // Convertir los valores de los filtros a los tipos correctos
      const filtrosConvertidos = {
        id: filtros.id ? parseInt(filtros.id, 10) : null,
        nombre: filtros.nombre || null,
        precioMin: filtros.precioMin ? parseFloat(filtros.precioMin) : null,
        precioMax: filtros.precioMax ? parseFloat(filtros.precioMax) : null,
        stockMin: filtros.stockMin ? parseInt(filtros.stockMin, 10) : null,
        stockMax: filtros.stockMax ? parseInt(filtros.stockMax, 10) : null,
      };

      // Realizar la búsqueda
      const productosFiltrados = await buscarProductosPorFiltro(filtrosConvertidos);
      setResults(productosFiltrados);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  // Función para eliminar un producto
  const handleEliminar = async (id) => {
    const confirmacion = confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`);
    if (confirmacion) {
      try {
        await eliminarProducto(id); // Llama a la función de eliminación
        alert('Producto eliminado correctamente.');
        // Actualizar la lista de resultados después de eliminar
        const nuevosResultados = results.filter(producto => producto.id !== id);
        setResults(nuevosResultados);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto. Verifica el ID e intenta nuevamente.');
      }
    }
  };

  // Cargar todos los productos al cargar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      const lista = await buscarProductosPorFiltro({}); // Búsqueda sin filtros
      setResults(lista);
    };

    fetchProductos();
  }, []);

  return (
    <div>
      <h1>Buscar Productos</h1>

      {/* Filtros */}
      <div>
        <label>
          ID:
          <input
            type="number"
            name="id"
            value={filtros.id}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Precio Mínimo:
          <input
            type="number"
            name="precioMin"
            value={filtros.precioMin}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Precio Máximo:
          <input
            type="number"
            name="precioMax"
            value={filtros.precioMax}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Stock Mínimo:
          <input
            type="number"
            name="stockMin"
            value={filtros.stockMin}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Stock Máximo:
          <input
            type="number"
            name="stockMax"
            value={filtros.stockMax}
            onChange={handleInputChange}
          />
        </label>

        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {/* Tabla de resultados */}
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map((producto) => (
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
              <td>
                <button onClick={() => handleEliminar(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para volver al menú */}
      <Link href="/productos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}