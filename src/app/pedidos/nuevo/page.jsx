'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { crearPedido } from '@/lib/pedidos-api';
import { obtenerObras } from '@/lib/obras-api';
import { obtenerClientes } from '@/lib/clientes-api';
import { obtenerProductos } from '@/lib/productos-api';
import Link from 'next/link';

export default function NewPedidoPage() {
  const router = useRouter();

  const [clientes, setClientes] = useState([]);
  const [obras, setObras] = useState([]);
  const [productos, setProductos] = useState([]);

  const [formData, setFormData] = useState({
    usuario: '',
    observaciones: '',
    cliente: null,
    obra: null,
    detalle: [],
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setClientes(await obtenerClientes());
        setObras(await obtenerObras());
        setProductos(await obtenerProductos());
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClienteChange = (e) => {
    const clienteSeleccionado = clientes.find(c => c.id === parseInt(e.target.value));
    setFormData({ ...formData, cliente: clienteSeleccionado });
  };

  const handleObraChange = (e) => {
    const obraSeleccionada = obras.find(o => o.id === parseInt(e.target.value));
    setFormData({ ...formData, obra: obraSeleccionada });
  };

  const agregarDetalle = () => {
    setFormData({
      ...formData,
      detalle: [...formData.detalle, { producto: null, cantidad: 1 }],
    });
  };

  const actualizarDetalle = (index, campo, valor) => {
    const nuevosDetalles = [...formData.detalle];
    if (campo === 'producto') {
      const productoSeleccionado = productos.find((p) => p.id === parseInt(valor));
      nuevosDetalles[index].producto = productoSeleccionado || null;
    } else {
      nuevosDetalles[index].cantidad = parseInt(valor) || 1;
    }
    setFormData({ ...formData, detalle: nuevosDetalles });
    calcularTotal(nuevosDetalles);
  };

  const calcularTotal = (detalles) => {
    const total = detalles.reduce(
      (acc, detalle) => acc + (detalle.producto ? detalle.producto.precio * detalle.cantidad : 0),
      0
    );
    setFormData((prev) => ({ ...prev, total }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validación de datos obligatorios
    if (!formData.cliente || !formData.obra || formData.detalle.some(d => d.producto === null)) {
      alert("Error: Faltan datos obligatorios.");
      return;
    }
  
    // Convertimos detalle para enviar el objeto completo de producto
    const pedidoFinal = {
      ...formData,
      detalle: formData.detalle.map((item) => ({
        producto: item.producto ? {
          id: item.producto.id,
          nombre: item.producto.nombre,
          precio: item.producto.precio,
          descuento: item.producto.descuento || 0,
        } : null,
        cantidad: item.cantidad,
      })),
    };
  
    console.log("📤 Enviando pedido:", JSON.stringify(pedidoFinal, null, 2));

    try {
      await crearPedido(pedidoFinal);
      router.push('/pedidos');
    } catch (error) {
      console.error('❌ Error al crear el pedido:', error);
      if (error.response) {
        const errorText = await error.response.text();
        alert(`Error en el servidor: ${errorText}`);
      }
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Crear Nuevo Pedido</h1>
      <form onSubmit={handleSubmit}>
        <label>Usuario:</label>
        <input type="text" name="usuario" value={formData.usuario} onChange={handleChange} required />

        <label>Observaciones:</label>
        <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} />

        <label>Cliente:</label>
        <select name="cliente" value={formData.cliente ? formData.cliente.id : ''} onChange={handleClienteChange} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
          ))}
        </select>

        <label>Obra:</label>
        <select name="obra" value={formData.obra ? formData.obra.id : ''} onChange={handleObraChange} required>
          <option value="">Seleccione una obra</option>
          {obras.map((obra) => (
            <option key={obra.id} value={obra.id}>
              {obra.nombre} - {obra.direccion}
            </option>
          ))}
        </select>

        <h3>Detalles del Pedido</h3>
        {formData.detalle.map((detalle, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              value={detalle.producto ? detalle.producto.id : ''}
              onChange={(e) => actualizarDetalle(index, 'producto', e.target.value)}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((producto) => (
                <option key={producto.id} value={producto.id}>
                  {`${producto.nombre} - $${producto.precio}`}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={detalle.cantidad}
              min="1"
              onChange={(e) => actualizarDetalle(index, 'cantidad', e.target.value)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={agregarDetalle} style={{ marginTop: '10px' }}>
          Agregar Producto
        </button>

        <h3>Total: ${formData.total.toFixed(2)}</h3>

        <button type="submit">Crear Pedido</button>
      </form>

      <Link href="/pedidos">
        <button style={{ marginTop: '20px' }}>Volver</button>
      </Link>
    </div>
  );
}
