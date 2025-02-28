// Llamada directa al ms
const API_URL = 'http://localhost:6080/api/clientes';

// Llamada al haproxy
//const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//const API_URL = `${API_BASE_URL}/clientes/api/clientes`;

// Obtener todos los clientes
async function obtenerClientes() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los clientes:", error);
        throw error;
    }
}

async function buscarClientesPorFiltro(filtros) {
    const { nombre, correoElectronico, cuit } = filtros;

    const url = new URL(`${API_URL}/buscar`);
    if (nombre) url.searchParams.append('nombre', nombre);
    if (correoElectronico) url.searchParams.append('correoElectronico', correoElectronico);
    if (cuit) url.searchParams.append('cuit', cuit);

    console.log('Buscando clientes con filtros en:', url.toString());

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch clientes:", error);
        return [];
    }
}

// Obtener un cliente por ID
async function obtenerClientePorId(id) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando cliente en: ', apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el cliente:", error);
        throw error;
    }
}

// Crear un cliente
async function crearCliente(cliente) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear el cliente:", error);
        throw error;
    }
}

// Actualizar un cliente
async function actualizarCliente(id, cliente) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cliente),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        throw error;
    }
}

// Agregar usuarios habilitados a un cliente
async function agregarUsuariosHabilitados(id, usuarios) {
    try {
        const response = await fetch(`${API_URL}/usuario-habilitado/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarios),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar usuarios habilitados:", error);
        throw error;
    }
}

// Eliminar un cliente
async function eliminarCliente(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que el cliente se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar el cliente:", error);
        throw error;
    }
}

export {
    obtenerClientes,
    obtenerClientePorId,
    buscarClientesPorFiltro,
    crearCliente,
    actualizarCliente,
    agregarUsuariosHabilitados,
    eliminarCliente
};