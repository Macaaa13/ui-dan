// Llamada directa al ms
const API_URL = 'http://localhost:6080/api/usuario-habilitado';

// Llamada al haproxy
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//const API_URL = `${API_BASE_URL}/clientes/api/usuario-habilitado`;

// Buscar usuario habilitado por Id
async function buscarUsuarioHabilitado(id, limit, offset = 0) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando usuario habilitado en: ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return [data];
    } catch (error) {
      console.error("Failed to fetch usuario habilitado:", error);
      return [];
    }
  }
  
// Crear un usuario habilitado
async function crearUsuarioHabilitado(usuario) {
  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
  } catch (error) {
      console.error("Error al crear el usuario habilitado:", error);
      throw error;
  }
}

// Obtener todos los usuarios habilitados
async function obtenerUsuariosHabilitados() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los usuarios habilitados:", error);
        throw error;
    }
}

// Eliminar un usuario habilitado
async function eliminarUsuarioHabilitado(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que el usuario habilitado se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar el usuario habilitado:", error);
        throw error;
    }
}
export {
    buscarUsuarioHabilitado,
    crearUsuarioHabilitado,
    obtenerUsuariosHabilitados,
    eliminarUsuarioHabilitado
};