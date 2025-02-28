'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crearProducto } from '@/lib/productos-api';
import { obtenerCategorias } from '@/lib/categorias-api';
import Link from 'next/link';
import styles from './page.module.css'; // Importar los estilos

export default function NewProductoPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    stockActual: 0,
    stockMinimo: 0,
    precio: 0,
    descuento: 0,
    categoria: { id: '', nombre: '' },
  });

  // Obtener las categorías al cargar la página
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const listaCategorias = await obtenerCategorias(); // Debe devolver [{ id: 1, nombre: 'Electrónica' }, ...]
        setCategorias(listaCategorias);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    }
    fetchCategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearProducto(formData);
      router.push('/productos'); // Redirige al menú de productos
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <div className={styles.formColumn}>
              <label className={styles.label}>Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formColumn}>
              <label className={styles.label}>Categoría</label>
              <select
                value={formData.categoria.id}
                onChange={(e) => {
                  const selectedCategoria = categorias.find(cat => cat.id === parseInt(e.target.value));
                  setFormData({
                    ...formData,
                    categoria: selectedCategoria || { id: '', nombre: '' },
                  });
                }}
                className={styles.input}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.formDescripcion}>
            <label className={styles.label}>Descripción</label>
            <input
              type="text"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <div className={styles.formColumn}>
              <label className={styles.label}>Stock Actual</label>
              <input
                type="number"
                placeholder="Stock Actual"
                value={formData.stockActual}
                onChange={(e) => setFormData({ ...formData, stockActual: parseInt(e.target.value) })}
                className={styles.input}
                required
              />

              <label className={styles.label}>Precio</label>
              <input
                type="number"
                placeholder="Precio"
                value={formData.precio}
                onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formColumn}>
              <label className={styles.label}>Stock Mínimo</label>
              <input
                type="number"
                placeholder="Stock Mínimo"
                value={formData.stockMinimo}
                onChange={(e) => setFormData({ ...formData, stockMinimo: parseInt(e.target.value) })}
                className={styles.input}
                required
              />

              <label className={styles.label}>Descuento</label>
              <input
                type="number"
                placeholder="Descuento"
                value={formData.descuento}
                onChange={(e) => setFormData({ ...formData, descuento: parseInt(e.target.value) })}
                className={styles.input}
                required
              />
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className={styles.buttonsContainer}>
          <Link href="/productos">
            <button className={styles.backButton}>Volver al Menú</button>
          </Link>
          <button type="submit" className={styles.createButton}>
            Crear producto
          </button>
        </div>
      </form>
    </div>
  );
}
