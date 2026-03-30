import KohaApi from "../api/kohaApi";

export const fetchEncabezado = async () => {
  try {
    const response = await KohaApi.get("/items/encabezado");
    return response.data.data[0];
  } catch (error) {
    console.error("Error fetching encabezado:", error);
    return null;
  }
};
