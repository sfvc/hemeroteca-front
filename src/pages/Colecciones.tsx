import { useMemo, useState } from "react";
import { ChevronRight, Check } from "lucide-react";
import EditorialHero from "../components/home/EditorialNavbar";

type Categoria = "colecciones" | "diarios" | "revistas";
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
}

{
  /* CARD DE FILTROS EJEMPLO */
}

const filtros: FiltroCard[] = [
  {
    id: "colecciones",
    titulo: "Nuestras colecciones",
    descripcion:
      "Ediciones históricas y colecciones documentales para consulta y archivo.",
    imagen: "/ColeccionesMalvinas.jpg",
    badge: "Colecciones",
    bgColor: "bg-blue-500",
  },
  {
    id: "diarios",
    titulo: "Diarios",
    descripcion:
      "Publicaciones diarias con portadas destacadas y material de hemeroteca.",
    imagen: "/DiarioTimes.jpeg",
    badge: "Informativo",
    bgColor: "#10b981",
  },
  {
    id: "revistas",
    titulo: "Revistas",
    descripcion:
      "Revistas culturales, sociales e institucionales organizadas por colección.",
    imagen:
      "https://revistaestilopropio.com/wp-content/uploads/2020/02/slide-6.jpg",
    badge: "Archivo",
    bgColor: "bg-purple-500",
  },
];

{
  /* MINI CARDS DE EJEMPLO (municipal y digital separadas) */
}

const itemsColeccion: Record<TipoHemeroteca, ItemColeccion[]> = {
  municipal: [
    {
      id: 1,
      titulo: "El Ancasti",
      categoria: "diarios",
      imagen: "/Ancasti.jpg",
      descripcion: "Edición matutina",
    },
    {
      id: 2,
      titulo: "La Unión",
      categoria: "diarios",
      imagen: "/Ancasti.jpg",
      descripcion: "Portada histórica",
    },
    {
      id: 3,
      titulo: "El Ambato Edicion Histórica 1920-1950",
      categoria: "colecciones",
      imagen: "/Ambato.jpeg",
      descripcion: "Colección institucional n° 23",
    },
    {
      id: 4,
      titulo: "El Ambato Edicion Histórica 1920-1950",
      categoria: "colecciones",
      imagen: "/Ambato.jpeg",
      descripcion: "Archivo de consulta n° 32",
    },
    {
      id: 5,
      titulo: "Revista Cultural",
      categoria: "revistas",
      imagen: "/RevistaAroman.png",
      descripcion: "Edición especial",
    },
    {
      id: 6,
      titulo: "Revista Patrimonio",
      categoria: "revistas",
      imagen: "/RevistaAroman.png",
      descripcion: "Archivo gráfico",
    },
    {
      id: 7,
      titulo: "Crónica Local",
      categoria: "diarios",
      imagen: "/Ancasti.jpg",
      descripcion: "Hemeroteca diaria",
    },
    {
      id: 8,
      titulo: "El Ambato Edicion Histórica 1920-1950",
      categoria: "colecciones",
      imagen: "/Ambato.jpeg",
      descripcion: "Colección regional n° 45",
    },
    {
      id: 9,
      titulo: "Revista Historia",
      categoria: "revistas",
      imagen: "/RevistaAroman.png",
      descripcion: "Número de colección",
    },
  ],

  digital: [
    {
      id: 10,
      titulo: "Archivo Digital Catamarca",
      categoria: "colecciones",
      imagen: "/ColeccionesLa.png",
      descripcion: "Colección digitalizada",
    },
    {
      id: 11,
      titulo: "Diario Web Histórico",
      categoria: "diarios",
      imagen:
        "https://files.pucp.education/puntoedu/wp-content/uploads/2021/02/23005346/abridora-diarios-1200x800.jpg",
      descripcion: "Ediciones en formato digital",
    },
    {
      id: 12,
      titulo: "Revista Digital Patrimonio",
      categoria: "revistas",
      imagen: "/RevistaAroman.png",
      descripcion: "Publicación digital",
    },
  ],
};

{
  /* NOMBRES DE CATEGORIAS */
}

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
    /* Card de filtos + estado de activo/seleccionado */
  }

  return (
    <article
      onClick={onClick}
      className={`
    group w-full overflow-hidden shadow-md cursor-pointer
    hover:shadow-md
    ${
      activo
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
          className={`font-serif text-xl font-black ${
            activo ? "text-slate-900" : "text-slate-900"
          }`}
        >
          {item.titulo}
        </h3>

        <p className="mt-2 text-sm leading-5 text-slate-600">
          {item.descripcion}
        </p>

        <span
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${
            activo ? "text-slate-900" : "text-slate-800 group-hover:gap-3"
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
  /* MINI CARDS DE EJEMPLO (resultados de busqueda) */
}

function MiniCard({ item }: { item: ItemColeccion }) {
  return (
    <article className="group overflow-hidden bg-slate-100 shadow-lg cursor-pointer">
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

        <span className="mt-4 inline-flex items-center gap-2 text-md font-semibold text-slate-800 transition group-hover:gap-3 cursor-pointer">
          Ver más
          <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

{
  /* FUNCION ACTIVO DE LAS CARDS FILTRO */
}

export default function Colecciones() {
  const [filtroActivo, setFiltroActivo] = useState<Categoria>("colecciones");
  const [tipoActivo, setTipoActivo] = useState<TipoHemeroteca>("municipal");

  const itemsFiltrados = useMemo(() => {
    return itemsColeccion[tipoActivo].filter(
      (item) => item.categoria === filtroActivo,
    );
  }, [filtroActivo, tipoActivo]);

  return (
    <section className="px-4 pb-6 pt-2 md:px-6 lg:px-8">
      {/* NAVBAR */}

      <EditorialHero />

      {/* BOTONES DESLIZANTE HEMEROTECA MUNICIPAL/DIGITAL */}

      <div className="mt-5 mb-6 flex items-center justify-center gap-8">
        <button
          title="Archivos Fisicos disponibles en la Hemeroteca"
          onClick={() => setTipoActivo("municipal")}
          className={`pb-3 text-xl font-bold uppercase font-serif transition cursor-pointer flex flex-col items-center ${
            tipoActivo === "municipal"
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
          className={`pb-3 text-xl font-bold uppercase font-serif transition cursor-pointer flex flex-col items-center ${
            tipoActivo === "digital"
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
          className={`flex w-[200%] transition-transform duration-500 ease-in-out ${
            tipoActivo === "municipal" ? "translate-x-0" : "-translate-x-1/2"
          }`}
        >
          <div className="w-1/2 shrink-0 pr-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Categoria seleccionada
              </span>
              <h1 className="text-2xl font-bold uppercase text-slate-800 font-serif">
                Selecciona el tipo de Categoria:
              </h1>
            </div>

            <div className="mb-5 pt-1 pb-3" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtros.map((item) => (
                <FiltroPrincipalCard
                  key={`municipal-${item.id}`}
                  item={item}
                  activo={filtroActivo === item.id}
                  onClick={() => setFiltroActivo(item.id)}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                  Categoria seleccionada
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
          </div>

          <div className="w-1/2 shrink-0 pl-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
                Colección seleccionada
              </span>
              <h1 className="text-2xl font-bold uppercase text-slate-800 font-serif">
                Selecciona el tipo de Documento:
              </h1>
            </div>

            <div className="mb-5 pt-1 pb-3" />

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtros.map((item) => (
                <FiltroPrincipalCard
                  key={`digital-${item.id}`}
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
          </div>
        </div>
      </div>
    </section>
  );
}
