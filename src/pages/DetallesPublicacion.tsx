import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Newspaper,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PdfViewer from "../components/extrasFijos/PdfViewer";
import EditorialHero from "../components/home/EditorialNavbar";

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";

interface ItemColeccion {
  id: number;
  titulo: string;
  categoria: Categoria;
  imagen: string;
  descripcion?: string;
  archivoPdf?: string;
  fecha?: string;
  destino?: string[];
  numeroEdicion?: string;
  tipoReal?: string;
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
  return `(${years[0]} - ${years[years.length - 1]})`;
}

export default function DetallesPublicacion() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  const [pdfActivo, setPdfActivo] = useState<string | null>(null);
  const [indexActual, setIndexActual] = useState(0);

  if (!state?.item) {
    return (
      <section className="min-h-screen bg-[#f6f5f2] px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
          <h1 className="font-serif text-3xl font-black text-slate-900">
            No se encontró la publicación
          </h1>
          <p className="mt-4 text-slate-600">
            No llegaron datos a esta página.
          </p>
          <button
            onClick={() => navigate("/colecciones")}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </button>
        </div>
      </section>
    );
  }

  const { item, relacionados } = state;

  const itemsOrdenados = useMemo(() => {
    return [...relacionados].sort((a, b) => {
      const fa = a.fecha ? new Date(a.fecha).getTime() : 0;
      const fb = b.fecha ? new Date(b.fecha).getTime() : 0;
      return fa - fb;
    });
  }, [relacionados]);

  const rangoAnios = useMemo(
    () => obtenerRangoAnios(itemsOrdenados),
    [itemsOrdenados],
  );

  const abrirPdf = (index: number) => {
    const seleccionado = itemsOrdenados[index];
    if (!seleccionado?.archivoPdf) return;
    setIndexActual(index);
    setPdfActivo(seleccionado.archivoPdf);
  };

  if (pdfActivo) {
    const itemData = itemsOrdenados[indexActual];

    return (
      <PdfViewer
        url={pdfActivo}
        collectionName={itemData.titulo}
        collectionType={
          itemData.tipoReal || nombresCategoria[itemData.categoria]
        }
        collectionDate={
          itemData.fecha
            ? `${formatearFecha(itemData.fecha)}${
                itemData.numeroEdicion
                  ? ` • Edición N°${itemData.numeroEdicion}`
                  : ""
              }`
            : itemData.numeroEdicion
              ? `Edición N°${itemData.numeroEdicion}`
              : "Sin fecha"
        }
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

  return (
    <section className="min-h-screen bg-white text-slate-900">
      {/* EDITORIAL NAVBAR */}

      <EditorialHero />

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            {/* HEADER */}

            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[13px] font-bold uppercase tracking-[0.18em] text-cyan-600">
              {item.tipoReal || nombresCategoria[item.categoria]}
            </span>

            <span className="inline-flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-5 w-5 text-cyan-600" />
              {rangoAnios}
            </span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              {/* <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                {nombresCategoria[item.categoria]}
              </p> */}

              <h1 className="font-serif text-4xl font-black uppercase tracking-tight text-slate-950 md:text-6xl">
                {item.titulo}
              </h1>

              <p className="mt-3 max-w-3xl text-lg text-slate-500">
                {item.descripcion || "Subtítulo o lema del ejemplar"}
              </p>

              <div className="mt-8 border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
                  Descripción
                </p>

                <div className="mt-4 space-y-4 text-[15px] leading-7 text-slate-600">
                  <p>
                    {item.descripcion ||
                      "Esta publicación forma parte del catálogo de la hemeroteca y reúne ejemplares conservados para consulta, investigación y difusión patrimonial."}
                  </p>

                  <p>
                    La colección presenta material ordenado cronológicamente,
                    permitiendo recorrer sus ejemplares desde los más antiguos a
                    los más recientes.
                  </p>

                  <p>
                    Al seleccionar cualquier ejemplar podés abrir el PDF
                    correspondiente y navegar entre publicaciones relacionadas.
                  </p>
                </div>
              </div>
            </div>

            {/* IMAGEN DE LA PUBLICACIÓN */}

            <aside className="space-y-5">
              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
              </div>

              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Acciones
                </p>

                <div className="space-y-3">
                  {/* QUE PONDREMOS AQUI? NO LO SE */}

                  <button
                    // onClick={() => {
                    //   const primerRelacionadoConPdf = itemsOrdenados.findIndex(
                    //     (i) => !!i.archivoPdf,
                    //   );
                    //   if (primerRelacionadoConPdf >= 0)
                    //     abrirPdf(primerRelacionadoConPdf);
                    // }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-800 transition hover:border-cyan-700 hover:bg-cyan-50 cursor-pointer"
                  >
                    {/* TRABAJOS RELACIONADOS */}

                    <span className="inline-flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Trabajos relacionados
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* DATOS RAPIDOS */}

              <div className="border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                  Datos rápidos
                </p>

                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <Newspaper className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">
                        Publicación
                      </p>
                      <p>{item.titulo}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Fecha</p>
                      <p>{formatearFecha(item.fecha)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Search className="mt-0.5 h-4 w-4 text-cyan-700" />
                    <div>
                      <p className="font-semibold text-slate-900">Edición</p>
                      <p>
                        {item.numeroEdicion
                          ? `N° ${item.numeroEdicion}`
                          : "Sin número"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* RELACIONADOS */}

        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Ordenado de más antiguo a más reciente
              </p>
              <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
                Ejemplares relacionados
              </h2>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              <button className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:bg-slate-300 cursor-pointer">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="rounded-full border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-300 cursor-pointer">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {itemsOrdenados.length > 0 ? (
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {itemsOrdenados.map((ejemplar, idx) => (
                <article
                  key={`${ejemplar.id}-${idx}`}
                  onClick={() => abrirPdf(idx)}
                  className="group cursor-pointer overflow-hidden border border-slate-200 bg-[#1f232b] shadow-md transition hover:shadow-xl"
                >
                  <div className="relative aspect-3/4 overflow-hidden bg-slate-800">
                    <img
                      src={ejemplar.imagen}
                      alt={ejemplar.titulo}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.jpg";
                      }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-100 transition" />

                    <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="rounded-2xl bg-white/95 p-3 text-xs text-slate-700 shadow-lg backdrop-blur">
                        <p className="font-bold text-slate-900">
                          {ejemplar.tipoReal ||
                            nombresCategoria[ejemplar.categoria]}
                        </p>
                        <p className="mt-1">{formatearFecha(ejemplar.fecha)}</p>
                        <p className="mt-1">
                          {ejemplar.numeroEdicion
                            ? `Edición N° ${ejemplar.numeroEdicion}`
                            : "Sin número de edición"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="line-clamp-2 font-serif text-lg font-black text-white">
                      {ejemplar.titulo}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300">
                      {obtenerAnio(ejemplar.fecha) || "Sin fecha"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
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
