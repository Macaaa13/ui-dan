const API_URL = 'http://localhost:6280/api/pedidos';

// Obtener todos los pedidos
async function obtenerPedidos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los pedidos:", error);
        throw error;
    }
}

// Buscar pedidos por cliente y/o estado
async function buscarPedidosPorFiltro(filtros) {
    const { clienteId, estado } = filtros;

    const url = new URL(`${API_URL}/buscar`);
    if (clienteId) url.searchParams.append('clienteId', clienteId);
    if (estado) url.searchParams.append('estado', estado);

    console.log('Buscando pedidos con filtros en:', url.toString());

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al buscar pedidos:", error);
        return [];
    }
}

// Obtener un pedido por ID
async function obtenerPedidoPorId(id) {
    const apiUrl = `${API_URL}/${id}`;
    console.log('Buscando pedido en: ', apiUrl);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener el pedido:", error);
        throw error;
    }
}

// Crear un pedido
async function crearPedido(pedido) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw error;
    }
}

// Actualizar el estado de un pedido
async function actualizarEstadoPedido(id, estado) {
    try {
        const response = await fetch(`${API_URL}/${id}/actualizar-estado`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(estado),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        throw error;
    }
}

// Eliminar un pedido
async function eliminarPedido(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return true; // Indica que el pedido se eliminó correctamente
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        throw error;
    }
}

export {
    obtenerPedidos,
    obtenerPedidoPorId,
    buscarPedidosPorFiltro,
    crearPedido,
    actualizarEstadoPedido,
    eliminarPedido
};