// Function to fetch a paginated list of Pokémon
async function buscarProducto(queryValue, limit, offset = 0) {
    const apiUrl = `/productos/api/productos`;
    console.log('querying to ',apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Failed to fetch productos:", error);
    }
  }

  async function getProductos(){
    const apiUrl = `http://localhost:6080/api/obras`;
    try {
      const response = await fetch(apiUrl);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data.results;
    } catch (error) {
      console.error("Failed to fetch productos:", error);
    }
  }

  export{
    buscarProducto,
    getProductos
  }