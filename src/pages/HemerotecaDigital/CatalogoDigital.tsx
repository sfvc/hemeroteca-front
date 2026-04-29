import { useMemo, useState, useEffect } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import KohaApi from "../../api/kohaApi";
import {
  fetchPublicacion_1,
  fetchPublicacion_2,
  fetchPublicacion_3,
  fetchPublicacion_4,
} from "../../services/koha-service";

interface PublicacionAPI {
  id: number;
  titulo: string;
  subtitulo?: string | null;
  descripcion?: string | null;
  portada_publicacion?: string | null;
  archivo_pdf?: string | null;
  nombre?: string;
  fecha_publicacion?: string;
  numero_publicacion?: string;
  destino?: string[];
  medio_publicador?: number;
}

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";

interface ItemColeccion {
  id: number;
  titulo: string;
  categoria: Categoria;
  imagen: string;
  descripcion?: string;
  subtitulo?: string;
  archivoPdf?: string;
  fecha?: string;
  destino?: string[];
  numeroEdicion?: string;
  tipoReal?: string;
  medio_publicador?: number;
}

const getAssetUrl = (fileId: string): string => {
  const apiUrl = KohaApi.defaults.baseURL ?? "";
  return `${apiUrl}/assets/${fileId}`;
};

const mapPublicacion = (
  item: PublicacionAPI,
  categoria: Categoria,
): ItemColeccion => ({
  id: item.id,
  titulo: item.titulo,
  categoria,
  imagen: item.portada_publicacion
    ? getAssetUrl(item.portada_publicacion)
    : "/placeholder.jpg",
  descripcion: item.descripcion ?? undefined,
  subtitulo: item.subtitulo ?? undefined,
  archivoPdf: item.archivo_pdf ? getAssetUrl(item.archivo_pdf) : undefined,
  fecha: item.fecha_publicacion ?? undefined,
  destino: item.destino
    ? Array.isArray(item.destino)
      ? item.destino
      : [item.destino]
    : undefined,
  numeroEdicion: item.numero_publicacion,
  medio_publicador: item.medio_publicador,
  tipoReal: item.nombre || (categoria === "revistas" ? "Revista" : "Periódico"),
});

const toArray = (
  data: PublicacionAPI | PublicacionAPI[] | null,
): PublicacionAPI[] => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

const nombresCategoria: Record<Categoria, string> = {
  revistas: "Revistas",
  periodicos: "Periódicos",
  colecciones: "Colecciones",
  especiales: "Colecciones Especiales",
};

