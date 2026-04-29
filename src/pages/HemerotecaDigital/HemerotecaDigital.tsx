import { useMemo, useState } from "react";
import { ChevronRight, Check, CalendarDays, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// DATOS ESTÁTICOS
// ─────────────────────────────────────────────────────────────────────────────
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
  numeroEdicion?: string;
  tipoReal?: string;
}

const ITEMS_ESTATICOS: ItemColeccion[] = [
  // ── COLECCIONES (2 items) ──────────────────────────────────────────────────
  {
    id: 1,
    titulo: "Colección Malvinas",
    categoria: "colecciones",
    imagen: "/ColeccionesMalvinas.jpg",
    descripcion: "Archivo documental sobre la gesta de Malvinas.",
    subtitulo: "Memoria histórica",
    fecha: "1982-04-02",
    numeroEdicion: "1",
    tipoReal: "Colección",
  },
  {
    id: 2,
    titulo: "Colección Independencia",
    categoria: "colecciones",
    imagen: "/ColeccionesMalvinas.jpg",
    descripcion: "Documentos sobre la independencia argentina.",
    subtitulo: "Patrimonio nacional",
    fecha: "2016-07-09",
    numeroEdicion: "2",
    tipoReal: "Colección",
  },

  // ── ESPECIALES (2 items) ───────────────────────────────────────────────────
  {
    id: 3,
    titulo: "Fondo Histórico Municipal",
    categoria: "especiales",
    imagen: "/ColeccionesEsp.jpg",
    descripcion: "Material patrimonial de la municipalidad.",
    subtitulo: "Archivo especial",
    fecha: "2020-10-15",
    numeroEdicion: "1",
    tipoReal: "Especial",
  },
  {
    id: 4,
    titulo: "Documentos Fundacionales",
    categoria: "especiales",
    imagen: "/ColeccionesEsp.jpg",
    descripcion: "Actas y decretos fundacionales de la ciudad.",
    subtitulo: "Colección especial",
    fecha: "2018-03-20",
    numeroEdicion: "1",
    tipoReal: "Especial",
  },

  // ── REVISTAS (2 items) ─────────────────────────────────────────────────────
  {
    id: 5,
    titulo: "Revista Aromán",
    categoria: "revistas",
    imagen: "/RevistaAroman.png",
    descripcion: "Publicación cultural de la región.",
    subtitulo: "Cultura regional",
    fecha: "2023-06-01",
    numeroEdicion: "45",
    tipoReal: "Revista",
  },
  {
    id: 6,
    titulo: "Revista Pacha",
    categoria: "revistas",
    imagen: "/RevistaAroman.png",
    descripcion: "Arte, identidad y territorio.",
    subtitulo: "Arte e identidad",
    fecha: "2023-09-01",
    numeroEdicion: "12",
    tipoReal: "Revista",
  },

  // ── PERIÓDICOS (2 items) ───────────────────────────────────────────────────
  {
    id: 7,
    titulo: "The Times - Edición Histórica",
    categoria: "periodicos",
    imagen: "/DiarioTimes.jpeg",
    descripcion: "Diario histórico digitalizado.",
    subtitulo: "Archivo periodístico",
    fecha: "1950-01-10",
    numeroEdicion: "100",
    tipoReal: "Periódico",
  },
  {
    id: 8,
    titulo: "El Ancasti",
    categoria: "periodicos",
    imagen: "/DiarioTimes.jpeg",
    descripcion: "Principal diario de la provincia de Catamarca.",
    subtitulo: "Prensa regional",
    fecha: "2022-11-25",
    numeroEdicion: "201",
    tipoReal: "Periódico",
  },
];
// ─────────────────────────────────────────────────────────────────────────────

interface FiltroCard {
  id: Categoria;
  titulo: string;
  descripcion: string;
  imagen: string;
  badge: string;
}

const filtros: FiltroCard[] = [
  {
    id: "colecciones",
    titulo: "Colecciones",
    descripcion: "Mira nuestras colecciones.",
    imagen: "/ColeccionesMalvinas.jpg",
    badge: "Colección",
  },
  {
    id: "especiales",
    titulo: "Colecciones Especiales",
    descripcion:
      "Colecciones con Material patrimonial y publicaciones destacadas.",
    imagen: "/ColeccionesEsp.jpg",
    badge: "Especial",
  },
  {
    id: "revistas",
    titulo: "Revistas",
    descripcion: "Revistas culturales, históricas y sociales.",
    imagen: "/RevistaAroman.png",
    badge: "Revistas",
  },
  {
    id: "periodicos",
    titulo: "Periódicos",
    descripcion: "Diarios y material periodístico digitalizado.",
    imagen: "/DiarioTimes.jpeg",
    badge: "Periódicos",
  },
];

