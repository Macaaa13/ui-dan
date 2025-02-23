'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crearCliente } from '@/lib/clientes-api'; 
import Link from 'next/link';

export default function NewClientePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    correoElectronico: '',
    cuit: '',
    maximoDescubierto: 0,
    maxObrasEjecucion: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearCliente(formData); 
      router.push('/clientes');
    } catch (error) {
      console.error('Error al crear el cliente:', error);
    }
  };

  return (
    <div>
      <h1>Crear nuevo cliente</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          required
        />

        {/* Campo: Correo Electrónico */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={formData.correoElectronico}
          onChange={(e) => setFormData({ ...formData, correoElectronico: e.target.value })}
          required
        />

        {/* Campo: CUIT */}
        <input
          type="text"
          placeholder="CUIT"
          value={formData.cuit}
          onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
          required
        />

        {/* Campo: Máximo Descubierto */}
        <input
          type="number"
          placeholder="Máximo Descubierto"
          value={formData.maximoDescubierto}
          onChange={(e) => setFormData({ ...formData, maximoDescubierto: parseFloat(e.target.value) })}
          required
        />

        {/* Campo: Máximo Obras en Ejecución */}
        <input
          type="number"
          placeholder="Máximo Obras en Ejecución"
          value={formData.maxObrasEjecucion}
          onChange={(e) => setFormData({ ...formData, maxObrasEjecucion: parseInt(e.target.value) })}
          required
        />

        {/* Botón para crear el cliente */}
        <button type="submit">Crear cliente</button>
      </form>

      {/* Botón para volver al menú */}
      <Link href="/clientes">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}