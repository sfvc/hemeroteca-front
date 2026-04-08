import KohaApi from "../api/kohaApi";

/* ─── Interfaces ────────────────────────────────────────── */
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

interface GaleriaAPI {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  link: string;
  imagenes: DirectusImage[];
}

export interface Galeria {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  link: string;
  imagenesConUrl: { url: string }[];
}

/* ─── Helpers ────────────────────────────────────────── */
const mapImagenes = (imagenes?: DirectusImage[]) => {
  const apiUrl = KohaApi.defaults.baseURL || "";
  return imagenes?.map((img) => ({ url: `${apiUrl}/assets/${img.directus_files_id}` })) ?? [];
};

/* ─── Fetch Functions ────────────────────────────────────────── */

// Encabezado
export const fetchEncabezado = async () => {
  try {
    const response = await KohaApi.get("/items/encabezado?filter[activo][_eq]=true");
    return response.data.data[0] ?? null;
  } catch (error) {
    console.error("Error fetching encabezado:", error);
    return null;
  }
};

// Botones
export const fetchBotonIzquierdo = async () => {
  try {
    const response = await KohaApi.get("/items/botonInicioIzquierda");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching boton izquierdo:", error);
    return null;
  }
};

export const fetchBotonDerecho = async () => {
  try {
    const response = await KohaApi.get("/items/botonInicioDerecha");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching boton derecho:", error);
    return null;
  }
};

// Carrousel
export const fetchCarrousel = async () => {
  try {
    const response = await KohaApi.get("/items/carrousel?fields=*,imagenes.directus_files_id");
    const item = response.data.data?.[0];
    if (!item) return null;
    return { ...item, imagenesConUrl: mapImagenes(item.imagenes) };
  } catch (error) {
    console.error("Error fetching carrousel:", error);
    return null;
  }
};

// Secciones
export const fetchSeccion_1 = async () => fetchSeccion("seccion_1");
export const fetchSeccion_2 = async () => fetchSeccion("seccion_2");
export const fetchSeccion_3 = async () => fetchSeccion("seccion_3");
export const fetchSeccion_4 = async () => fetchSeccion("seccion_4");

const fetchSeccion = async (seccion: string) => {
  try {
    const response = await KohaApi.get(`/items/${seccion}?filter[activo][_eq]=true`);
    return response.data.data?.[0] ?? null;
  } catch (error) {
    console.error(`Error fetching ${seccion}:`, error);
    return null;
  }
};

// Novedades
export const fetchNovedades = async () => {
  try {
    const response = await KohaApi.get("/items/novedades");
    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching novedades:", error);
    return [];
  }
};

// Noticias
export const fetchNoticias = async (): Promise<Noticia[]> => {
  try {
    const response = await KohaApi.get<{ data: NoticiaAPI[] }>(
      "/items/noticias?fields=*,imagenes.directus_files_id"
    );
    return (response.data.data ?? []).map((item) => ({
      ...item,
      imagenesConUrl: mapImagenes(item.imagenes),
    }));
  } catch (error) {
    console.error("Error fetching noticias:", error);
    return [];
  }
};

// Reviews
export const fetchReviews = async () => {
  try {
    const response = await KohaApi.get("/items/reviews");
    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

// Equipo
export const fetchEquipo = async () => {
  try {
    const response = await KohaApi.get("/items/equipo");
    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching equipo:", error);
    return [];
  }
};

// Galería
export const fetchGaleria = async (): Promise<Galeria[]> => {
  try {
    const response = await KohaApi.get<{ data: GaleriaAPI[] }>(
      "/items/galeria?fields=*,imagenes.directus_files_id"
    );
    return (response.data.data ?? []).map((item) => ({
      ...item,
      imagenesConUrl: mapImagenes(item.imagenes),
    }));
  } catch (error) {
    console.error("Error fetching galeria:", error);
    return [];
  }
};
