'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { buscarPedidosPorFiltro } from '@/lib/pedidos-api';
import { obtenerClientes } from '@/lib/clientes-api';
import Link from 'next/link';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

export default function BuscarPedidosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    clienteId: '',
    estado: '',
  });
  const [resultados, setResultados] = useState([]);
  const [clientes, setClientes] = useState([]); 
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  // Cargar clientes al iniciar la página
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await obtenerClientes();
        setClientes(clientesData);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusquedaRealizada(false);
    try {
      const pedidos = await buscarPedidosPorFiltro(filtros);
      setResultados(pedidos);
      setBusquedaRealizada(true);
    } catch (error) {
      console.error('Error al buscar pedidos:', error);
      setBusquedaRealizada(true);
    }
  };

  const handleActualizarEstado = (pedidoId) => {
    router.push(`/pedidos/${pedidoId}/actualizar-estado`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Buscar Pedidos</h1>
      <form onSubmit={handleSubmit} className={styles.filtersGroup}>
        <div className={styles.filterRow}>
          <label className={styles.label}>Cliente:</label>
          <select
            value={filtros.clienteId}
            onChange={(e) => setFiltros({ ...filtros, clienteId: e.target.value })}
            className={styles.select}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterRow}>
          <label className={styles.label}>Estado:</label>
          <select
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
            className={styles.select}
          >
            <option value="">Seleccione un estado</option>
            <option value="RECIBIDO">Recibido</option>
            <option value="ACEPTADO">Aceptado</option>
            <option value="RECHAZADO">Rechazado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        <button type="submit" className={styles.button}>Buscar Pedidos</button>
      </form>

      <div className={styles.divResultados}>
        <h2 className={styles.titleResultados}>Resultados de la búsqueda</h2>
        {busquedaRealizada ? (
          resultados.length > 0 ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Número de Pedido</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>
                      <Link href={`/pedidos/${pedido.numeroPedido}`}>
                        {pedido.numeroPedido}
                      </Link>
                    </td>
                    <td>{pedido.cliente.nombre}</td>
                    <td>{pedido.estado}</td>
                    <td>
                      <button onClick={() => handleActualizarEstado(pedido.id)} className={styles.updateButton}>
                        <FontAwesomeIcon icon={faSync} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No se encontraron pedidos.</p>
          )
        ) : (
          <p>Realice una búsqueda para ver los resultados.</p>
        )}
      </div>

      <Link href="/pedidos">
        <button className={styles.backButton}>Volver al Menú</button>
      </Link>
    </div>
  );
}
