import { useMemo, useState, useEffect } from "react";
import { ChevronRight, Check } from "lucide-react";
import EditorialHero from "../components/home/EditorialNavbar";
import KohaApi from "../api/kohaApi";
import { fetchPublicacion_1, fetchPublicacion_2, fetchPublicacion_3, fetchPublicacion_4 } from "../services/koha-service";
import PdfViewer from "../components/extrasFijos/PdfViewer";

interface PublicacionAPI {
  id: number;
  titulo: string;
  subtitulo?: string | null;
  portada_publicacion?: string | null;
  archivo_pdf?: string | null;
  nombre?: string;
  medio_publicador?: number;
  fecha_publicacion?: string;
  titulo_alternativo?: string | null;
  cantidad_paginas?: string;
  volumen_publicacion?: string | null;
  numero_publicacion?: string;
  destino?: string;
}

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";
type TipoHemeroteca = "municipal" | "digital";

interface FiltroCard {
  id: Categoria;
  titulo: string;
  descripcion: string;
  imagen: string;
  badge: string;
  bgColor?: string;
}

interface ItemColeccion {
  id: number;
  titulo: string;
  categoria: Categoria;
  imagen: string;
  descripcion?: string;
  archivoPdf?: string;
  fecha?: string;
  destino?: string[];
}

const getAssetUrl = (fileId: string): string => {
  const apiUrl = KohaApi.defaults.baseURL ?? "";
  return `${apiUrl}/assets/${fileId}`;
};

const mapPublicacion = (
  item: PublicacionAPI,
  categoria: Categoria
): ItemColeccion => ({
  id: item.id,
  titulo: item.titulo,
  categoria,
  imagen: item.portada_publicacion
    ? getAssetUrl(item.portada_publicacion)
    : "/placeholder.jpg",
  descripcion: item.subtitulo ?? undefined,
  archivoPdf: item.archivo_pdf ? getAssetUrl(item.archivo_pdf) : undefined,
  fecha: item.fecha_publicacion ?? undefined,
  destino: item.destino ? (Array.isArray(item.destino) ? item.destino : [item.destino]) : undefined,
});

const toArray = (
  data: PublicacionAPI | PublicacionAPI[] | null
): PublicacionAPI[] => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

const filtros: FiltroCard[] = [
  {
    id: "colecciones",
    titulo: "Colecciones",
    descripcion: "Todas las publicaciones disponibles sin distinción de tipo.",
    imagen: "/ColeccionesMalvinas.jpg",
    badge: "Colecciones",
    bgColor: "bg-blue-500",
  },
  {
    id: "revistas",
    titulo: "Revistas",
    descripcion:
      "Revistas culturales, sociales e institucionales organizadas por colección.",
    imagen: "/RevistaAroman.png",
    badge: "Archivo",
  },
  {
    id: "periodicos",
    titulo: "Periódicos",
    descripcion:
      "Publicaciones diarias con portadas destacadas y material de hemeroteca.",
    imagen: "/DiarioTimes.jpeg",
    badge: "Informativo",
    bgColor: "#10b981",
  },
  {
    id: "especiales",
    titulo: "Colecciones Especiales",
    descripcion:
      "Fondos singulares, materiales únicos y piezas de valor patrimonial excepcional.",
    imagen: "/ColeccionesLa.png",
    badge: "Especial",
  },
];

const nombresCategoria: Record<Categoria, string> = {
  revistas: "Revistas",
  periodicos: "Periódicos",
  colecciones: "Colecciones",
  especiales: "Colecciones Especiales",
};

