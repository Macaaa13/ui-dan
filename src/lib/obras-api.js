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
    asignarClienteAObra
};