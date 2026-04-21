import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { fetchGaleria, type Galeria } from "../../services/koha-service";

export default function GaleriaHome() {
  const [galerias, setGalerias] = useState<Galeria[]>([]);
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalerias();
  }, []);

  const loadGalerias = async () => {
    try {
      const data = await fetchGaleria();
      const activas = data.filter((g) => g.activo);
      setGalerias(activas);
    } catch (error) {
      console.error("Error cargando galerías", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !galerias.length) return null;

  const galeria = galerias[0];
  const images = galeria.imagenesConUrl.map((img) => img.url);

  if (!images.length) return null;

  const isSingle = images.length === 1;

  return (
    <>
      <section className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-700 mb-1">
              Ilustracion
            </p>

            <h3 className="font-serif text-2xl font-black text-slate-800">
              {galeria.nombre}
            </h3>
          </div>

          {/* contador */}
          {!isSingle && (
            <span className="text-xs text-slate-500 font-medium">
              {current + 1} / {images.length}
            </span>
          )}
        </div>

        {/* IMAGEN */}
        <div
          onClick={() => setOpen(true)}
          className="relative cursor-pointer overflow-hidden rounded-2xl group"
        >
          <img
            key={images[current]}
            src={images[current]}
            className="w-full h-100 md:h-125 object-cover bg-slate-100 transition duration-500 ease-in-out"
          />

          {/* overlay suave */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition" />

          {/* expand */}
          <div className="absolute right-4 top-4 rounded-full bg-white/80 p-3 shadow backdrop-blur-md group-hover:scale-105 transition">
            <Expand className="h-5 w-5 text-slate-700" />
          </div>

          {!isSingle && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((c) => (c - 1 + images.length) % images.length);
                }}
                className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md p-3 shadow hover:bg-white/40 transition group-hover:opacity-100"
              >
                <ChevronLeft className="text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((c) => (c + 1) % images.length);
                }}
                className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/20 backdrop-blur-md p-3 shadow hover:bg-white/40 transition group-hover:opacity-100"
              >
                <ChevronRight className="text-white" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrent(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      current === index
                        ? "w-6 bg-white"
                        : "w-2.5 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* DESCRIPCIÓN */}
        {galeria.descripcion && (
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
            {galeria.descripcion}
          </p>
        )}

        {/* LINK */}
        {galeria.link && (
          <a
            href={galeria.link}
            target="_blank"
            className="inline-block mt-3 text-sm text-cyan-700 hover:text-cyan-900 transition underline underline-offset-4"
          >
            Ver más
          </a>
        )}
      </section>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setOpen(false)}
              className="cursor-pointer absolute -top-12 right-0 text-white hover:scale-110 transition"
            >
              <X size={28} />
            </button>

            <img
              src={images[current]}
              className="w-full rounded-2xl object-contain max-h-[80vh] shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
