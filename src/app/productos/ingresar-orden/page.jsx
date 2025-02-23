'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ingresarOrdenProvision } from '@/lib/productos-api';
import Link from "next/link";

export default function EnterOrdenPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    idProducto: 0,
    cantidad: 0,
    precio: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ingresarOrdenProvision(formData);
      router.push('/productos'); // Redirige al menú de productos
    } catch (error) {
      console.error("Error al ingresar la orden:", error);
    }
  };

  return (
    <div>
      <h1>Ingresar orden de provisión</h1>
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
          placeholder="Cantidad"
          value={formData.cantidad}
          onChange={(e) => setFormData({ ...formData, cantidad: parseInt(e.target.value) })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={formData.precio}
          onChange={(e) => setFormData({ ...formData, precio: parseFloat(e.target.value) })}
          required
        />
        <button type="submit">Ingresar orden</button>
      </form>
      <Link href="/productos">
        <button>Volver al Menú</button>
      </Link>
    </div>
  );
}