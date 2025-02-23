'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { buscarPedidosPorFiltro } from '@/lib/pedidos-api';
import { obtenerClientes } from '@/lib/clientes-api'; // Importa obtenerClientes desde clientes-api
import Link from 'next/link';

export default function BuscarPedidosPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    clienteId: '',
    estado: '',
  });
  const [resultados, setResultados] = useState([]);
  const [clientes, setClientes] = useState([]); // Estado para almacenar la lista de clientes

  // Cargar clientes al iniciar la página
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await obtenerClientes(); // Usa obtenerClientes de clientes-api
        setClientes(clientesData);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pedidos = await buscarPedidosPorFiltro(filtros);
      setResultados(pedidos);
    } catch (error) {
      console.error('Error al buscar pedidos:', error);
    }
  };

  // Función para redirigir a la vista de actualización del estado
  const handleActualizarEstado = (pedidoId) => {
    router.push(`/pedidos/${pedidoId}/actualizar-estado`);
  };

  return (
    <div>
      <h1>Buscar Pedidos</h1>
      <form onSubmit={handleSubmit}>
        {/* Combo desplegable para seleccionar cliente */}
        <div>
          <label>Cliente:</label>
          <select
            value={filtros.clienteId}
            onChange={(e) => setFiltros({ ...filtros, clienteId: e.target.value })}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Combo desplegable para seleccionar estado */}
        <div>
          <label>Estado:</label>
          <select
            value={filtros.estado}
            onChange={(e) => setFiltros({ ...filtros, estado: e.target.value })}
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

        {/* Botón para buscar */}
        <button type="submit">Buscar</button>
      </form>

      {/* Mostrar resultados de la búsqueda */}
      <div>
        <h2>Resultados de la búsqueda:</h2>
        {resultados.length > 0 ? (
          <table>
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
                    <Link href={`/pedidos/${pedido.id}`}>
                      {pedido.numeroPedido}
                    </Link>
                  </td>
                  <td>{pedido.cliente.nombre}</td>
                  <td>{pedido.estado}</td>
                  <td>
                    <button onClick={() => handleActualizarEstado(pedido.id)}>
                      Actualizar Estado
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No se encontraron pedidos.</p>
        )}
      </div>

      {/* Botón para volver al menú */}
      <Link href="/pedidos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}