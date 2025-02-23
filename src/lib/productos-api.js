const API_URL = 'http://localhost:6180/api/productos';

// Buscar producto por Id
async function buscarProducto(id, limit, offset = 0) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando producto en: ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Failed to fetch productos:", error);
      return [];
    }
  }
  
// Crear un producto
async function crearProducto(producto) {
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(producto),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al crear el producto:", error);
      throw error;
  }
}

// Obtener todos los productos
async function obtenerProductos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}

// Eliminar un producto
async function eliminarProducto(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que el producto se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

// Ingresar una orden de provisión
async function ingresarOrdenProvision(orden) {
    try {
        const response = await fetch(`${API_URL}/enter-orden`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orden),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al ingresar la orden de provisión:", error);
        throw error;
    }
}

// Actualizar el descuento de un producto
async function actualizarDescuento(descuento) {
    try {
        const response = await fetch(`${API_URL}/descuento`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(descuento),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el descuento:", error);
        throw error;
    }
}

export {
    buscarProducto,
    crearProducto,
    obtenerProductos,
    eliminarProducto,
    ingresarOrdenProvision,
    actualizarDescuento,
};