'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { obtenerClientePorId, actualizarCliente } from '@/lib/clientes-api';
import Link from 'next/link';

export default function EditarClientePage() {
  const router = useRouter();
  const params = useParams(); // Obtener el ID del cliente de la URL
  const id = params.id; // Extraer el ID del cliente

  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    cuit: '',
    maximoDescubierto: 0,
    maxObrasEjecucion: 0,
  });

  // Obtener los datos del cliente al cargar la página
  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const cliente = await obtenerClientePorId(id); // Obtener el cliente por ID
        setFormData(cliente); // Cargar los datos en el estado
      } catch (error) {
        console.error('Error al obtener el cliente:', error);
      }
    };
    fetchCliente();
  }, [id]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarCliente(id, formData);
      alert('Cliente actualizado correctamente.');
      router.push('/clientes');
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      alert('Error al actualizar el cliente. Inténtalo de nuevo.');
    }
  };

  // Función para manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Editar Cliente</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Campo: Correo Electrónico */}
        <label>
          Correo Electrónico:
          <input
            type="email"
            name="correoElectronico"
            value={formData.correoElectronico}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Campo: CUIT */}
        <label>
          CUIT:
          <input
            type="text"
            name="cuit"
            value={formData.cuit}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Campo: Máximo Descubierto */}
        <label>
          Máximo Descubierto:
          <input
            type="number"
            name="maximoDescubierto"
            value={formData.maximoDescubierto}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Campo: Máximo Obras en Ejecución */}
        <label>
          Máximo Obras en Ejecución:
          <input
            type="number"
            name="maxObrasEjecucion"
            value={formData.maxObrasEjecucion}
            onChange={handleInputChange}
            required
          />
        </label>

        {/* Botón para guardar cambios */}
        <button type="submit">Guardar cambios</button>
      </form>

      {/* Botón para volver al menú */}
      <Link href="/clientes">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}