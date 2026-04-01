import { useEffect, useState, useCallback } from "react";
import { fetchCarrousel } from "../services/koha-service";

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

    const goTo = useCallback((next: number) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setIndex(next);
            setIsTransitioning(false);
        }, 300);
    }, [isTransitioning]);

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
    const textColor = item.color_texto || "#ffffff";

    return (
        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
            style={{ height: "500px" }}>

            {/* Imagen con fade */}
            <div
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: isTransitioning ? 0 : 1 }}
            >
                <img
                    src={imageUrl}
                    alt={`${item.nombre} - imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Gradiente inferior dramático */}
            <div
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)"
                }}
            />

            {/* Barra de progreso */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-3 z-10">
                {item.imagenesConUrl.map((_, i) => (
                    <div
                        key={i}
                        className="h-0.5 flex-1 rounded-full overflow-hidden"
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

            {/* Contenido inferior */}
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                {/* Contador */}
                {/* <span
                    className="text-xs font-semibold tracking-widest uppercase mb-3 inline-block"
                    style={{ color: "rgba(255,255,255,0.6)", letterSpacing: "0.2em" }}
                >
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span> */}

                <h2
                    className="text-3xl font-bold mb-2 leading-tight"
                    style={{
                        color: textColor,
                        textShadow: "0 2px 12px rgba(0,0,0,0.4)"
                    }}
                >
                    {item.nombre}
                </h2>

                {item.descripcion && (
                    <p
                        className="text-sm mb-4"
                        style={{
                            color: textColor,
                            opacity: 0.85,
                            maxWidth: "950px"
                        }}
                    >
                        {item.descripcion}
                    </p>
                )}

                {item.link && (
                    <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:gap-3"
                        style={{
                            background: "rgba(255,255,255,0.15)",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.35)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        Ver más
                        <span style={{ fontSize: "1rem" }}>→</span>
                    </a>
                )}
            </div>

            {/* Flecha izquierda */}
            <button
                onClick={() => goTo((index - 1 + total) % total)}
                className="cursor-pointer absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: "1.2rem",
                }}
                aria-label="Anterior"
            >
                ‹
            </button>

            {/* Flecha derecha */}
            <button
                onClick={() => goTo((index + 1) % total)}
                className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    backdropFilter: "blur(8px)",
                    color: "white",
                    fontSize: "1.2rem",
                }}
                aria-label="Siguiente"
            >
                ›
            </button>

            {/* Puntos indicadores */}
            <div className="absolute bottom-5 right-7 flex gap-1.5 z-10">
                {item.imagenesConUrl.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className="cursor-pointer transition-all duration-300 rounded-full"
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
    );
}
