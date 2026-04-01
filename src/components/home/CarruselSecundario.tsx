import { useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

const images = ["/airbagBanner2.png", "/hemerotecaVintage.png", "/HM.png"];

export default function GaleriaHome() {
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  const isSingle = images.length === 1;

  return (
    <>
      <section className="group bg-white p-6 border border-slate-300">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 mb-1">
              Ilustracion
            </p>

            {/* Si quiere ver mas imagenes en la fototeca tendra q hacer clik y loguearse */}

            <h3 className="font-serif text-2xl font-black text-slate-900">
              Galeria de Imagenes
            </h3>
          </div>
        </div>

        {/* IMAGENES (que las imagenes del carrusel se vean completas) */}
        <div
          onClick={() => setOpen(true)}
          className="relative cursor-pointer overflow-hidden rounded-2xl"
        >
          <img
            src={images[current]}
            className="w-full h-100 md:h-125 object-contain bg-gray-300"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute right-4 top-4 rounded-full bg-white/90 p-3 shadow-md backdrop-blur">
            <Expand className="h-5 w-5" />
          </div>

          {!isSingle && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((c) => (c - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent((c) => (c + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">
          Un recorrido visual por nuestras instalaciones, archivos históricos y
          espacios de consulta.
        </p>
      </section>

      {/* MODAL PARA VER FOTO*/}
      {open && (
        <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 text-white"
            >
              <X size={28} />
            </button>

            <img
              src={images[current]}
              className="w-full rounded-2xl object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </>
  );
}
