'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { actualizarDescuento } from '@/lib/productos-api';
import Link from "next/link";
import styles from './page.module.css';

export default function DescuentoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idProducto: '',
    descuento: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarDescuento(formData);
      router.push('/productos'); // Redirige al menú de productos
    } catch (error) {
      console.error("Error al actualizar el descuento:", error);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Actualizar descuento</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>ID del Producto</label>
          <input
            type="number"
            placeholder="Ingrese el ID"
            value={formData.idProducto}
            onChange={(e) => setFormData({ ...formData, idProducto: parseInt(e.target.value) })}
            required
            className={styles.input}
          />

          <label className={styles.label}>Descuento (%)</label>
          <input
            type="number"
            placeholder="Ingrese el descuento"
            value={formData.descuento}
            onChange={(e) => setFormData({ ...formData, descuento: parseInt(e.target.value) })}
            required
            className={styles.input}
          />

          <button type="submit" className={styles.button}>Actualizar descuento</button>
        </form>
      </div>

      {/* Botón para volver al menú fuera del contenedor */}
      <div className={styles.backContainer}>
        <Link href="/productos">
          <button className={styles.backButton}>Volver al Menú</button>
        </Link>
      </div>
    </>
  );
}
