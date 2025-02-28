'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crearPedido } from '@/lib/pedidos-api'; 
import { obtenerObras } from '@/lib/obras-api'; 
import { obtenerClientes } from '@/lib/clientes-api'; 
import Link from 'next/link';
import styles from './page.module.css';  // Importar los estilos

export default function NewPedidoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString(),
    numeroPedido: '',
    usuario: '',
    observaciones: '',
    cliente: { id: '', nombre: '' }, // Cliente asociado al pedido
    obra: { id: '', nombre: '' },    // Obra asociada al pedido
    detalle: [],                     // Lista de detalles del pedido
    total: 0,                        // Total del pedido
  });

  const [clientes, setClientes] = useState([]); // Lista de clientes
  const [obras, setObras] = useState([]);       // Lista de obras

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientesData = await obtenerClientes(); // Obtener clientes
        setClientes(clientesData);

        const obrasData = await obtenerObras(); // Obtener obras
        setObras(obrasData);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearPedido(formData); // Envía el pedido al backend
      router.push('/pedidos');    // Redirige a la lista de pedidos
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  const agregarDetalle = () => {
    setFormData({
      ...formData,
      detalle: [...formData.detalle, { producto: '', cantidad: 0, precioUnitario: 0 }],
    });
  };

  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...formData.detalle];
    nuevosDetalles[index][campo] = valor;
    setFormData({ ...formData, detalle: nuevosDetalles });
  };

  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    const clienteSeleccionado = clientes.find((cliente) => cliente.id === clienteId);
  
    if (clienteSeleccionado) {
      setFormData({
        ...formData,
        cliente: { id: clienteId, nombre: clienteSeleccionado.nombre },
      });
    } else {
      setFormData({
        ...formData,
        cliente: { id: '', nombre: '' },
      });
    }
  };

  const handleObraChange = (e) => {
    const obraId = e.target.value;
    const obraSeleccionada = obras.find((obra) => obra.id === obraId);
  
    if (obraSeleccionada) {
      setFormData({
        ...formData,
        obra: { id: obraId, nombre: obraSeleccionada.nombre },
      });
    } else {
      setFormData({
        ...formData,
        obra: { id: '', nombre: '' },
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Crear nuevo pedido</h1>
      <form onSubmit={handleSubmit} className={styles.form}> {/* Aplicamos .form aquí */}
        {/* Campo: Número de Pedido */}
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Número de Pedido"
            value={formData.numeroPedido}
            onChange={(e) => setFormData({ ...formData, numeroPedido: e.target.value })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: Usuario */}
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Usuario"
            value={formData.usuario}
            onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: Observaciones */}
        <div className={styles.formGroup}>
          <textarea
            placeholder="Observaciones"
            value={formData.observaciones}
            onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
            className={`${styles.input} ${styles.textarea}`}
          />
        </div>

        {/* Campo: Cliente */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Cliente:</label>
          <select
            value={formData.cliente.id}
            onChange={handleClienteChange}
            className={styles.input}
            required
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Campo: Obra */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Obra:</label>
          <select
            value={formData.obra.id}
            onChange={handleObraChange}
            className={styles.input}
            required
          >
            <option value="">Seleccione una obra</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Detalles del Pedido */}
        <div className={styles.detailsContainer}>
          <h3>Detalles del Pedido</h3>
          {formData.detalle.map((detalle, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Producto"
                value={detalle.producto}
                onChange={(e) => actualizarDetalle(index, 'producto', e.target.value)}
                className={styles.input}
                required
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={detalle.cantidad}
                onChange={(e) => actualizarDetalle(index, 'cantidad', parseInt(e.target.value))}
                className={styles.input}
                required
              />
              <input
                type="number"
                placeholder="Precio Unitario"
                value={detalle.precioUnitario}
                onChange={(e) => actualizarDetalle(index, 'precioUnitario', parseFloat(e.target.value))}
                className={styles.input}
                required
              />
            </div>
          ))}
          <button type="button" onClick={agregarDetalle} className={styles.submitButton}>
            Agregar detalle
          </button>
        </div>

        {/* Total */}
        <div className={styles.totalInput}>
          <input
            type="number"
            value={formData.total}
            onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })}
            className={styles.input}
            placeholder="Total"
            required
          />
        </div>

        {/* Botones de envío */}
        <div className={styles.buttonsContainer}>
          <button type="submit" className={styles.submitButton}>Crear Pedido</button>
          <Link href="/pedidos" passHref>
            <button type="button" className={styles.backButton}>Volver</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
