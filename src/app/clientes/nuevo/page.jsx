'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { crearCliente } from '@/lib/clientes-api'; 
import Link from 'next/link';
import styles from './page.module.css';  // Importar los estilos

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
    <div className={styles.container}>
      <h1 className={styles.title}>Crear nuevo cliente</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo: Nombre */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: Correo Electrónico */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Correo Electrónico</label>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={formData.correoElectronico}
            onChange={(e) => setFormData({ ...formData, correoElectronico: e.target.value })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: CUIT */}
        <div className={styles.formGroup}>
          <label className={styles.label}>CUIT</label>
          <input
            type="text"
            placeholder="CUIT"
            value={formData.cuit}
            onChange={(e) => setFormData({ ...formData, cuit: e.target.value })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: Máximo Descubierto */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Máximo Descubierto</label>
          <input
            type="number"
            placeholder="Máximo Descubierto"
            value={formData.maximoDescubierto}
            onChange={(e) => setFormData({ ...formData, maximoDescubierto: parseFloat(e.target.value) })}
            className={styles.input}
            required
          />
        </div>

        {/* Campo: Máximo Obras en Ejecución */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Máximo Obras en Ejecución</label>
          <input
            type="number"
            placeholder="Máximo Obras en Ejecución"
            value={formData.maxObrasEjecucion}
            onChange={(e) => setFormData({ ...formData, maxObrasEjecucion: parseInt(e.target.value) })}
            className={styles.input}
            required
          />
        </div>

        {/* Botones */}
        <div className={styles.buttonsContainer}>
          {/* Botón para volver al menú */}
          <Link href="/clientes">
            <button className={styles.backButton}>Volver al Menú</button>
          </Link>
          
          {/* Botón para crear el cliente */}
          <button type="submit" className={styles.createButton}>Crear cliente</button>
        </div>
      </form>
    </div>
  );
}
