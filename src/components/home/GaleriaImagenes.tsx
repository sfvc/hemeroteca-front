import { useEffect, useState } from "react";
import { fetchGaleria, type Galeria } from "../../services/koha-service";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GaleriaComponent() {
  const [galeriaActiva, setGaleriaActiva] = useState<Galeria | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchGaleria().then((data) => {
      const activa = data.find((g) => g.activo);
      setGaleriaActiva(activa || null);
    });
  }, []);

  // 👉 autoplay (opcional)
  useEffect(() => {
    if (!galeriaActiva) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === galeriaActiva.imagenesConUrl.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [galeriaActiva]);

  if (!galeriaActiva) return null;

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? galeriaActiva.imagenesConUrl.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === galeriaActiva.imagenesConUrl.length - 1 ? 0 : prev + 1
    );
  };

  const currentImage = galeriaActiva.imagenesConUrl[currentIndex];

  return (
    <section className="w-full max-w-10xl mx-auto p-6 border border-slate-100 shadow-md rounded-xl">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="font-serif text-2xl font-black text-slate-800">
                        {galeriaActiva.nombre}
                    </h3>

                    <p className="text-sm text-slate-600 max-w-2xl mt-2">
                        {galeriaActiva.descripcion}
                    </p>
                </div>
            </div>
      <div className="relative group">
        {/* 👉 Imagen clickeable */}
        <a href={galeriaActiva.link} target="_blank" rel="noopener noreferrer">
          <img
            src={currentImage.url}
            alt={`galeria-${currentIndex}`}
            className="w-full h-64 md:h-96 rounded-xl cursor-pointer transition hover:scale-[1.02]" // object-cover
          />
        </a>

        {/* 👉 Botón izquierda */}
        <button
          onClick={prevSlide}
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* 👉 Botón derecha */}
        <button
          onClick={nextSlide}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* 👉 Indicadores */}
      <div className="flex justify-center gap-2 mt-4">
        {galeriaActiva.imagenesConUrl.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-black" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
