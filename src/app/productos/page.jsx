'use client';
import Link from 'next/link';
import styles from "./page.module.css";

export default function ProductosMenuPage() {
  return (
    <div className={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Menú de Productos</h1>
      </div>

      {/* Contenedor de opciones */}
      <div className={styles.submenuContainer}>
        <Link href="/productos/buscar">
          <div className={`${styles.submenuItem} ${styles.blue}`}>
            <span>🔍</span> Buscar Productos
          </div>
        </Link>

        <Link href="/productos/nuevo">
          <div className={`${styles.submenuItem} ${styles.green}`}>
            <span>➕</span> Crear Producto
          </div>
        </Link>

        <Link href="/productos/ingresar-orden">
          <div className={`${styles.submenuItem} ${styles.yellow}`}>
            <span>📦</span> Ingresar Orden de Provisión
          </div>
        </Link>

        <Link href="/productos/descuento">
          <div className={`${styles.submenuItem} ${styles.red}`}>
            <span>💰</span> Actualizar Descuento
          </div>
        </Link>
      </div>
    </div>
  );
}
