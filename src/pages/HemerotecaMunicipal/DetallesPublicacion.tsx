import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Eye,
} from "lucide-react";
import PdfViewer from "../../components/extras/PdfViewer";
import EditorialHero from "../../components/extras/EditorialNavbar";

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";

interface ItemColeccion {
  id: number;
  titulo: string;
  subtitulo?: string;
  categoria: Categoria;
  imagen: string;
  descripcion?: string;
  archivoPdf?: string;
  fecha?: string;
  destino?: string[];
  numeroEdicion?: string;
  tipoReal?: string;
  medio_publicador?: number;
}

interface LocationState {
  item: ItemColeccion;
  relacionados: ItemColeccion[];
  categoriaNombre?: string;
  tipoHemeroteca?: "municipal" | "digital";
}

const nombresCategoria: Record<Categoria, string> = {
  revistas: "Revistas",
  periodicos: "Periódicos",
  colecciones: "Colecciones",
  especiales: "Colecciones Especiales",
};

function formatearFecha(fecha?: string) {
  if (!fecha) return "Sin fecha";
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return "Sin fecha";
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function obtenerAnio(fecha?: string) {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return null;
  return date.getFullYear();
}

function obtenerRangoAnios(items: ItemColeccion[]) {
  const years = items
    .map((i) => obtenerAnio(i.fecha))
    .filter((y): y is number => y !== null)
    .sort((a, b) => a - b);

  if (!years.length) return "Sin fecha";
  if (years[0] === years[years.length - 1]) return `(${years[0]})`;
  return `(${years[0]} – ${years[years.length - 1]})`;
}

function buildCollectionDate(item: ItemColeccion) {
  if (item.fecha) {
    return `${formatearFecha(item.fecha)}${item.numeroEdicion ? ` • Edición N°${item.numeroEdicion}` : ""
      }`;
  }
  return item.numeroEdicion ? `Edición N°${item.numeroEdicion}` : "Sin fecha";
}

function EjemplarCard({
  ejemplar,
  esActivo,
  onClick,
}: {
  ejemplar: ItemColeccion;
  esActivo: boolean;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`group relative flex cursor-pointer flex-col overflow-hidden border transition-all duration-300 ${esActivo
        ? "border-cyan-600 shadow-lg shadow-cyan-100 ring-1 ring-cyan-500"
        : "border-slate-200 hover:border-slate-400 hover:shadow-md"
        }`}
    >
      {/* Portada */}
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        <img
          src={ejemplar.imagen}
          alt={ejemplar.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />

        {/* Overlay hover con ícono */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition duration-300 group-hover:bg-black/40">
          <div className="flex h-10 w-10 scale-75 items-center justify-center rounded-full bg-white opacity-0 shadow-lg transition duration-300 group-hover:scale-100 group-hover:opacity-100">
            <Eye className="h-5 w-5 text-slate-800" />
          </div>
        </div>

        {/* Badge activo */}
        {esActivo && (
          <div className="absolute left-0 top-0 bg-cyan-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
            Leyendo
          </div>
        )}

        {/* Año en esquina inferior */}
        {ejemplar.fecha && (
          <div className="absolute bottom-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-sm">
            {obtenerAnio(ejemplar.fecha)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col justify-between bg-white p-3">
        <div>
          <h3 className="line-clamp-2 font-serif text-sm font-black leading-tight text-slate-900">
            {ejemplar.titulo}
          </h3>
          {ejemplar.numeroEdicion && (
            <p className="mt-1 text-[11px] font-semibold text-cyan-700">
              N° {ejemplar.numeroEdicion}
            </p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            {formatearFecha(ejemplar.fecha)}
          </span>
          {ejemplar.archivoPdf ? (
            <FileText className="h-3.5 w-3.5 text-cyan-600" />
          ) : (
            <span className="text-[10px] text-slate-300">Sin PDF</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function DetallesPublicacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [pdfActivo, setPdfActivo] = useState<string | null>(null);
  const [indexActual, setIndexActual] = useState(0);
  const [paginaActual, setPaginaActual] = useState(0);
  const ITEMS_POR_PAGINA = 10;
  const { item, relacionados = [] } = state || {};

  const itemsOrdenados = useMemo(() => {
    if (!item?.medio_publicador) return [];

    return relacionados
      .filter((rel) => rel.medio_publicador === item.medio_publicador)
      .sort((a, b) => {
        const fa = a.fecha ? new Date(a.fecha).getTime() : 0;
        const fb = b.fecha ? new Date(b.fecha).getTime() : 0;
        return fa - fb;
      });
  }, [relacionados, item]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.key]);

  const indexDelItem = useMemo(
    () => itemsOrdenados.findIndex((i) => i.id === item?.id),
    [itemsOrdenados, item]
  );

  const rangoAnios = useMemo(
    () => obtenerRangoAnios(itemsOrdenados),
    [itemsOrdenados]
  );

  if (!state?.item) {
    return (
      <section className="min-h-screen bg-[#f6f5f2] px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="font-serif text-3xl font-black text-slate-900">
            No se encontró la publicación
          </h1>
          <p className="mt-4 text-slate-600">No llegaron datos a esta página.</p>
          <button
            onClick={() => navigate("/catalogo")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        </div>
      </section>
    );
  }

  const totalPaginas = Math.ceil(itemsOrdenados.length / ITEMS_POR_PAGINA);
  const itemsPagina = itemsOrdenados.slice(
    paginaActual * ITEMS_POR_PAGINA,
    (paginaActual + 1) * ITEMS_POR_PAGINA,
  );

  const abrirPdf = (indexGlobal: number) => {
    const seleccionado = itemsOrdenados[indexGlobal];
    if (!seleccionado?.archivoPdf) return;
    setIndexActual(indexGlobal);
    setPdfActivo(seleccionado.archivoPdf);
  };

  const primerIndexConPdf = itemsOrdenados.findIndex((i) => !!i.archivoPdf);

  const irAEjemplar = (ejemplar: ItemColeccion) => {
    navigate("/detalles-publicacion", {
      state: {
        item: ejemplar,
        relacionados: relacionados, // el array original del state
        categoriaNombre: nombresCategoria[ejemplar.categoria],
        tipoHemeroteca: state?.tipoHemeroteca,
      },
    });
  };

  /* ── Vista PDF ───────────────────────────────────────────────── */
  if (pdfActivo) {
    const itemData = itemsOrdenados[indexActual];
    return (
      <PdfViewer
        url={pdfActivo}
        downloadUrl={pdfActivo}
        downloadName={itemData.titulo}
        collectionName={itemData.titulo}
        collectionType={itemData.tipoReal || nombresCategoria[itemData.categoria]}
        collectionDate={buildCollectionDate(itemData)}
        onClose={() => setPdfActivo(null)}
        onBack={() => {
          const prev = indexActual - 1;
          if (prev >= 0) {
            setIndexActual(prev);
            setPdfActivo(itemsOrdenados[prev].archivoPdf || null);
          }
        }}
        onNext={() => {
          const next = indexActual + 1;
          if (next < itemsOrdenados.length) {
            setIndexActual(next);
            setPdfActivo(itemsOrdenados[next].archivoPdf || null);
          }
        }}
      />
    );
  }

  /* ── Vista detalle ───────────────────────────────────────────── */
  return (
    <section className="min-h-screen bg-white text-slate-900">
      <EditorialHero />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">

        {/* HEADER */}
        <div className="border-b border-slate-200 pb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[13px] font-bold uppercase tracking-[0.18em] text-cyan-600">
              {item?.tipoReal || (item?.categoria ? nombresCategoria[item.categoria] : "Sin categoría")}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 text-cyan-600" />
              {rangoAnios}
            </span>
            <span className="ml-auto text-sm text-slate-400">
              {itemsOrdenados.length}{" "}
              {itemsOrdenados.length === 1 ? "ejemplar" : "ejemplares"}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            {/* COLUMNA IZQUIERDA */}
            <div>
              <h1 className="font-serif text-4xl font-black uppercase tracking-tight text-slate-950 md:text-6xl">
                {item?.titulo || item?.subtitulo}
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-500">
                {item?.subtitulo || "Subtítulo o lema del ejemplar"}
              </p>

              <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                  Descripción
                </p>
                <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600">
                  <p>
                    {item?.descripcion ||
                      "Esta publicación forma parte del catálogo de la hemeroteca y reúne ejemplares conservados para consulta, investigación y difusión patrimonial."}
                  </p>
                </div>
              </div>

              {/* Datos rápidos */}
              <div className="border border-slate-200 bg-white p-5 mt-6 shadow-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Datos rápidos
                </p>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <Newspaper className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Publicación</p>
                      <p>{item?.titulo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Fecha</p>
                      <p>{formatearFecha(item?.fecha)}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Search className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Edición</p>
                      <p>
                        {item?.numeroEdicion
                          ? `N° ${item?.numeroEdicion}`
                          : "Sin número"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA */}
            <aside className="space-y-5">
              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <img
                  src={item?.imagen}
                  alt={item?.titulo}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
              </div>

              {/* Acciones */}
              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Acciones
                </p>
                <div className="space-y-3">
                  {primerIndexConPdf >= 0 ? (
                    <>
                      {/* Abrir visor */}
                      <button
                        onClick={() => abrirPdf(indexDelItem)}
                        className="flex w-full items-center justify-between rounded-none border border-cyan-700 bg-cyan-700 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-cyan-800 cursor-pointer"
                      >
                        <span className="inline-flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Abrir visor PDF
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </button>

                      {/* Descargar PDF */}
                      <a
                        href={itemsOrdenados[indexDelItem]?.archivoPdf || "#"}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-between rounded-none border border-emerald-700 bg-emerald-700 px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-emerald-800"
                      >
                        <span className="inline-flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Descargar PDF
                        </span>
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </>
                  ) : (
                    <div className="flex w-full items-center gap-2 border border-slate-200 px-4 py-3 text-sm text-slate-400">
                      <FileText className="h-4 w-4" />
                      Sin PDF disponible
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* SECCIÓN RELACIONADOS */}
        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Ordenado de más antiguo a más reciente
              </p>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
                Ejemplares relacionados
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {itemsOrdenados.length}{" "}
                {itemsOrdenados.length === 1
                  ? "ejemplar disponible"
                  : "ejemplares disponibles"}
                {itemsOrdenados.filter((i) => !!i.archivoPdf).length > 0 && (
                  <span className="ml-2 text-cyan-600">
                    · {itemsOrdenados.filter((i) => !!i.archivoPdf).length} con
                    PDF
                  </span>
                )}
              </p>
            </div>

            {totalPaginas > 1 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500">
                  Página {paginaActual + 1} de {totalPaginas}
                </span>
                <button
                  onClick={() =>
                    setPaginaActual((p) => Math.max(0, p - 1))
                  }
                  disabled={paginaActual === 0}
                  className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setPaginaActual((p) => Math.min(totalPaginas - 1, p + 1))
                  }
                  disabled={paginaActual === totalPaginas - 1}
                  className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {itemsOrdenados.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {itemsPagina.map((ejemplar) => {
                  const indexGlobal = itemsOrdenados.findIndex(
                    (i) => i.id === ejemplar.id,
                  );
                  return (
                    <EjemplarCard
                      key={`${ejemplar.id}-${indexGlobal}`}
                      ejemplar={ejemplar}
                      esActivo={ejemplar.id === item?.id}
                      onClick={() => irAEjemplar(ejemplar)}
                    />
                  );
                })}
              </div>

              {totalPaginas > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPaginaActual((p) => Math.max(0, p - 1))}
                    disabled={paginaActual === 0}
                    className="flex items-center gap-1.5 border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </button>

                  {Array.from({ length: totalPaginas }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPaginaActual(i)}
                      className={`h-9 w-9 text-sm font-semibold transition ${paginaActual === i
                        ? "bg-cyan-700 text-white"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setPaginaActual((p) => Math.min(totalPaginas - 1, p + 1))
                    }
                    disabled={paginaActual === totalPaginas - 1}
                    className="flex items-center gap-1.5 border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="font-serif text-xl font-bold text-slate-400">
                No hay ejemplares relacionados para mostrar
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
