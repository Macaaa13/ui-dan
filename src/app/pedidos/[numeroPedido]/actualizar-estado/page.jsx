'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { obtenerPedidoPorId, actualizarEstadoPedido } from '@/lib/pedidos-api';

export default function ActualizarEstadoPage() {
  const router = useRouter();
  const params = useParams();
  const numeroPedido = params.numeroPedido;

  const [pedido, setPedido] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Obtener los datos del pedido al cargar la página
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const pedido = await obtenerPedidoPorId(numeroPedido);
        setPedido(pedido);
        setNuevoEstado(pedido.estado); // Establecer el estado actual
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
      }
    };

    fetchPedido();
  }, [numeroPedido]);

  // Función para actualizar el estado del pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Actualizacion. Numero de pedido: %d . Estado: %s', numeroPedido, nuevoEstado);
      await actualizarEstadoPedido(numeroPedido, { estado: nuevoEstado });
      router.push(`/pedidos/${numeroPedido}`); // Redirigir a la página de detalles del pedido
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  if (!pedido) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Actualizar Estado del Pedido #{pedido.numeroPedido}</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Estado */}
        <div>
          <label>Estado:</label>
          <select
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
            required
          >
            <option value="RECIBIDO">Recibido</option>
            <option value="ACEPTADO">Aceptado</option>
            <option value="RECHAZADO">Rechazado</option>
            <option value="EN_PREPARACION">En preparación</option>
            <option value="ENTREGADO">Entregado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        {/* Botón para actualizar el estado */}
        <button type="submit">Actualizar Estado</button>
      </form>

      {/* Botón para volver a los detalles del pedido */}
      <button onClick={() => router.push(`/pedidos`)}>
        Volver al Detalle del Pedido
      </button>
    </div>
  );
}