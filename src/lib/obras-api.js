const API_URL = 'http://localhost:6080/api/obras';

// Buscar obra por Id
async function buscarObra(id, limit, offset = 0) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando obra en: ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Failed to fetch obra:", error);
      return [];
    }
  }

  // Buscar obras de un cliente particular
  async function buscarObrasPorCliente(idCliente, limit = 10, offset = 0) {
    const url = new URL(`${API_URL}/cliente/${idCliente}`);
    // Opcional: añadir los parámetros 'limit' y 'offset' solo si se necesitan en el backend
    url.searchParams.append('limit', limit);
    url.searchParams.append('offset', offset);

    console.log('Buscando obras del cliente en:', url.toString());

    try {
        const response = await fetch(url);
        
        // Si la respuesta no es ok, lanzar un error con el estado HTTP
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Si el contenido de la respuesta es vacío (sin obras), manejarlo apropiadamente
        const data = await response.json();
        
        // Verificar si hay datos
        if (!data || data.length === 0) {
            console.log("No se encontraron obras para este cliente.");
            return [];
        }

        console.log("Obras obtenidas:", data); // Agregar un log para ver la respuesta
        return data;  // Devuelve las obras obtenidas
    } catch (error) {
        console.error("Error al obtener las obras del cliente:", error);
        throw error;  // Propaga el error al llamante para que lo maneje
    }
}
  
// Crear un obra
async function crearObra(obra) {
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(obra),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al crear la obra:", error);
      throw error;
  }
}

// Obtener todas las obras
async function obtenerObras() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las obras:", error);
        throw error;
    }
}

// Eliminar una obra
async function eliminarObra(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que la obra se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar la obra:", error);
        throw error;
    }
}

// Actualizar una obra
async function actualizarObra(id, obra) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obra),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar la obra:", error);
        throw error;
    }
}

async function asignarClienteAObra(idObra, idCliente) {
    try {
        const response = await fetch(`${API_URL}/${idObra}/asignar-cliente/${idCliente}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que la asignación fue exitosa
    } catch (error) {
        console.error("Error al asignar el cliente a la obra:", error);
        throw error;
    }
}

export {
    buscarObra,
    crearObra,
    obtenerObras,
    eliminarObra,
    actualizarObra,
    asignarClienteAObra,
    buscarObrasPorCliente
};