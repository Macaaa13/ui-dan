'use client';
import Link from 'next/link';
import styles from "./page.module.css";

export default function ProductosMenuPage() {
  return (
    <div>
      <h1>Menú de Productos</h1>
      <nav>
        <ul>
          <li>
            <Link href="/productos/buscar-id">
              <button className={styles.botones}>Buscar Productos por identificador</button>
            </Link>
          </li>
          <li>
            <Link href="/productos/buscar-todo">
              <button className={styles.botones}>Buscar todos los Productos</button>
            </Link>
          </li>
          <li>
            <Link href="/productos/nuevo">
              <button className={styles.botones}>Crear Nuevo Producto</button>
            </Link>
          </li>
          <li>
            <Link href="/productos/ingresar-orden">
              <button className={styles.botones}>Ingresar Orden de Provisión</button>
            </Link>
          </li>
          <li>
            <Link href="/productos/descuento">
              <button className={styles.botones}>Actualizar Descuento</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}