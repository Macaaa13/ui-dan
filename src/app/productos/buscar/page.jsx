'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buscarProductosPorFiltro, eliminarProducto } from '@/lib/productos-api';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const handleBuscar = async () => {
    try {
      const filtrosConvertidos = {
        id: filtros.id ? parseInt(filtros.id, 10) : null,
        nombre: filtros.nombre || null,
        precioMin: filtros.precioMin ? parseFloat(filtros.precioMin) : null,
        precioMax: filtros.precioMax ? parseFloat(filtros.precioMax) : null,
        stockMin: filtros.stockMin ? parseInt(filtros.stockMin, 10) : null,
        stockMax: filtros.stockMax ? parseInt(filtros.stockMax, 10) : null,
      };

      const productosFiltrados = await buscarProductosPorFiltro(filtrosConvertidos);
      setResults(productosFiltrados);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`);
    if (confirmacion) {
      try {
        await eliminarProducto(id);
        alert('Producto eliminado correctamente.');
        const nuevosResultados = results.filter(producto => producto.id !== id);
        setResults(nuevosResultados);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto. Verifica el ID e intenta nuevamente.');
      }
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      const lista = await buscarProductosPorFiltro({}); // Búsqueda sin filtros
      setResults(lista);
    };

    fetchProductos();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscar Productos</h1>

      {/* Filtros */}
      <div className={styles.filters}>
        <div className={styles.filtersGroup}>
          <div className={styles.filtersColumn}>
            <label className={styles.label}>
              ID
              <input
                type="number"
                name="id"
                value={filtros.id}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Precio Mínimo
              <input
                type="number"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Stock Mínimo
              <input
                type="number"
                name="stockMin"
                value={filtros.stockMin}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>
          </div>

          <div className={styles.filtersColumn}>
          <label className={styles.label}>
              Nombre
              <input
                type="text"
                name="nombre"
                value={filtros.nombre}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Precio Máximo
              <input
                type="number"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>

            <label className={styles.label}>
              Stock Máximo
              <input
                type="number"
                name="stockMax"
                value={filtros.stockMax}
                onChange={handleInputChange}
                className={styles.input}
              />
            </label>
          </div>
        </div>

        <button onClick={handleBuscar} className={styles.button}>Buscar Productos</button>
      </div>

      {/* Tabla de resultados */}
      <table className={styles.table}>
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
                <button onClick={() => handleEliminar(producto.id)} className={styles.deleteButton}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para volver al menú */}
      <Link href="/productos">
        <button className={styles.backButton}>Volver al Menú</button>
      </Link>
    </div>
  );
}
