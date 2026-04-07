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

            const activa = data.find((n) => n.activo);
            if (!activa) return;

            const urls = activa.imagenesConUrl.map((img) => img.url);

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
    }, [imagenes]);

    if (imagenes.length === 0) return null;

    return (
        <section className="relative w-full h-105 overflow-hidden shadow-xl p-6">

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h3 className="font-serif text-2xl font-black text-slate-800">
                        {titulo}
                    </h3>

                    <p className="text-sm text-slate-600 max-w-2xl mt-2">
                        {descripcion}
                    </p>
                </div>
            </div>

            <div
                className="flex h-full transition-transform duration-700 ease-in-out"
                style={{
                    transform: `translateX(-${current * 100}%)`,
                }}
            >
                {imagenes.map((img, i) => (
                    <div key={i} className="min-w-full h-full">
                        <img
                            src={img}
                            className="w-full h-full object-cover cursor-pointer"
                            onClick={() => window.open(link, "_blank")}
                        />
                    </div>
                ))}
            </div>

            {imagenes.length > 1 && (
                <>
                    <button
                        onClick={() =>
                            setCurrent((prev) =>
                                prev === 0 ? imagenes.length - 1 : prev - 1
                            )
                        }
                        className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full hover:bg-white/50 transition"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={() =>
                            setCurrent((prev) => (prev + 1) % imagenes.length)
                        }
                        className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur p-3 rounded-full hover:bg-white/50 transition"
                    >
                        <ChevronRight />
                    </button>
                </>
            )}

            {imagenes.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {imagenes.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`h-2 rounded-full cursor-pointer transition-all ${i === current ? "bg-white w-6" : "bg-white/50 w-2"
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* VER MÁS */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => window.open(link, "_blank")}
                    className="group flex items-center gap-2 bg-white/90 backdrop-blur text-slate-800 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-white transition-all duration-300 hover:scale-105"
                >
                    Ver más
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>

        </section>
    );
}
