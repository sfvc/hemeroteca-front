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
    const apiUrl = KohaApi.defaults.baseURL || "";

    const imagenesConUrl =
      item.imagenes?.map((img: { directus_files_id: string }) => ({
        ...img,
        url: `${apiUrl}/assets/${img.directus_files_id}`,
      })) ?? [];

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

interface DirectusImage {
  directus_files_id: string;
}

interface NoticiaAPI {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  link: string;
  imagenes: DirectusImage[];
}

export interface Noticia {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  link: string;
  imagenesConUrl: { url: string }[];
}

export const fetchNoticias = async (): Promise<Noticia[]> => {
  try {
    const response = await KohaApi.get<{ data: NoticiaAPI[] }>(
      "/items/noticias?fields=*,imagenes.directus_files_id"
    );

    const data = response.data.data;
    if (!data || data.length === 0) return [];

    const apiUrl = KohaApi.defaults.baseURL || "";

    return data.map((item) => ({
      id: item.id,
      nombre: item.nombre,
      descripcion: item.descripcion,
      activo: item.activo,
      link: item.link,
      imagenesConUrl:
        item.imagenes?.map((img) => ({
          url: `${apiUrl}/assets/${img.directus_files_id}`,
        })) ?? [],
    }));
  } catch (error) {
    console.error("Error fetching noticias:", error);
    return [];
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

export const fetchReviews = async () => {
  try {
    const response = await KohaApi.get("/items/reviews");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
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
    const response = await KohaApi.get(
      "/items/seccion_1?filter[activo][_eq]=true"
    );
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_2 = async () => {
  try {
    const response = await KohaApi.get(
      "/items/seccion_2?filter[activo][_eq]=true"
    );
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_3 = async () => {
  try {
    const response = await KohaApi.get(
      "/items/seccion_3?filter[activo][_eq]=true"
    );
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};

export const fecthSeccion_4 = async () => {
  try {
    const response = await KohaApi.get(
      "/items/seccion_4?filter[activo][_eq]=true"
    );
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching seccion:", error);
    return null;
  }
};
