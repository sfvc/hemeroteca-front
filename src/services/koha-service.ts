import KohaApi from "../api/kohaApi";

export const fetchEncabezado = async () => {
  try {
    const response = await KohaApi.get(
      "/items/encabezado?filter[activo][_eq]=true"
    );

    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching encabezado:", error);
    return null;
  }
};

export const fetchCarrousel = async () => {
  try {
    const response = await KohaApi.get(
      "/items/carrousel?fields=*,imagenes.directus_files_id"
    );

    const data = response.data.data;
    if (!data || data.length === 0) return null;

    const item = data[0];
    const apiUrl = KohaApi.defaults.baseURL || '';

    const imagenesConUrl = item.imagenes?.map(
      (img: { directus_files_id: string }) => ({
        ...img,
        url: `${apiUrl}/assets/${img.directus_files_id}`,
      })
    ) ?? [];

    return { ...item, imagenesConUrl };
  } catch (error) {
    console.error("Error fetching carrousel:", error);
    return null;
  }
};

export const fetchNovedades = async () => {
  try {
    const response = await KohaApi.get("/items/novedades");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching novedades:", error);
    return null;
  }
};

export const fetchBotonIzquierdo = async () => {
  try {
    const response = await KohaApi.get("/items/botonInicioIzquierda");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching boton:", error);
    return null;
  }
};

export const fetchBotonDerecho = async () => {
  try {
    const response = await KohaApi.get("/items/botonInicioDerecha");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching boton:", error);
    return null;
  }
};

export const fetchEquipo = async () => {
  try {
    const response = await KohaApi.get("/items/equipo");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching equipo:", error);
    return null;
  }
};

export const fecthSeccion_1 = async () => {
  try {
    const response = await KohaApi.get("/items/seccion_1");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_2 = async () => {
  try {
    const response = await KohaApi.get("/items/seccion_2");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_3 = async () => {
  try {
    const response = await KohaApi.get("/items/seccion_3");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_4 = async () => {
  try {
    const response = await KohaApi.get("/items/seccion_4");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};
