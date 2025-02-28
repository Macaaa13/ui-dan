'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { obtenerPedidoPorId, actualizarEstadoPedido } from '@/lib/pedidos-api';
import styles from './page.module.css';

export default function ActualizarEstadoPage() {
  const router = useRouter();
  const params = useParams();
  const { numeroPedido } = params;

  const [pedido, setPedido] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  // Obtener los datos del pedido al cargar la página
  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const pedido = await obtenerPedidoPorId(numeroPedido);
        setPedido(pedido);
        setNuevoEstado(pedido.estado || 'RECIBIDO'); // Valor por defecto en caso de error
      } catch (error) {
        console.error('Error al obtener el pedido:', error);
        setError('No se pudo cargar el pedido.');
      } finally {
        setCargando(false);
      }
    };

    if (numeroPedido) {
      fetchPedido();
    }
  }, [numeroPedido]);

  // Función para actualizar el estado del pedido
  const handleSubmit = async (e) => {
    e.preventDefault();
    setActualizando(true);
    try {
      console.log('Actualizacion. Numero de pedido: %d . Estado: %s', numeroPedido, nuevoEstado);
      await actualizarEstadoPedido(numeroPedido, { estado: nuevoEstado });
      router.push(`/pedidos/${numeroPedido}`); // Redirigir a la página de detalles del pedido
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
      setError('No se pudo actualizar el estado.');
    } finally {
      setActualizando(false);
    }
  };

  if (cargando) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Error: {error}</p>
        <button onClick={() => router.push('/pedidos')} className={styles.errorButton}>
          Volver a Pedidos
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Actualizar Estado del Pedido #{pedido.numeroPedido}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Campo: Estado */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nuevo Estado</label>
          <select
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
            required
            disabled={actualizando}
            className={styles.select}
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
        <button type="submit" className={styles.submitButton} disabled={actualizando}>
          {actualizando ? 'Actualizando...' : 'Actualizar Estado'}
        </button>
      </form>

      {/* Botón para volver a los detalles del pedido */}
      <button onClick={() => router.push(`/pedidos`)} className={styles.backButton} disabled={actualizando}>
        Volver al Detalle del Pedido
      </button>
    </div>
  );
}
