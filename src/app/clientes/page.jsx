'use client';
import Link from 'next/link';
import styles from "./page.module.css";

export default function ClientesMenuPage() {
  return (
    <div className={styles.container}>
      {/* Encabezado con imagen de fondo */}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Menú de Clientes</h1>
      </div>

      {/* Contenedor de opciones */}
      <div className={styles.submenuContainer}>
        <Link href="/clientes/buscar">
          <div className={`${styles.submenuItem} ${styles.blue}`}>
            <span>🔍</span> Buscar Clientes
          </div>
        </Link>

        <Link href="/clientes/nuevo">
          <div className={`${styles.submenuItem} ${styles.green}`}>
            <span>➕</span> Crear Cliente
          </div>
        </Link>

        <Link href="/clientes/asignar-obra">
          <div className={`${styles.submenuItem} ${styles.yellow}`}>
            <span>🏗️</span> Asignar Obra
          </div>
        </Link>
      </div>
    </div>
  );
}
