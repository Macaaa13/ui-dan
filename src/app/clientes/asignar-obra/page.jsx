'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { buscarClientesPorFiltro } from '@/lib/clientes-api';
import { obtenerObras, asignarClienteAObra } from '@/lib/obras-api';
import styles from './page.module.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';

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
    <div className={styles.container}>
      <h1 className={styles.title}>Asignar obra</h1>

      {/* Combo para seleccionar obra */}
      <div className={styles.selectContainer}>
        <label className={styles.label}>
          Obra que se desea asignar
          <select
            className={styles.input}
            value={obraSeleccionada}
            onChange={(e) => setObraSeleccionada(e.target.value)}
          >
            <option value="">Selecciona una obra</option>
            {obras.map((obra) => (
              <option key={obra.id} value={obra.id}>
                {`ID ${obra.id} - ${obra.direccion}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Filtros */}
      <div className={styles.filtersContainer}>
        <h3 className={styles.titleFiltrado}>Filtrado de Clientes</h3>
        <hr className={styles.separator} />
        <div className={styles.filters}>
          <label className={styles.label}>
            Nombre
            <input
              className={styles.input}
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleInputChange}
            />
          </label>

          <label className={styles.label}>
            Correo Electrónico
            <input
              type="text"
              name="correoElectronico"
              value={filtros.correoElectronico}
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            CUIT
            <input
              type="text"
              name="cuit"
              value={filtros.cuit}
              onChange={handleInputChange}
              className={styles.input}
            />
          </label>
        </div>

        <button onClick={handleBuscar} className={styles.button}>Buscar Clientes</button>
      </div>

      {/* Tabla de resultados */}
      <table className={styles.table}>
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
                <button onClick={() => handleAsignarObra(cliente.id)} className={styles.assignButton}>
                  <FontAwesomeIcon icon={faClipboardCheck} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón para volver al menú */}
      <Link href="/clientes">
        <button className={styles.backButton}>Volver al Menú</button>
      </Link>
    </div>
  );
}
