'use client';
import { useState, useEffect } from 'react';
import { obtenerUsuariosHabilitadosPorCliente } from "@/lib/clientes-api";  
import { buscarObrasPorCliente } from "@/lib/obras-api";
import { obtenerClientes } from "@/lib/clientes-api";  
import { obtenerProductos } from "@/lib/productos-api";
import { crearPedido } from "@/lib/pedidos-api"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';  // Importar Link para navegación
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
    const [clientes, setClientes] = useState([]);  
    const [clienteId, setClienteId] = useState("");  
    const [obras, setObras] = useState([]);  
    const [usuarios, setUsuarios] = useState([]);  
    const [obraId, setObraId] = useState("");  
    const [usuarioId, setUsuarioId] = useState("");  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  
    const [observaciones, setObservaciones] = useState("");
    const [productos, setProductos] = useState([]); // Lista de productos
    const [productoId, setProductoId] = useState(""); // Producto seleccionado
    const [cantidad, setCantidad] = useState(1); // Cantidad por defecto
    const [detallesPedido, setDetallesPedido] = useState([]);

    // Cargar clientes desde la API
    useEffect(() => {
        const obtenerClientesData = async () => {
            setLoading(true);
            try {
                const clientesData = await obtenerClientes();  
                setClientes(clientesData);
            } catch (error) {
                setError("Error al cargar los clientes.");
                console.error("Error al cargar los clientes:", error);
            } finally {
                setLoading(false);
            }
        };
        obtenerClientesData();
    }, []);  

    // Cargar las obras asociadas a un cliente seleccionado
    useEffect(() => {
        if (clienteId) {
            const cargarObras = async () => {
                setLoading(true);
                try {
                    const obrasData = await buscarObrasPorCliente(clienteId);
                    setObras(obrasData);
                    setObraId(""); 
                } catch (error) {
                    setError("Error al cargar las obras.");
                    console.error("Error al cargar las obras:", error);
                } finally {
                    setLoading(false);
                }
            };
            cargarObras();
        } else {
            setObras([]);  
            setObraId("");  
        }
    }, [clienteId]);  

    // Cargar los usuarios habilitados asociados a un cliente seleccionado
    useEffect(() => {
        if (clienteId) {
            const cargarUsuarios = async () => {
                setLoading(true);
                setError(null); 
                try {
                    const response = await obtenerUsuariosHabilitadosPorCliente(clienteId);
                    if (response && Array.isArray(response) && response.length > 0) {
                        setUsuarios(response);  
                    } else {
                        setUsuarios([]);  
                    }
                    setUsuarioId(""); 
                } catch (error) {
                    setError("No se pudieron obtener los usuarios habilitados.");
                    console.error("Error al cargar los usuarios habilitados:", error);
                } finally {
                    setLoading(false);
                }
            };
            cargarUsuarios();
        } else {
            setUsuarios([]);  
            setUsuarioId("");  
        }
    }, [clienteId]);  

    // Limpiar los selects cuando el cliente cambia
    useEffect(() => {
        setObraId("");
        setUsuarioId("");
        setObras([]);
        setUsuarios([]);
    }, [clienteId]);

    // Obtener productos
    useEffect(() => {
        const obtenerProductosData = async () => {
            setLoading(true);
            try {
                const data = await obtenerProductos();
                setProductos(data); // Guardar los productos obtenidos
            } catch (error) {
                console.error("Error al obtener productos:", error);
                setError("Hubo un error al obtener los productos.");
            } finally {
                setLoading(false);
            }
        };
        obtenerProductosData();
    }, []);

    const handleAddDetalle = () => {
        if (!productoId || cantidad <= 0) { // Corregido: verificar `productoId` en lugar de `producto`
            setError("Por favor, selecciona un producto y una cantidad válida.");
            return;
        }
    
        const selectedProducto = productos.find(p => p.id === Number(productoId));
        if (!selectedProducto) {
            setError("El producto seleccionado no es válido.");
            return;
        }
    
        setDetallesPedido(prev => [
            ...prev,
            { productoId, cantidad, nombreProducto: selectedProducto.nombre }
        ]);
    
        setProductoId("");
        setCantidad(1);
        setError(""); // Limpiar error si todo sale bien
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!clienteId || !obraId || detallesPedido.length === 0) {
            setError("Los campos Cliente, Obra y al menos un Detalle de Pedido son obligatorios.");
            console.log("Error: Falta completar campos");
            return;
        }

        // Crear el objeto del pedido
        const pedido = {
            clienteId,
            obraId,
            usuarioId: usuarioId || null, // Usuario opcional
            observaciones: observaciones || '', // Observaciones opcionales
            productos: detallesPedido.map(detalle => ({
                productoId: detalle.productoId,
                cantidad: detalle.cantidad,
            })),
        };
    
        try {
          // Crear el pedido a través de la API
          await crearPedido(pedido);
          router.push('/pedidos'); // Redirige al menú de pedidos
        } catch (error) {
          console.error('Error al crear el pedido:', error);
        }
      }

    // Eliminar detalle de pedido
    const eliminarDetalle = (index) => {
        const nuevosDetalles = [...detallesPedido];
        nuevosDetalles.splice(index, 1);  // Elimina el detalle en el índice proporcionado
        setDetallesPedido(nuevosDetalles); // Actualiza el estado con los nuevos detalles
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Crear Pedido</h1>

            <form onSubmit={handleSubmit}>
                <label className={styles.label}>Cliente</label>
                <select
                    value={clienteId}
                    onChange={(e) => setClienteId(e.target.value)}
                    className={styles.select}
                >
                    <option value="">Seleccionar Cliente</option>
                    {loading ? (
                        <option>Cargando clientes...</option>
                    ) : (
                        clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                            </option>
                        ))
                    )}
                </select>

                <div>
                    <label className={styles.label}>Obra</label>
                    <select
                        value={obraId}
                        onChange={(e) => setObraId(e.target.value)}
                        className={styles.select}
                        disabled={!clienteId}
                    >
                        <option value="">Seleccionar Obra</option>
                        {loading && !obras.length && <option>Cargando obras...</option>}
                        {obras.length > 0 ? (
                            obras.map(obra => (
                                <option key={obra.id} value={obra.id}>
                                    {obra.direccion}
                                </option>
                            ))
                        ) : (
                            <option>No hay obras disponibles</option>
                        )}
                    </select>

                    <label className={styles.label}>Usuario</label>
                    <select
                        value={usuarioId}
                        onChange={(e) => setUsuarioId(e.target.value)}
                        className={styles.select}
                        disabled={!clienteId}
                    >
                        <option value="">Seleccionar Usuario</option>
                        {loading && !usuarios.length && <option>Cargando usuarios habilitados...</option>}
                        {error && <option>{error}</option>}
                        {usuarios.length > 0 ? (
                            usuarios.map(usuario => (
                                <option key={usuario.id} value={usuario.id}>
                                    {usuario.nombre} {usuario.apellido}
                                </option>
                            ))
                        ) : (
                            <option>No hay usuarios habilitados</option>
                        )}
                    </select>
                </div>

                <div>
                    <label className={styles.label}>Observaciones</label>
                    <input
                        type="text"
                        placeholder="Ingrese observaciones"
                        value={observaciones}
                        onChange={(e) => setObservaciones(e.target.value)}
                        className={styles.input}
                    />
                </div>

                {/* Detalles del pedido (productos y cantidades) */}
                <div>
                    <h2 className={styles.subtitle}>Detalles del Pedido</h2>
                    <div className={styles.detallePedido}>
                        <label className={styles.label}>Producto</label>
                        <select
                            value={productoId}
                            onChange={(e) => setProductoId(e.target.value)}
                            className={styles.select}
                        >
                            <option value="">Seleccionar Producto</option>
                            {productos.map((producto) => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre} - ${producto.precio}
                                </option>
                            ))}
                        </select>
                        <label className={styles.label}>Cantidad</label>
                        <input
                            type="number"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            className={styles.input}
                            min="1"
                        />
                        <button
                            type="button"
                            onClick={handleAddDetalle}
                            className={styles.createButton}
                        >
                            Agregar Producto
                        </button>
                    </div>
                    {detallesPedido.length === 0 ? (
                        <p className={styles.detallesTable}>No hay productos agregados al pedido.</p>
                    ) : (
                        <table className={styles.detallesTable}>
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detallesPedido.map((detalle, index) => (
                                    <tr key={index}>
                                        <td>{detalle.nombreProducto}</td>
                                        <td>{detalle.cantidad}</td>
                                        <td>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={() => eliminarDetalle(index)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Botones */}
                <div className={styles.buttonsContainer}>
                <Link href="/productos">
                    <button className={styles.backButton}>Volver al Menú</button>
                </Link>
                <button type="submit" className={styles.submitButton}>
                    Crear Pedido
                </button>
                </div>
                
            </form>
        </div>
    );
}
