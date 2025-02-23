'use client';
import Link from 'next/link';
import styles from "./page.module.css";

export default function ClientesMenuPage() {
  return (
    <div>
      <h1>Menú de Clientes</h1>
      <nav>
        <ul>
          <li>
            <Link href="/clientes/buscar">
              <button className={styles.botones}>Buscar Clientes</button>
            </Link>
          </li>
          <li>
            <Link href="/clientes/nuevo">
              <button className={styles.botones}>Crear Nuevo Cliente</button>
            </Link>
          </li>
          <li>
            <Link href="/clientes/asignar-obra">
              <button className={styles.botones}>Asignar obra</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}