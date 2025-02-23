'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buscarClientesPorFiltro } from '@/lib/clientes-api';
import { obtenerObras, asignarClienteAObra } from '@/lib/obras-api';

export default function ClientesBuscarPage() {
  const [filtros, setFiltros] = useState({
    nombre: '',
    correoElectronico: '',
    cuit: '',
  });
  const [results, setResults] = useState([]);
  const [obras, setObras] = useState([]); // Estado para almacenar la lista de obras
  const [obraSeleccionada, setObraSeleccionada] = useState(''); // Estado para la obra seleccionada

  // Cargar la lista de obras al montar el componente
  useEffect(() => {
    const fetchObras = async () => {
      try {
        const listaObras = await obtenerObras();
        setObras(listaObras);
      } catch (error) {
        console.error('Error al obtener las obras:', error);
      }
    };

    fetchObras();
  }, []);

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

  const handleAsignarObra = async (idCliente) => {
    if (!obraSeleccionada) {
      alert('Por favor, selecciona una obra.');
      return;
    }

    const confirmacion = confirm(`¿Asignar la obra ${obraSeleccionada} al cliente con ID ${idCliente}?`);
    if (confirmacion) {
      try {
        await asignarClienteAObra(obraSeleccionada, idCliente); // Llamar a la función de asignación
        alert('Obra asignada correctamente.');
      } catch (error) {
        console.error('Error al asignar la obra:', error);
        alert('Error al asignar la obra. Verifica los datos e intenta nuevamente.');
      }
    }
  };

  return (
    <div>
      <h1>Asignar obra</h1>

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

      {/* Combo para seleccionar obra */}
      <div>
        <label>
          Seleccionar Obra:
          <select
            value={obraSeleccionada}
            onChange={(e) => setObraSeleccionada(e.target.value)}
          >
            <option value="">Selecciona una obra</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {obra.nombre} (ID: {obra.id})
              </option>
            ))}
          </select>
        </label>
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
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
              <td>{cliente.correoElectronico}</td>
              <td>{cliente.cuit}</td>
              <td>${cliente.maximoDescubierto}</td>
              <td>{cliente.maxObrasEjecucion}</td>
              <td>
                {/* Botón para asignar obra */}
                <button onClick={() => handleAsignarObra(cliente.id)}>
                  Asignar Obra
                </button>
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