import { useMemo, useState, useEffect } from "react";
import { ChevronRight, Check } from "lucide-react";
import EditorialHero from "../components/home/EditorialNavbar";
import KohaApi from "../api/kohaApi";
import {
  fetchPublicacion_1,
  fetchPublicacion_2,
  fetchPublicacion_3,
  fetchPublicacion_4,
} from "../services/koha-service";
import PdfViewer from "../components/extrasFijos/PdfViewer";

interface PublicacionAPI {
  id: number;
  titulo: string;
  subtitulo?: string | null;
  portada_publicacion?: string | null;
  archivo_pdf?: string | null;
  nombre?: string;
  fecha_publicacion?: string;
  numero_publicacion?: string;
  destino?: string[];
}

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";
type TipoHemeroteca = "municipal" | "digital";

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

interface FiltroCard {
  id: Categoria;
  titulo: string;
  descripcion: string;
  imagen: string;
  badge: string;
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
  descripcion: item.subtitulo ?? undefined,
  archivoPdf: item.archivo_pdf ? getAssetUrl(item.archivo_pdf) : undefined,
  fecha: item.fecha_publicacion ?? undefined,
  destino: item.destino
    ? Array.isArray(item.destino)
      ? item.destino
      : [item.destino]
    : undefined,
  numeroEdicion: item.numero_publicacion,
  tipoReal: item.nombre || (categoria === "revistas" ? "Revista" : "Periódico"),
});

const toArray = (
  data: PublicacionAPI | PublicacionAPI[] | null,
): PublicacionAPI[] => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

