import KohaApi from "../api/kohaApi";

/* ─── Interfaces ────────────────────────────────────────── */

interface DirectusFile {
  id: string;
  modified_on: string;
}

interface DirectusImage {
  directus_files_id: DirectusFile;
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

interface QueHacemosAPI {
  id: number;
  quienes_somos_titulo: string;
  quienes_somos: string;
  quienes_somos_imagen: string;
  que_hacemos_titulo: string;
  que_hacemos: string;
  que_hacemos_imagen: string;
}

export interface SeccionInfo {
  titulo: string;
  descripcion: string;
  imagenUrl: string;
}

export interface QueHacemos {
  quienesSomos: SeccionInfo | null;
  queHacemos: SeccionInfo | null;
}

export interface SolicitudTurnoPayload {
  dia: string;
  hora: string;
  nombreCompleto: string;
  telefono?: string;
  email: string;
  pedido?: string;
}

/* ─── Constantes ────────────────────────────────────────── */

const IMAGE_FIELDS =
  "imagenes.directus_files_id.id,imagenes.directus_files_id.modified_on";

/* ─── Helpers ────────────────────────────────────────── */

const mapImagenes = (imagenes?: DirectusImage[]) => {
  const apiUrl = KohaApi.defaults.baseURL || "";

  return (
    imagenes?.map((img) => {
      const file = img.directus_files_id;

      return {
        url: `${apiUrl}/assets/${file.id}?v=${file.modified_on}`,
      };
    }) ?? []
  );
};

/* ─── Fetch Functions ────────────────────────────────────────── */

// Encabezado
export const fetchEncabezado = async () => {
  try {
    const response = await KohaApi.get(
      "/items/encabezado?filter[activo][_eq]=true"
    );
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
    const response = await KohaApi.get(
      `/items/carrousel?fields=*,${IMAGE_FIELDS}`
    );

    const item = response.data.data?.[0];
    if (!item) return null;

    return {
      ...item,
      imagenesConUrl: mapImagenes(item.imagenes),
    };
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
    const response = await KohaApi.get(
      `/items/${seccion}?filter[activo][_eq]=true`
    );
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
      `/items/noticias?fields=*,${IMAGE_FIELDS}`
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
      `/items/galeria?fields=*,${IMAGE_FIELDS}`
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

// Secciones
export const fetchPublicacion_1 = async () => fetchPublicacion("publicacion_1");
export const fetchPublicacion_2 = async () => fetchPublicacion("publicacion_2");
export const fetchPublicacion_3 = async () => fetchPublicacion("publicacion_3");
export const fetchPublicacion_4 = async () => fetchPublicacion("publicacion_4");

const fetchPublicacion = async (publicacion: string) => {
  try {
    const response = await KohaApi.get(
      `/items/${publicacion}?filter[activo][_eq]=true`
    );
    return response.data.data ?? null;
  } catch (error) {
    console.error(`Error fetching ${publicacion}:`, error);
    return null;
  }
};

export const fetchQueHacemos = async (): Promise<QueHacemos | null> => {
  try {
    const response = await KohaApi.get<{ data: QueHacemosAPI[] }>(
      "/items/que_hacemos"
    );

    const item = response.data.data?.[0];
    if (!item) return null;

    const apiUrl = KohaApi.defaults.baseURL || "";

    const quienesSomos =
      item.quienes_somos ||
      item.quienes_somos_titulo ||
      item.quienes_somos_imagen
        ? {
            titulo: item.quienes_somos_titulo ?? "",
            descripcion: item.quienes_somos ?? "",
            imagenUrl: item.quienes_somos_imagen
              ? `${apiUrl}/assets/${item.quienes_somos_imagen}`
              : "", // 👈 importante
          }
        : null;

    const queHacemos =
      item.que_hacemos ||
      item.que_hacemos_titulo ||
      item.que_hacemos_imagen
        ? {
            titulo: item.que_hacemos_titulo ?? "",
            descripcion: item.que_hacemos ?? "",
            imagenUrl: item.que_hacemos_imagen
              ? `${apiUrl}/assets/${item.que_hacemos_imagen}`
              : "",
          }
        : null;

    return {
      quienesSomos,
      queHacemos,
    };
  } catch (error) {
    console.error("Error fetching que_hacemos:", error);
    return null;
  }
};

export const createSolicitudTurno = async (
  payload: SolicitudTurnoPayload
) => {
  try {
    const response = await KohaApi.post("/items/solicitudes", payload);
    return response.data.data;
  } catch (error) {
    console.error("Error creando solicitud de turno:", error);
    throw error;
  }
};
