import { useMemo, useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import EditorialHero from "../components/home/EditorialNavbar";

type Categoria = "colecciones" | "diarios" | "revistas";

interface FiltroCard {
  id: Categoria;
  titulo: string;
  descripcion: string;
  imagen: string;
  badge: string;
}

interface ItemColeccion {
  id: number;
  titulo: string;
  categoria: Categoria;
  imagen: string;
  descripcion?: string;
}

const filtros: FiltroCard[] = [
  {
    id: "colecciones",
    titulo: "Nuestras colecciones",
    descripcion:
      "Ediciones históricas y colecciones documentales para consulta y archivo.",
    imagen: "/ColeccionesMalvinas.jpg",
    badge: "Colecciones",
  },
  {
    id: "diarios",
    titulo: "Diarios",
    descripcion:
      "Publicaciones diarias con portadas destacadas y material de hemeroteca.",
    imagen: "/DiarioTimes.jpeg",
    badge: "Informativo",
  },
  {
    id: "revistas",
    titulo: "Revistas",
    descripcion:
      "Revistas culturales, sociales e institucionales organizadas por colección.",
    imagen:
      "https://revistaestilopropio.com/wp-content/uploads/2020/02/slide-6.jpg",
    badge: "Archivo",
  },
];

const itemsColeccion: ItemColeccion[] = [
  {
    id: 1,
    titulo: "El Ancasti",
    categoria: "diarios",
    imagen:
      "https://files.pucp.education/puntoedu/wp-content/uploads/2021/02/23005346/abridora-diarios-1200x800.jpg",
    descripcion: "Edición matutina",
  },
  {
    id: 2,
    titulo: "La Unión",
    categoria: "diarios",
    imagen:
      "https://files.pucp.education/puntoedu/wp-content/uploads/2021/02/23005346/abridora-diarios-1200x800.jpg",
    descripcion: "Portada histórica",
  },
  {
    id: 3,
    titulo: "Boletín Municipal",
    categoria: "colecciones",
    imagen: "/ColeccionesLa.png",
    descripcion: "Colección institucional",
  },
  {
    id: 4,
    titulo: "Periódico Regional",
    categoria: "colecciones",
    imagen: "/ColeccionesLa.png",
    descripcion: "Archivo de consulta",
  },
  {
    id: 5,
    titulo: "Revista Cultural",
    categoria: "revistas",
    imagen: "/Revistas.png",
    descripcion: "Edición especial",
  },
  {
    id: 6,
    titulo: "Revista Patrimonio",
    categoria: "revistas",
    imagen: "/Revistas.png",
    descripcion: "Archivo gráfico",
  },
  {
    id: 7,
    titulo: "Crónica Local",
    categoria: "diarios",
    imagen:
      "https://files.pucp.education/puntoedu/wp-content/uploads/2021/02/23005346/abridora-diarios-1200x800.jpg",
    descripcion: "Hemeroteca diaria",
  },
  {
    id: 8,
    titulo: "Semanario del Valle",
    categoria: "colecciones",
    imagen: "/ColeccionesLa.png",
    descripcion: "Colección regional",
  },
  {
    id: 9,
    titulo: "Revista Historia",
    categoria: "revistas",
    imagen: "/Revistas.png",
    descripcion: "Número de colección",
  },
];

const nombresCategoria: Record<Categoria, string> = {
  colecciones: "Colecciones",
  diarios: "Diarios",
  revistas: "Revistas",
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
    /* Cards que funcionan como filtro */
  }

  return (
    <article
      onClick={onClick}
      className="group w-full overflow-hidden bg-white shadow-md transition duration-300 hover:scale-[1.02] hover:shadow-md cursor-pointer"
    >
      <div className="relative aspect-6/4 overflow-hidden">
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
          <div className="absolute right-0 top-0 m-4 flex items-center gap-1.5 rounded-full bg-cyan-600 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg">
            <Check className="h-3 w-3" />
            Activo
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-serif text-xl font-black text-slate-900">
          {item.titulo}
        </h3>

        <p className="mt-2 text-sm leading-5 text-slate-600">
          {item.descripcion}
        </p>

        <span
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${
            activo ? "text-cyan-700" : "text-slate-800 group-hover:gap-3"
          }`}
        >
          {activo ? "Filtro seleccionado" : "Seleccionar filtro"}
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

{
  /* Card de miniatura */
}

function MiniCard({ item }: { item: ItemColeccion }) {
  return (
    <article className="group overflow-hidden bg-slate-100 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
      <div className="relative aspect-3/4 overflow-hidden bg-slate-100">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
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
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {item.descripcion}
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition group-hover:gap-3 cursor-pointer">
          Ver más
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function Colecciones() {
  const [filtroActivo, setFiltroActivo] = useState<Categoria>("colecciones");

  const itemsFiltrados = useMemo(() => {
    return itemsColeccion.filter((item) => item.categoria === filtroActivo);
  }, [filtroActivo]);

  return (
    <section className="px-4 pb-6 pt-2 md:px-6 lg:px-8">
      {/* Editorial Hero */}

      <EditorialHero />
      <div className="mb-5 border-b pt-5 border-slate-300 pb-3" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {filtros.map((item) => (
          <FiltroPrincipalCard
            key={item.id}
            item={item}
            activo={filtroActivo === item.id}
            onClick={() => setFiltroActivo(item.id)}
          />
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
            Colección seleccionada
          </span>
          <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
            {nombresCategoria[filtroActivo]}
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {itemsFiltrados.length} elemento
            {itemsFiltrados.length !== 1 ? "s" : ""} disponible
            {itemsFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {itemsFiltrados.map((item) => (
          <MiniCard key={item.id} item={item} />
        ))}
      </div>

      {itemsFiltrados.length === 0 && (
        <div className="mt-10 rounded-sm border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="font-serif text-2xl font-bold text-slate-800">
            No hay elementos en esta categoría
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Probá seleccionando otro filtro.
          </p>
        </div>
      )}
    </section>
  );
}
