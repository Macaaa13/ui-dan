'use client';

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import styles from "./page.module.css";

export default function ProductoLayout({ children }) {
  return (
    <div className="layout">
    {/* <Navbar /> */}
    <Sidebar />
    <div className="container">
      <main>{children}</main>
    </div>
    <style jsx>{`
    .layout {
        display: flex;
      }
      .container {
        margin-left: 243px; /* Desplaza el contenido para que no quede debajo de la sidebar */
        width: calc(100% - 243px);
        display: flex;
        justify-content: center; /* Centra el contenido horizontalmente */
        align-items: center; /* Centra el contenido verticalmente (opcional) */
        min-height: 100vh;
      }
      main {
        max-width: 800px; /* Ajusta según tu necesidad */
        padding: 20px;
      }
    `}</style>
  </div>
  );
}
