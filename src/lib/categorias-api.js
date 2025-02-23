const API_URL = 'http://localhost:6180/api/categoria';

// Buscar categoría por Id
async function buscarCategoria(id, limit, offset = 0) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando categoría en: ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Failed to fetch categorias:", error);
      return [];
    }
  }
  
// Crear una categoría
async function crearCategoria(categoria) {
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(categoria),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al crear la categoria:", error);
      throw error;
  }
}

// Obtener todas las categorías
async function obtenerCategorias() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las categorias:", error);
        throw error;
    }
}

// Eliminar una categoría
async function eliminarCategoria(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que la categoria se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar la categoria:", error);
        throw error;
    }
}

export {
    buscarCategoria,
    crearCategoria,
    obtenerCategorias,
    eliminarCategoria
};