function FiltroPrincipalCard({
  item,
  activo,
  onClick,
}: {
  item: FiltroCard;
  activo: boolean;
  onClick: () => void;
}) {
  {
    /* Card de filtos + estado de activo/seleccionado */
  }

  return (
    <article
      onClick={onClick}
      className={`
    group w-full overflow-hidden shadow-md cursor-pointer
    hover:shadow-md
    ${activo
          ? "border-2 border-cyan-700 bg-white ring-1 ring-cyan-600"
          : "border border-transparent bg-white"
        }
  `}
    >
      <div className="relative aspect-9/4 overflow-hidden">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />
        <div className="absolute left-0 top-0 m-4 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
          {item.badge}
        </div>
        {activo && (
          <div className="absolute right-0 top-0 m-4 flex items-center gap-1.5 rounded-full bg-green-600 px-2 py-1 text-white shadow-lg">
            <Check className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3
          className={`font-serif text-xl font-black ${activo ? "text-slate-900" : "text-slate-900"
            }`}
        >
          {item.titulo}
        </h3>
        <p className="mt-2 text-sm leading-5 text-slate-600">
          {item.descripcion}
        </p>
        <span
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${activo ? "text-slate-900" : "text-slate-800 group-hover:gap-3"
            }`}
        >
          {activo ? "Filtro seleccionado" : "Seleccionar filtro"}
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

function MiniCard({
  item,
  onOpen,
}: {
  item: ItemColeccion;
  onOpen: () => void;
}) {
  const handleClick = () => {
    if (item.archivoPdf) onOpen();
  };

  return (
    <article
      onClick={handleClick}
      className="group overflow-hidden bg-slate-100 shadow-lg cursor-pointer"
    >
      <div className="relative aspect-3/4 overflow-hidden bg-slate-200">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
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
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
            {item.descripcion}
          </p>
        )}
        {item.destino?.length === 2 && (
          <span className="text-[10px] text-cyan-600 font-bold">
            Fisico y Digital
          </span>
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
          Ver más
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 rounded-sm border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <p className="font-serif text-2xl font-bold text-slate-800">
        No hay elementos en esta categoría
      </p>
      <p className="mt-2 text-sm text-slate-600">
        Probá seleccionando otro filtro.
      </p>
    </div>
  );
}

/* ─── Panel reutilizable ─────────────────────────────────── */

interface PanelProps {
  filtroActivo: Categoria;
  setFiltroActivo: (c: Categoria) => void;
  items: ItemColeccion[];
  loading: boolean;
  labelCategoria: string;
  onOpenPdf: (pdf: string, index: number) => void;
}

function Panel({
  filtroActivo,
  setFiltroActivo,
  items,
  loading,
  labelCategoria,
  onOpenPdf,
}: PanelProps) {
  // "colecciones" muestra todo; el resto filtra por su categoría
  const itemsFiltrados = useMemo(
    () =>
      filtroActivo === "colecciones"
        ? items
        : items.filter((item) => item.categoria === filtroActivo),
    [items, filtroActivo]
  );

  return (
    <div>
      <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
        Categoría seleccionada
      </span>
      <h1 className="text-2xl font-bold uppercase text-slate-800 font-serif">
        Seleccioná el tipo de {labelCategoria}:
      </h1>

      <div className="mb-5 pt-1 pb-3" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {filtros.map((filtro) => (
          <FiltroPrincipalCard
            key={filtro.id}
            item={filtro}
            activo={filtroActivo === filtro.id}
            onClick={() => setFiltroActivo(filtro.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
            Categoría seleccionada
          </span>
          <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
            {nombresCategoria[filtroActivo]}
          </h2>
          {!loading && (
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {itemsFiltrados.length} elemento
              {itemsFiltrados.length !== 1 ? "s" : ""} disponible
              {itemsFiltrados.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="mt-10 flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
        </div>
      ) : itemsFiltrados.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {itemsFiltrados.map((item, index) => (
            <MiniCard
              key={`${item.categoria}-${item.id}`}
              item={item}
              onOpen={() => {
                if (item.archivoPdf) {
                  onOpenPdf(item.archivoPdf, index);
                }
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

/* ─── Página principal ───────────────────────────────────── */

export default function Colecciones() {
  const [filtroMunicipal, setFiltroMunicipal] = useState<Categoria>("colecciones");
  const [filtroDigital, setFiltroDigital] = useState<Categoria>("colecciones");
  const [tipoActivo, setTipoActivo] = useState<TipoHemeroteca>("municipal");

  const [itemsMunicipal, setItemsMunicipal] = useState<ItemColeccion[]>([]);
  const [itemsDigital, setItemsDigital] = useState<ItemColeccion[]>([]);
  const [loadingMunicipal, setLoadingMunicipal] = useState(true);
  const [loadingDigital, setLoadingDigital] = useState(true);

  // 👇 AGREGÁ ESTO ACÁ
  const [pdfActivo, setPdfActivo] = useState<string | null>(null);
  const [indexActual, setIndexActual] = useState<number>(0);
  const cargarItems = async (): Promise<ItemColeccion[]> => {
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
  };

  useEffect(() => {
    const load = async () => {
      setLoadingMunicipal(true);
      setLoadingDigital(true);

      const items = await cargarItems();

      setItemsMunicipal(items.filter((i) => i.destino?.includes("1")));
      setItemsDigital(items.filter((i) => i.destino?.includes("2")));

      setLoadingMunicipal(false);
      setLoadingDigital(false);
    };

    load();
  }, []);

  const listaActual =
    tipoActivo === "municipal" ? itemsMunicipal : itemsDigital;

  if (pdfActivo) {
    return (
      <PdfViewer
        url={pdfActivo}
        onClose={() => setPdfActivo(null)}
        onBack={() => {
          const next = indexActual - 1;
          if (next >= 0) {
            setIndexActual(next);
            setPdfActivo(listaActual[next].archivoPdf || null);
          }
        }}
        onNext={() => {
          const next = indexActual + 1;
          if (next < listaActual.length) {
            setIndexActual(next);
            setPdfActivo(listaActual[next].archivoPdf || null);
          }
        }}
      />
    );
  }

  return (
    <section className="px-4 pb-6 pt-2 md:px-6 lg:px-8">
      <EditorialHero />

      <div className="mt-5 mb-6 flex items-center justify-center gap-8">
        <button
          title="Archivos Fisicos disponibles en la Hemeroteca"
          onClick={() => setTipoActivo("municipal")}
          className={`pb-3 text-xl font-bold uppercase font-serif transition cursor-pointer flex flex-col items-center ${tipoActivo === "municipal"
            ? "text-slate-900 border-b-4 border-cyan-700"
            : "text-slate-500 border-b-2 border-transparent hover:text-slate-800"
            }`}
        >
          <span>Hemeroteca Municipal</span>
          <span className="text-sm normal-case font-normal text-slate-500">
            (Archivos físicos)
          </span>
        </button>
        <button
          title="Archivos Digitales disponibles para su Descarga y visualización"
          onClick={() => setTipoActivo("digital")}
          className={`pb-3 text-xl font-bold uppercase font-serif transition cursor-pointer flex flex-col items-center ${tipoActivo === "digital"
            ? "text-slate-900 border-b-4 border-cyan-700"
            : "text-slate-500 border-b-2 border-transparent hover:text-slate-800"
            }`}
        >
          <span>Hemeroteca Digital</span>
          <span className="text-sm normal-case font-normal text-slate-500">
            (Archivos digitales)
          </span>
        </button>
      </div>

      <div className="overflow-hidden">
        <div
          className={`flex w-[200%] transition-transform duration-500 ease-in-out ${tipoActivo === "municipal" ? "translate-x-0" : "-translate-x-1/2"
            }`}
        >
          <div className="w-1/2 shrink-0 pr-4">
            <Panel
              filtroActivo={filtroMunicipal}
              setFiltroActivo={setFiltroMunicipal}
              items={itemsMunicipal}
              loading={loadingMunicipal}
              labelCategoria="Documento"
              onOpenPdf={(pdf, index) => {
                setPdfActivo(pdf);
                setIndexActual(index);
              }}
            />
          </div>

          <div className="w-1/2 shrink-0 pl-4">
            <Panel
              filtroActivo={filtroDigital}
              setFiltroActivo={setFiltroDigital}
              items={itemsDigital}
              loading={loadingDigital}
              labelCategoria="Colección"
              onOpenPdf={(pdf, index) => {
                setPdfActivo(pdf);
                setIndexActual(index);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
