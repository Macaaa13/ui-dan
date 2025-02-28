"use client";
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-item">
        <Link href="/clientes">Clientes</Link>
      </div>
      <div className="separator"></div>
      <div className="nav-item">
        <Link href="/productos">Productos</Link>
      </div>
      <div className="separator"></div>
      <div className="nav-item">
        <Link href="/pedidos">Pedidos</Link>
      </div>
      
      <style jsx>{`
        
        nav {
          background: #333;
          display: flex;
          justify-content: space-between; /* Distribuye los elementos en tres partes */
          align-items: center;
          width: 100%;
          border: 2px solid #444;
          height: 45px;
        }

        .nav-item {
         flex: 1;
          text-align: center;
          position: relative;
        }

        .separator {
          width: 2px;
          min-height: 40px;
          background: #444;
          margin: auto 0;
        }

      `}</style>
    </nav>
  );
};

export default Navbar;