const filtros: FiltroCard[] = [
  {
    id: "colecciones",
    titulo: "Colecciones",
    descripcion: "Todas las publicaciones disponibles.",
    imagen: "/ColeccionesMalvinas.jpg",
    badge: "Colecciones",
  },
  {
    id: "especiales",
    titulo: "Colecciones Especiales",
    descripcion: "Materiales únicos de valor patrimonial.",
    imagen: "/ColeccionesEsp.jpg",
    badge: "Colecciones Especiales",
  },
  {
    id: "revistas",
    titulo: "Revistas",
    descripcion: "Revistas culturales y sociales.",
    imagen: "/RevistaAroman.png",
    badge: "Informativo",
  },
  {
    id: "periodicos",
    titulo: "Periódicos",
    descripcion: "Publicaciones diarias y material de hemeroteca.",
    imagen: "/DiarioTimes.jpeg",
    badge: "Informativo",
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
  return (
    <article
      onClick={onClick}
      className={`group w-full overflow-hidden shadow-md cursor-pointer transition-all ${
        activo
          ? "border-2 border-cyan-700 bg-white ring-1 ring-cyan-600"
          : "border border-transparent bg-white"
      }`}
    >
      <div className="relative aspect-9/4 overflow-hidden">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-0 top-0 m-4 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-700 backdrop-blur">
          {item.badge}
        </div>
        {activo && (
          <div className="absolute right-0 top-0 m-4 flex items-center gap-1.5 rounded-full bg-green-600 px-2 py-1 text-white shadow-lg">
            <Check className="h-6 w-6" />
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
          className={`mt-4 inline-flex items-center gap-2 text-sm font-semibold transition ${activo ? "text-slate-900" : "text-slate-800 group-hover:gap-3"}`}
        >
          {activo ? "Filtro seleccionado" : "Seleccionar filtro"}{" "}
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
  return (
    <article
      onClick={() => item.archivoPdf && onOpen()}
      className="group overflow-hidden bg-white shadow-lg cursor-pointer"
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
          <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-2">
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
          Ver PDF <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function Colecciones() {
  const [filtroMunicipal, setFiltroMunicipal] =
    useState<Categoria>("colecciones");
  const [filtroDigital, setFiltroDigital] = useState<Categoria>("colecciones");
  const [tipoActivo, setTipoActivo] = useState<TipoHemeroteca>("municipal");

  const [itemsMunicipal, setItemsMunicipal] = useState<ItemColeccion[]>([]);
  const [itemsDigital, setItemsDigital] = useState<ItemColeccion[]>([]);
  const [loading, setLoading] = useState(true);

  const [pdfActivo, setPdfActivo] = useState<string | null>(null);
  const [indexActual, setIndexActual] = useState<number>(0);

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
      setItemsMunicipal(items.filter((i) => i.destino?.includes("1")));
      setItemsDigital(items.filter((i) => i.destino?.includes("2")));
      setLoading(false);
    });
  }, []);

  const listaActual =
    tipoActivo === "municipal" ? itemsMunicipal : itemsDigital;
  const filtroActual =
    tipoActivo === "municipal" ? filtroMunicipal : filtroDigital;

  const itemsFiltrados = useMemo(
    () =>
      filtroActual === "colecciones"
        ? listaActual
        : listaActual.filter((i) => i.categoria === filtroActual),
    [listaActual, filtroActual],
  );

  if (pdfActivo) {
    const itemData = itemsFiltrados[indexActual];
    return (
      <PdfViewer
        url={pdfActivo}
        collectionName={itemData.titulo}
        collectionType={itemData.tipoReal}
        collectionDate={
          itemData.fecha
            ? `${new Date(itemData.fecha).toLocaleDateString("es-AR", { year: "numeric", month: "long", day: "2-digit" })} ${itemData.numeroEdicion ? `• Edición N°${itemData.numeroEdicion}` : ""}`
            : itemData.numeroEdicion
              ? `Edición N°${itemData.numeroEdicion}`
              : "Sin fecha"
        }
        onClose={() => setPdfActivo(null)}
        onBack={() => {
          const next = indexActual - 1;
          if (next >= 0) {
            setIndexActual(next);
            setPdfActivo(itemsFiltrados[next].archivoPdf || null);
          }
        }}
        onNext={() => {
          const next = indexActual + 1;
          if (next < itemsFiltrados.length) {
            setIndexActual(next);
            setPdfActivo(itemsFiltrados[next].archivoPdf || null);
          }
        }}
      />
    );
  }

  return (
    <section className="px-4 pb-6 pt-2 md:px-6 lg:px-8 bg-white min-h-screen">
      <EditorialHero />

      <div className="mt-5 mb-10 flex items-center justify-center gap-8">
        {[
          {
            id: "municipal",
            label: "Hemeroteca Municipal",
            sub: "(Archivos físicos)",
            title: "Contenido Físico de la Hemeroteca Municipal",
          },
          {
            id: "digital",
            label: "Hemeroteca Digital",
            sub: "(Archivos digitales)",
            title: "Contenido Digital y descargable de la Hemeroteca",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            title={tab.title}
            onClick={() => setTipoActivo(tab.id as TipoHemeroteca)}
            className={`pb-4 text-xl font-bold uppercase font-serif transition cursor-pointer flex flex-col items-center ${
              tipoActivo === tab.id
                ? "text-slate-900 border-b-4 border-cyan-700"
                : "text-slate-500 border-b-4 border-transparent hover:text-slate-800"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs normal-case font-normal">{tab.sub}</span>
          </button>
        ))}
      </div>

<div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {filtros.map((f) => (
          <FiltroPrincipalCard
            key={f.id}
            item={f}
            activo={filtroActual === f.id}
            onClick={() =>
              tipoActivo === "municipal"
                ? setFiltroMunicipal(f.id)
                : setFiltroDigital(f.id)
            }
          />
        ))}
      </div>

      <header className="mb-8">
        <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-500">
          Resultados
        </span>
        <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
          {nombresCategoria[filtroActual]}
        </h2>
      </header>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
        </div>
      ) : itemsFiltrados.length > 0 ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {itemsFiltrados.map((item, idx) => (
            <MiniCard
              key={`${item.categoria}-${item.id}`}
              item={item}
              onOpen={() => {
                setPdfActivo(item.archivoPdf!);
                setIndexActual(idx);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 py-20 text-center border-2 border-dashed border-slate-300 rounded-xl">
          <p className="font-serif text-xl font-bold text-slate-400">
            No se encontraron documentos en esta categoría
          </p>
        </div>
      )}
    </section>
  );
}
