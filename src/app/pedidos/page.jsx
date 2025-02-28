'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function PedidosMenuPage() {
  return (
    <div className={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Menú de Pedidos</h1>
      </div>

      {/* Contenedor de opciones */}
      <div className={styles.submenuContainer}>
        <Link href="/pedidos/buscar">
          <div className={`${styles.submenuItem} ${styles.blue}`}>
            <span>🔍</span> Buscar Pedidos
          </div>
        </Link>

        <Link href="/pedidos/nuevo">
          <div className={`${styles.submenuItem} ${styles.green}`}>
            <span>➕</span> Crear Pedido
          </div>
        </Link>
      </div>
    </div>
  );
}
