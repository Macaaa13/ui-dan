'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buscarClientesPorFiltro, eliminarCliente } from '@/lib/clientes-api';
import { useRouter } from 'next/navigation';

export default function ClientesBuscarPage() {
  const router = useRouter();
  const [filtros, setFiltros] = useState({
    nombre: '',
    correoElectronico: '',
    cuit: '',
  });
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const handleBuscar = async () => {
    try {
      const filtrosConvertidos = {
        nombre: filtros.nombre || null,
        correoElectronico: filtros.correoElectronico || null,
        cuit: filtros.cuit || null,
      };

      const clientesFiltrados = await buscarClientesPorFiltro(filtrosConvertidos);
      setResults(clientesFiltrados);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = confirm(`¿Estás seguro de eliminar el cliente con ID ${id}?`);
    if (confirmacion) {
      try {
        await eliminarCliente(id); 
        alert('Cliente eliminado correctamente.');
        const nuevosResultados = results.filter(cliente => cliente.id !== id);
        setResults(nuevosResultados);
      } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        alert('Error al eliminar el cliente. Verifica el ID e intenta nuevamente.');
      }
    }
  };

  const handleEditar = (id) => {
    router.push(`/clientes/editar/${id}`);
  };

  useEffect(() => {
    const fetchClientes = async () => {
      const lista = await buscarClientesPorFiltro({}); 
      setResults(lista);
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Buscar Clientes</h1>

      {/* Filtros */}
      <div>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Correo Electrónico:
          <input
            type="text"
            name="correoElectronico"
            value={filtros.correoElectronico}
            onChange={handleInputChange}
          />
        </label>

        <label>
          CUIT:
          <input
            type="text"
            name="cuit"
            value={filtros.cuit}
            onChange={handleInputChange}
          />
        </label>

        <button onClick={handleBuscar}>Buscar</button>
      </div>

      {/* Tabla de resultados */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>CUIT</th>
            <th>Máximo Descubierto</th>
            <th>Máximo Obras en Ejecución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <Link href={`/clientes/${cliente.id}`}>{cliente.id}</Link>
              </td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correoElectronico}</td>
              <td>{cliente.cuit}</td>
              <td>${cliente.maximoDescubierto}</td>
              <td>{cliente.maxObrasEjecucion}</td>
              <td>
                {/* Botón para editar */}
                <button onClick={() => handleEditar(cliente.id)}>Editar</button>
                {/* Botón para eliminar */}
                <button onClick={() => handleEliminar(cliente.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para volver al menú */}
      <Link href="/clientes">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}