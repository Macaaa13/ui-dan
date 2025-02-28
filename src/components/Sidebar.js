"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, Search, PlusCircle, ClipboardCheck, Tag } from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState('');

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? '' : menu);
  };

  useEffect(() => {
    // Abrimos el submenú correspondiente cuando cambiamos de ruta
    if (pathname.startsWith('/clientes')) {
      setOpenMenu('clientes');
    } else if (pathname.startsWith('/productos')) {
      setOpenMenu('productos');
    } else if (pathname.startsWith('/pedidos')) {
      setOpenMenu('pedidos');
    }
  }, [pathname]);

  return (
    <aside>
      {/* Título de la Sidebar */}
      <div className="sidebar-title">
        Gestión de Pedidos DAN
      </div>

      <nav>
  <ul className="navList">
    {/* CLIENTES */}
    <li className={`menu-item ${pathname.startsWith('/clientes') ? 'active' : ''}`}>
      <Link href="/clientes">
        <button onClick={() => toggleMenu('clientes')}>
          <Users size={18} className="icon" /> Clientes
        </button>
      </Link>
    </li>
    {openMenu === 'clientes' && (
      <ul className="submenu">
        <li className={pathname === '/clientes/buscar' ? 'active' : ''}>
          <Link href="/clientes/buscar">
            <Search size={16} className="icon" /> Buscar Clientes
          </Link>
        </li>
        <li className={pathname === '/clientes/nuevo' ? 'active' : ''}>
          <Link href="/clientes/nuevo">
            <PlusCircle size={16} className="icon" /> Crear Cliente
          </Link>
        </li>
        <li className={pathname === '/clientes/asignar-obra' ? 'active' : ''}>
          <Link href="/clientes/asignar-obra">
            <ClipboardCheck size={16} className="icon" /> Asignar Obra
          </Link>
        </li>
      </ul>
    )}

    {/* PRODUCTOS */}
    <li className={`menu-item ${pathname.startsWith('/productos') ? 'active' : ''}`}>
      <Link href="/productos">
        <button onClick={() => toggleMenu('productos')}>
          <Package size={18} className="icon" /> Productos
        </button>
      </Link>
    </li>
    {openMenu === 'productos' && (
      <ul className="submenu">
        <li className={pathname === '/productos/buscar' ? 'active' : ''}>
          <Link href="/productos/buscar">
            <Search size={16} className="icon" /> Buscar Productos
          </Link>
        </li>
        <li className={pathname === '/productos/nuevo' ? 'active' : ''}>
          <Link href="/productos/nuevo">
            <PlusCircle size={16} className="icon" /> Crear Producto
          </Link>
        </li>
        <li className={pathname === '/productos/ingresar-orden' ? 'active' : ''}>
          <Link href="/productos/ingresar-orden">
            <ClipboardCheck size={16} className="icon" /> Ingresar Orden de Provisión
          </Link>
        </li>
        <li className={pathname === '/productos/descuento' ? 'active' : ''}>
          <Link href="/productos/descuento">
            <Tag size={16} className="icon" /> Actualizar Descuento
          </Link>
        </li>
      </ul>
    )}

    {/* PEDIDOS */}
    <li className={`menu-item ${pathname.startsWith('/pedidos') ? 'active' : ''}`}>
      <Link href="/pedidos">
        <button onClick={() => toggleMenu('pedidos')}>
          <ShoppingCart size={18} className="icon" /> Pedidos
        </button>
      </Link>
    </li>
    {openMenu === 'pedidos' && (
      <ul className="submenu">
        <li className={pathname === '/pedidos/buscar' ? 'active' : ''}>
          <Link href="/pedidos/buscar">
            <Search size={16} className="icon" /> Buscar Pedidos
          </Link>
        </li>
        <li className={pathname === '/pedidos/nuevo' ? 'active' : ''}>
          <Link href="/pedidos/nuevo">
            <PlusCircle size={16} className="icon" /> Crear Pedido
          </Link>
        </li>
      </ul>
    )}
  </ul>
</nav>

      <style jsx>{`
        aside {
          width: 250px;
          background: #333;
          color: white;
          position: fixed;
          height: 100%;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          border-right: 2px solid #444;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: bold;
          padding: 15px;
          text-align: center;
          background: #222;
          width: 100%;
          border-bottom: 2px solid #444;
        }

        nav {
          width: 100%;
        }

        .navList {
          list-style-type: none;
          padding: 0;
          margin: 0;
          width: 100%;
        }

        .menu-item {
          width: 100%;
          padding: 8px 10px;
          text-align: left;
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .menu-item button {
          background: none;
          border: none;
          color: white;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
          padding: 5px 10px;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .menu-item:hover {
          background-color: #555;
        }

        .menu-item.active {
          background-color: #007bff;
        }

        .submenu {
          list-style-type: none;
          padding-left: 0;
          margin: 0;
          background-color: #222;
          width: 100%;
        }

        .submenu li {
          padding: 8px 10px;
          display: flex;
          align-items: center;
          font-size: 14px;
        }

        .submenu li a {
          color: white;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 5px 10px;
          transition: background-color 0.3s ease;
          width: 100%;
          gap: 10px;
        }

        .submenu li:hover {
          background-color: #444;
        }

        .submenu li.active {
          background-color: #007bff;
        }

        .icon {
          margin-right: 10px;
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;