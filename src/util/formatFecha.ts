export const formatFecha = (fecha?: string) => {
  if (!fecha) return "";

  const date = new Date(fecha);

  return date.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
