import { useEffect, useState, useCallback } from "react";
import { fetchCarrousel } from "../../services/koha-service";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarrouselItem {
  id: number;
  nombre: string;
  descripcion?: string;
  link?: string;
  color_texto?: string | null;
  imagenesConUrl: { directus_files_id: string; url: string }[];
}

export default function Carrousel() {
  const [item, setItem] = useState<CarrouselItem | null>(null);
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCarrousel();
      if (data) setItem(data);
    };
    load();
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex(next);
        setIsTransitioning(false);
      }, 300);
    },
    [isTransitioning],
  );

  useEffect(() => {
    if (!item?.imagenesConUrl?.length) return;

    const interval = setInterval(() => {
      goTo((index + 1) % item.imagenesConUrl.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [item, index, goTo]);

  if (!item || !item.imagenesConUrl?.length) return null;

  const total = item.imagenesConUrl.length;
  const imageUrl = item.imagenesConUrl[index].url;

  const textColor = item.color_texto || "#1e293b"; 

  return (
    <section className="overflow-hidden bg-white">
      {/* Bloque imagen */}
      <div className="relative overflow-hidden" style={{ height: "460px" }}>
        {/* Imagen con fade */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: isTransitioning ? 0 : 1 }}
        >
          <img
            src={imageUrl}
            alt={`${item.nombre} - imagen ${index + 1}`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Gradiente suave */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {/* Barra de progreso */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3">
          {item.imagenesConUrl.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 overflow-hidden rounded-full"
              style={{ background: "rgba(255,255,255,0.3)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  background: "white",
                  width: i === index ? "100%" : i < index ? "100%" : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Contador */}
        <div className="absolute left-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </div>

        {/* Flecha izquierda */}
        <button
          onClick={() => goTo((index - 1 + total) % total)}
          className="cursor-pointer absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            color: "white",
          }}
          aria-label="Anterior"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Flecha derecha */}
        <button
          onClick={() => goTo((index + 1) % total)}
          className="cursor-pointer absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            color: "white",
          }}
          aria-label="Siguiente"
        >
          <ChevronRight size={24} />
        </button>

        {/* Puntos indicadores */}
        <div className="absolute bottom-5 right-7 z-10 flex gap-1.5">
          {item.imagenesConUrl.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="cursor-pointer rounded-full transition-all duration-300"
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                background: i === index ? "white" : "rgba(255,255,255,0.45)",
              }}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Card inferior pegada abajo */}
      <div className="bg-gray-100 px-5 py-4 sm:px-6 sm:py-5">
        <h2
          className="text-xl font-serif font-bold uppercase leading-tight sm:text-2xl lg:text-3xl"
          style={{ color: textColor }}
        >
          {item.nombre}
        </h2>

        {item.descripcion && (
          <p className="mt-2 text-sm leading-6" style={{ color: textColor }}>
            {item.descripcion}
          </p>
        )}

        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition"
            style={{ color: textColor }}
          >
            Ver más
            <ChevronRight className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}
