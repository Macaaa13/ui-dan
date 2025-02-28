"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Gestion de Pedidos DAN</h1>
      
      <div className={styles.cardContainer}>
        <Link href="/clientes" passHref>
          <div className={styles.card_inicio}>
            <img src="/icons/clientes.png" alt="Clientes" />
            <span className={styles.cardTitle}>Clientes</span>
          </div>
        </Link>

        <Link href="/productos" passHref>
          <div className={styles.card_inicio}>
            <img src="/icons/productos.png" alt="Productos" />
            <span className={styles.cardTitle}>Productos</span>
          </div>
        </Link>

        <Link href="/pedidos" passHref>
          <div className={styles.card_inicio}>
            <img src="/icons/pedidos.png" alt="Pedidos" />
            <span className={styles.cardTitle}>Pedidos</span>
          </div>
        </Link>
      </div>
      
    </main>
  );
}
