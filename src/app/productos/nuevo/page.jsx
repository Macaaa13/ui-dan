'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crearProducto } from '@/lib/productos-api';
import { obtenerCategorias } from '@/lib/categorias-api';
import Link from "next/link";

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
        console.error("Error al obtener categorías:", error);
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
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div>
      <h1>Crear nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Stock Actual"
          value={formData.stockActual}
          onChange={(e) => setFormData({ ...formData, stockActual: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Stock Mínimo"
          value={formData.stockMinimo}
          onChange={(e) => setFormData({ ...formData, stockMinimo: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Descuento"
          value={formData.descuento}
          onChange={(e) => setFormData({ ...formData, descuento: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="ID de Categoría"
          value={formData.categoria.id}
          onChange={(e) => setFormData({ ...formData, categoria: { ...formData.categoria, id: parseInt(e.target.value) } })}
          required
        />
        <input
          type="text"
          placeholder="Nombre de Categoría"
          value={formData.categoria.nombre}
          onChange={(e) => setFormData({ ...formData, categoria: { ...formData.categoria, nombre: e.target.value } })}
          required
        />
         {/* Combo de selección de categoría */}
         <select
          value={formData.categoria.id}
          onChange={(e) => {
            const selectedCategoria = categorias.find(cat => cat.id === parseInt(e.target.value));
            setFormData({
              ...formData,
              categoria: selectedCategoria || { id: '', nombre: '' }
            });
          }}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Crear producto</button>
      </form>
      <Link href="/productos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}