const nombresCategoria: Record<Categoria, string> = {
  revistas: "Revistas",
  periodicos: "Periódicos",
  colecciones: "Colecciones",
  especiales: "Colecciones Especiales",
};

function formatearFecha(fecha?: string) {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function HeroHemerotecaDigital({
  onGoHome,
  onGoCatalogo,
}: {
  onGoHome: () => void;
  onGoCatalogo: () => void;
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

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.28em] text-cyan-100 backdrop-blur-sm">
          Archivo patrimonial
        </p>
        <h1 className="mt-5 font-serif text-4xl font-black tracking-tight text-white sm:text-5xl md:text-7xl">
          Hemeroteca
          <span className="block text-cyan-100">Digital</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200 md:text-base">
          Consultá publicaciones digitalizadas, colecciones especiales, revistas
          y periódicos históricos desde un solo lugar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={onGoHome}
            className="cursor-pointer inline-flex min-w-55 items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900"
          >
            Hemeroteca Municipal
          </button>
          <button
            onClick={onGoCatalogo}
            className="cursor-pointer inline-flex min-w-55 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-400/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-50 backdrop-blur-md transition hover:bg-cyan-500 hover:text-slate-950"
          >
            Catálogo Digital
          </button>
        </div>
      </div>
    </div>
  );
}

function FiltroPrincipalCard({
  item,
  activo,
  onClick,
}: {
  item: FiltroCard;
  activo: boolean;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ${
        activo
          ? "-translate-y-1 ring-2 ring-cyan-700"
          : "hover:-translate-y-1 hover:shadow-xl"
      }`}
    >
      <div className="relative aspect-6/3 overflow-hidden">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-900/20 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
          {item.badge}
        </div>
        {activo && (
          <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <Check className="h-5 w-5" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-serif text-xl font-black">{item.titulo}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm leading-6 text-slate-600">{item.descripcion}</p>
        <span
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${
            activo ? "text-cyan-700" : "text-slate-800 group-hover:gap-3"
          }`}
        >
          {activo ? "Filtro activo" : "Ver publicaciones"}
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

function PublicacionCard({
  item,
}: {
  item: ItemColeccion;
  onOpen: () => void;
}) {
  return (
    <article className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-600 hover:shadow-xl">
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-700 backdrop-blur-sm">
          {nombresCategoria[item.categoria]}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 font-serif text-lg font-black leading-tight text-slate-900">
          {item.titulo}
        </h3>
        <div className="space-y-2 border-t border-slate-100 pt-3 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-cyan-600" />
            <span>{formatearFecha(item.fecha) || "Sin fecha"}</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-cyan-600" />
            <span>
              {item.numeroEdicion
                ? `Edición N° ${item.numeroEdicion}`
                : "Edición sin número"}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HemerotecaDigital() {
  const navigate = useNavigate();
  const [filtroActivo, setFiltroActivo] = useState<Categoria>("colecciones");

  const itemsFiltrados = useMemo(() => {
    return ITEMS_ESTATICOS.filter((i) => i.categoria === filtroActivo);
  }, [filtroActivo]);

  return (
    <section className="min-h-screen bg-[#f7f8fb] pb-12 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        <HeroHemerotecaDigital
          onGoHome={() => navigate("/")}
          onGoCatalogo={() => navigate("/catalogo-digital")}
        />

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filtros.map((filtro) => (
            <FiltroPrincipalCard
              key={filtro.id}
              item={filtro}
              activo={filtroActivo === filtro.id}
              onClick={() => setFiltroActivo(filtro.id)}
            />
          ))}
        </div>

        <div className="mt-8 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
              Resultados disponibles
            </p>
            <h3 className="mt-2 font-serif text-3xl font-black text-slate-950">
              {nombresCategoria[filtroActivo]}
            </h3>
          </div>
        </div>

        {itemsFiltrados.length > 0 ? (
          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {itemsFiltrados.map((item) => (
              <PublicacionCard
                key={`${item.categoria}-${item.id}`}
                item={item}
                onOpen={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-20 text-center">
            <p className="font-serif text-xl font-bold text-slate-400">
              No se encontraron publicaciones con los filtros seleccionados
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
