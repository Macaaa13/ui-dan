'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crearPedido  } from '@/lib/pedidos-api'; 
import { obtenerObras } from '@/lib/obras-api'; 
import { obtenerClientes } from '@/lib/clientes-api'; 
import Link from 'next/link';

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

  // Obtener la lista de clientes y obras al cargar la página
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

  // Función para agregar un detalle al pedido
  const agregarDetalle = () => {
    setFormData({
      ...formData,
      detalle: [...formData.detalle, { producto: '', cantidad: 0, precioUnitario: 0 }],
    });
  };

  // Función para actualizar un detalle del pedido
  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...formData.detalle];
    nuevosDetalles[index][campo] = valor;
    setFormData({ ...formData, detalle: nuevosDetalles });
  };

  // Función para manejar la selección de un cliente
  const handleClienteChange = (e) => {
    const clienteId = e.target.value;
    const clienteSeleccionado = clientes.find((cliente) => cliente.id === clienteId);
  
    if (clienteSeleccionado) {
      setFormData({
        ...formData,
        cliente: { id: clienteId, nombre: clienteSeleccionado.nombre },
      });
    } else {
      // Si no se encuentra el cliente, puedes limpiar el campo o manejarlo de otra manera
      setFormData({
        ...formData,
        cliente: { id: '', nombre: '' },
      });
    }
  };

  // Función para manejar la selección de una obra
  const handleObraChange = (e) => {
    const obraId = e.target.value;
    const obraSeleccionada = obras.find((obra) => obra.id === obraId);
  
    if (obraSeleccionada) {
      setFormData({
        ...formData,
        obra: { id: obraId, nombre: obraSeleccionada.nombre },
      });
    } else {
      // Si no se encuentra la obra, puedes limpiar el campo o manejarlo de otra manera
      setFormData({
        ...formData,
        obra: { id: '', nombre: '' },
      });
    }
  };

  return (
    <div>
      <h1>Crear nuevo pedido</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Número de Pedido */}
        <input
          type="text"
          placeholder="Número de Pedido"
          value={formData.numeroPedido}
          onChange={(e) => setFormData({ ...formData, numeroPedido: e.target.value })}
          required
        />

        {/* Campo: Usuario */}
        <input
          type="text"
          placeholder="Usuario"
          value={formData.usuario}
          onChange={(e) => setFormData({ ...formData, usuario: e.target.value })}
          required
        />

        {/* Campo: Observaciones */}
        <textarea
          placeholder="Observaciones"
          value={formData.observaciones}
          onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
        />

        {/* Campo: Cliente */}
        <div>
          <label>Cliente:</label>
          <select
            value={formData.cliente.id}
            onChange={handleClienteChange}
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
        <div>
          <label>Obra:</label>
          <select
            value={formData.obra.id}
            onChange={handleObraChange}
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

        {/* Lista de Detalles del Pedido */}
        <h3>Detalles del Pedido</h3>
        {formData.detalle.map((detalle, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Producto"
              value={detalle.producto}
              onChange={(e) => actualizarDetalle(index, 'producto', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Cantidad"
              value={detalle.cantidad}
              onChange={(e) => actualizarDetalle(index, 'cantidad', parseInt(e.target.value))}
              required
            />
            <input
              type="number"
              placeholder="Precio Unitario"
              value={detalle.precioUnitario}
              onChange={(e) => actualizarDetalle(index, 'precioUnitario', parseFloat(e.target.value))}
              required
            />
          </div>
        ))}
        <button type="button" onClick={agregarDetalle}>
          Agregar Detalle
        </button>

        {/* Campo: Total */}
        <input
          type="number"
          placeholder="Total"
          value={formData.total}
          onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) })}
          required
        />

        {/* Botón para crear el pedido */}
        <button type="submit">Crear Pedido</button>
      </form>

      {/* Botón para volver al menú */}
      <Link href="/pedidos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}