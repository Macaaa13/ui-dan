'use client';
import Link from 'next/link';
import styles from "./page.module.css";

export default function ClientesMenuPage() {
  return (
    <div>
      <h1>Menú de Pedidos</h1>
      <nav>
        <ul>
          <li>
            <Link href="/pedidos/buscar">
              <button className={styles.botones}>Buscar Pedidos</button>
            </Link>
          </li>
          <li>
            <Link href="/pedidos/nuevo">
              <button className={styles.botones}>Crear Nuevo Pedido</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}