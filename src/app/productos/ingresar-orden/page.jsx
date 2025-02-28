'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ingresarOrdenProvision } from '@/lib/productos-api';
import Link from "next/link";
import styles from './page.module.css';

export default function EnterOrdenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idProducto: '',
    cantidad: 1,
    precio: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ingresarOrdenProvision(formData);
      router.push('/productos'); // Redirige al menú de productos
    } catch (error) {
      console.error("Error al ingresar la orden:", error);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Ingresar orden de provisión</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>ID del Producto</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Ingrese el ID"
            value={formData.idProducto}
            onChange={(e) => setFormData({ ...formData, idProducto: e.target.value })}
            required
          />

          <label className={styles.label}>Cantidad</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Ingrese la cantidad"
            value={formData.cantidad}
            onChange={(e) => setFormData({ ...formData, cantidad: e.target.value })}
            required
          />

          <label className={styles.label}>Precio</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Ingrese el precio"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
            required
          />

          <button className={styles.button} type="submit">Ingresar orden</button>
        </form>
      </div>

      {/* Botón de volver fuera del recuadro */}
      <div className={styles.backContainer}>
        <Link href="/productos">
          <button className={styles.backButton}>Volver al Menú</button>
        </Link>
      </div>
    </div>
  );
}
