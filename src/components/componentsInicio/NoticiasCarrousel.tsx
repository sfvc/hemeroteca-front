import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchNoticias } from "../../services/koha-service";

export default function NoticiasCarousel() {
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [titulo, setTitulo] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await fetchNoticias();

      if (!data || data.length === 0) return;

      const activas = data.filter((n) => n.activo);

      if (!activas.length) return;

      const activa = activas[0];

      const urls = activa.imagenesConUrl.map((img) => img.url);

      if (!urls.length) return;

      setImagenes(urls);
      setLink(activa.link);
      setTitulo(activa.nombre);
      setDescripcion(activa.descripcion ?? "");
    };

    load();
  }, []);

  useEffect(() => {
    if (imagenes.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagenes, current]);

  if (imagenes.length === 0) return null;

  return (
    <section className="w-full border border-slate-200 overflow-hidden shadow-md p-6 bg-white">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-700 mb-1">
          Ilustración
        </p>

        <h3 className="font-serif text-2xl font-black text-slate-800">
          {titulo}
        </h3>

        <div
          className="text-sm text-slate-600 mt-2 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: descripcion }}
        />
      </div>

      {/* Contenedor SOLO del carrusel */}
      <div className="relative w-full h-105 overflow-hidden rounded-xl">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {imagenes.map((img, i) => (
            <div
              key={i}
              className="min-w-full h-full flex items-center justify-center"
            >
              <img
                src={img}
                alt={`Noticia ${i + 1}`}
                className="w-full h-full object-cover object-center cursor-pointer"
                onClick={() => window.open(link, "_blank")}
              />
            </div>
          ))}
        </div>

        {imagenes.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrent(
                  (prev) => (prev - 1 + imagenes.length) % imagenes.length,
                )
              }
              className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                color: "white",
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => setCurrent((prev) => (prev + 1) % imagenes.length)}
              className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
              style={{
                background: "rgba(255,255,255,0.18)",
                backdropFilter: "blur(8px)",
                color: "white",
              }}
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {imagenes.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full cursor-pointer transition-all ${i === current ? "bg-cyan-600 w-6" : "bg-white/90 w-2"
                    }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* <div className="flex justify-center mt-6">
        <button
          onClick={() => window.open(link, "_blank")}
          className="group flex items-center gap-2 bg-white/90 backdrop-blur text-slate-800 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-white transition-all duration-300 hover:scale-105"
        >
          Ver más
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </div> */}
    </section>
  );
}
