import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import KohaApi from "../../api/kohaApi";
import {
  fetchSeccion_1,
  fetchSeccion_2,
  fetchSeccion_3,
  fetchSeccion_4,
} from "../../services/koha-service";
import LoaderDigital from "../extras/LoaderDigital";

interface Seccion {
  id: number;
  titulo: string;
  imagen: string;
  descripcion: string;
  link?: string;
  activo: boolean;
}

const CATEGORIAS: Record<number, string> = {
  0: "Conocimiento",
  1: "Informativo",
  2: "Informativo",
  3: "Investigación",
};

const RUTAS_INTERNAS: Record<number, (link?: string) => string> = {
  0: () => "/catalogo",
  1: (link: string | undefined) => `/video?section=2&url=${encodeURIComponent(link ?? "")}`,
  2: () => `/blog`,
};

const SkeletonCard = () => (
  <div className="overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] animate-pulse">
    <div className="aspect-4/3 bg-slate-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-1/3" />
      <div className="h-5 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-full" />
      <div className="h-3 bg-slate-200 rounded w-5/6" />
    </div>
  </div>
);

export default function SeccionesSecundarias() {
  const [secciones, setSecciones] = useState<(Seccion | null)[]>([null, null, null, null]);
  const [loading, setLoading] = useState(true);
  const [showDigitalLoader, setShowDigitalLoader] = useState(false);
  const navigate = useNavigate();

  const apiUrl = KohaApi.defaults.baseURL || "";

  useEffect(() => {
    const loadSecciones = async () => {
      try {
        const [s1, s2, s3, s4] = await Promise.all([
          fetchSeccion_1(),
          fetchSeccion_2(),
          fetchSeccion_3(),
          fetchSeccion_4(),
        ]);
        setSecciones([s1, s2, s3, s4]);
      } catch (error) {
        console.error("Error cargando secciones:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSecciones();
  }, []);

  const ejecutarNavegacion = (index: number, link?: string) => {
    const rutaFn = RUTAS_INTERNAS[index];

    if (rutaFn) {
      navigate(rutaFn(link));
    } else {
      if (!link) return;

      if (link.startsWith("http://") || link.startsWith("https://")) {
        window.open(link, "_blank", "noopener noreferrer");
      } else {
        navigate(link);
      }
    }
  };

  const handleNavegar = (index: number, link?: string) => {
    if (index === 3) {
      setShowDigitalLoader(true);

      sessionStorage.setItem("skipGlobalLoader", "true");

      setTimeout(() => {
        ejecutarNavegacion(index, link);
      }, 1500);

      return;
    }

    ejecutarNavegacion(index, link);
  };

  const visibles = secciones.filter(Boolean).length;
  const colsClass =
    visibles === 4 ? "sm:grid-cols-2 xl:grid-cols-4"
      : visibles === 3 ? "sm:grid-cols-2 xl:grid-cols-3"
        : visibles === 2 ? "sm:grid-cols-2"
          : "grid-cols-1";

  return (
    <>
      {showDigitalLoader && <LoaderDigital />}

      <section>
        <div className="mb-5 border-b border-slate-300 pb-3" />

        <div className={`grid gap-6 ${colsClass}`}>
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : secciones.map((item, index) => {
              if (!item) return null;

              const imagenUrl = item.imagen ? `${apiUrl}/assets/${item.imagen}` : null;
              const categoria = CATEGORIAS[index] ?? "Sección";

              return (
                <article
                  key={`${index}-${item.id}`}
                  onClick={() => handleNavegar(index, item.link)}
                  className="group cursor-pointer overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    {imagenUrl ? (
                      <img
                        src={imagenUrl}
                        alt={item.titulo}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-sm text-slate-400">
                        Sin imagen
                      </div>
                    )}

                    <div className="absolute left-0 top-0 m-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
                      {categoria}
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-serif text-xl font-black text-slate-900">
                      {item.titulo}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                      {item.descripcion.replace(/<[^>]+>/g, "")}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-md font-semibold text-slate-800 transition group-hover:gap-3">
                      Ver más
                      <ChevronRight className="h-5 w-5" />
                    </span>
                  </div>
                </article>
              );
            })}
        </div>
      </section>
    </>
  );
}
