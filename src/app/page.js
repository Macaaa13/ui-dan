import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
      <h1>Gestion de Pedidos DAN</h1>
      <Link href="/clientes">
        <button className={styles.botones}>Ir al menú de Clientes</button>
      </Link>
      <Link href="/productos">
        <button className={styles.botones} >Ir al menú de Productos</button>
      </Link>
      <Link href="/pedidos">
        <button className={styles.botones}>Ir al menú de Pedidos</button>
      </Link>
      </div>
    </main>
  );
}
