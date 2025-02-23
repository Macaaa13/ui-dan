'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { actualizarDescuento } from '@/lib/productos-api';
import Link from "next/link";

export default function DescuentoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idProducto: 0,
    descuento: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarDescuento(formData);
      router.push('/productos'); // Redirige al menú de productos
    } catch (error) {
      console.error("Error al actualizar el descuento:", error);
    }
  };

  return (
    <div>
      <h1>Actualizar descuento</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="ID del Producto"
          value={formData.idProducto}
          onChange={(e) => setFormData({ ...formData, idProducto: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Descuento"
          value={formData.descuento}
          onChange={(e) => setFormData({ ...formData, descuento: parseInt(e.target.value) })}
          required
        />
        <button type="submit">Actualizar descuento</button>
      </form>
      <Link href="/productos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}