function HeroCatalogoDigital({
  onGoHome,
  onGoColeccionDigital,
}: {
  onGoHome: () => void;
  onGoColeccionDigital: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-[#06124a] px-6 py-12 shadow-2xl md:px-10 md:py-16">
      <div className="absolute inset-0 opacity-90">
        <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute right-0 top-6 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-sky-300/10 blur-3xl" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g stroke="rgba(148, 197, 255, 0.25)" strokeWidth="1.2">
            <path
              d="M0 70 L250 160 L420 40 L610 150 L820 20 L1200 140"
              fill="none"
            />
            <path
              d="M0 220 L180 130 L360 260 L520 110 L740 250 L930 80 L1200 210"
              fill="none"
            />
            <path
              d="M0 340 L220 280 L430 360 L690 240 L860 320 L1200 260"
              fill="none"
            />
            <path d="M110 0 L210 500" fill="none" />
            <path d="M300 0 L420 500" fill="none" />
            <path d="M520 0 L560 500" fill="none" />
            <path d="M760 0 L690 500" fill="none" />
            <path d="M950 0 L900 500" fill="none" />
          </g>
          <g fill="rgba(255,255,255,0.6)">
            <circle cx="180" cy="130" r="3" />
            <circle cx="250" cy="160" r="3" />
            <circle cx="420" cy="40" r="4" />
            <circle cx="520" cy="110" r="3" />
            <circle cx="610" cy="150" r="3" />
            <circle cx="740" cy="250" r="3" />
            <circle cx="820" cy="20" r="4" />
            <circle cx="930" cy="80" r="3" />
            <circle cx="860" cy="320" r="3" />
          </g>
        </svg>
      </div>

      {/* HERO NAVBAR */}

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100 backdrop-blur-sm">
          Archivo patrimonial
        </p>
        <h1 className="mt-5 font-serif text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
          Catálogo
          <span className="block text-cyan-100">Digital</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
          Buscá ejemplares digitalizados por nombre y accedé a sus detalles
          desde un solo lugar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onGoHome}
            className="cursor-pointer inline-flex min-w-55 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          >
            Hemeroteca Municipal
          </button>
          <button
            onClick={onGoColeccionDigital}
            className="cursor-pointer inline-flex min-w-55 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-50 backdrop-blur-md transition hover:bg-cyan-300 hover:text-slate-950"
          >
            Colección Digital
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* CARDS DE RESULTADO */
}

function MiniCard({
  item,
  onOpen,
}: {
  item: ItemColeccion;
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
      className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-slate-200">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-700 backdrop-blur">
          {nombresCategoria[item.categoria]}
        </div>
      </div>
      <div className="p-4">
        <h4 className="line-clamp-2 font-serif text-lg font-black text-slate-900">
          {item.titulo}
        </h4>
        {item.descripcion && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {item.descripcion}
          </p>
        )}
        {item.fecha && (
          <p className="mt-1 text-xs text-slate-500">
            {new Date(item.fecha).toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition group-hover:gap-3">
          Ver resumen <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function CatalogoDigital() {
  const navigate = useNavigate();
  const [itemsDigital, setItemsDigital] = useState<ItemColeccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [, setLoadingColeccionDigital] = useState(false);

  const irConLoaderColeccionDigital = (ruta: string) => {
    setLoadingColeccionDigital(true);

    setTimeout(() => {
      navigate(ruta);
    }, 300);
  };

  const cargarItems = async (): Promise<ItemColeccion[]> => {
    try {
      const [pub1, pub2, pub3, pub4] = await Promise.all([
        fetchPublicacion_1(),
        fetchPublicacion_2(),
        fetchPublicacion_3(),
        fetchPublicacion_4(),
      ]);

      return [
        ...toArray(pub1).map((i) => mapPublicacion(i, "revistas")),
        ...toArray(pub2).map((i) => mapPublicacion(i, "periodicos")),
        ...toArray(pub3).map((i) => mapPublicacion(i, "especiales")),
        ...toArray(pub4).map((i) => mapPublicacion(i, "especiales")),
      ];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  useEffect(() => {
    cargarItems().then((items) => {
      const vistos = new Set<string>();
      const unicos = items.filter((i) => {
        const key = `${i.categoria}-${i.id}`;
        if (vistos.has(key)) return false;
        vistos.add(key);
        return true;
      });

      setItemsDigital(unicos.filter((i) => i.destino?.includes("2")));
      setLoading(false);
    });
  }, []);

  const itemsFiltrados = useMemo(() => {
    const texto = busqueda
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (!texto) return itemsDigital;

    return itemsDigital.filter((item) => {
      const titulo = item.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      return titulo.includes(texto);
    });
  }, [itemsDigital, busqueda]);

  return (
    <section className="min-h-screen bg-[#f7f8fb] px-4 pb-10 pt-2 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-6">
        <HeroCatalogoDigital
          onGoHome={() => navigate("/")}
          onGoColeccionDigital={() =>
            irConLoaderColeccionDigital("/hemeroteca-digital")
          }
        />

        {/* FILTRO DE BUSQUEDA */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div className="flex flex-col gap-2">
              <label className="w-max rounded-full border border-slate-100 bg-gray-50 px-3 py-1 text-[13px] font-bold uppercase text-cyan-700">
                Buscar ejemplar
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar por título del ejemplar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="h-12 w-full rounded-xl border-2 border-slate-300 bg-white pl-11 pr-10 text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10 font-semibold"
                />
                {busqueda && (
                  <button
                    onClick={() => setBusqueda("")}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={() => setBusqueda("")}
                className="cursor-pointer h-12 w-full rounded-xl bg-cyan-700 px-5 text-sm font-bold text-white transition hover:bg-slate-600 hover:text-slate-100 active:scale-[0.98] md:w-auto"
              >
                Limpiar búsqueda
              </button>
            </div>
          </div>
        </div>

        {/* SECCION DE RESULTADOS */}

        <header className="mb-1 mt-8">
          <div className="border-t border-slate-300 pt-6" />
          <span className="text-[13px] font-bold uppercase text-cyan-700">
            Resultados
          </span>
          <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
            Ejemplar general
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {loading
              ? "Cargando..."
              : `${itemsFiltrados.length} resultado${
                  itemsFiltrados.length === 1 ? "" : "s"
                }${busqueda.trim() ? ` para "${busqueda.trim()}"` : ""}`}
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
          </div>
        ) : itemsFiltrados.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {itemsFiltrados.map((item) => (
              <MiniCard
                key={`${item.categoria}-${item.id}`}
                item={item}
                onOpen={() => {
                  navigate("/detalles-publicacion", {
                    state: {
                      item,
                      relacionados: itemsFiltrados,
                      categoriaNombre: nombresCategoria[item.categoria],
                      tipoHemeroteca: "digital",
                    },
                  });
                }}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border-2 border-dashed border-slate-300 py-20 text-center">
            <p className="font-serif text-xl font-bold text-slate-400">
              {busqueda.trim()
                ? `No se encontraron ejemplares con el título "${busqueda.trim()}"`
                : "No se encontraron ejemplares"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
