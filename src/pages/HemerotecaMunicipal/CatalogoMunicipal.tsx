import { useMemo, useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditorialHero from "../../components/extras/EditorialNavbar";
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
  destino?: string[] | string;
  medio_publicador?: number;
}

type Categoria = "revistas" | "periodicos" | "colecciones" | "especiales";
type TipoHemeroteca = "municipal" | "digital";

interface ItemCatalogo {
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
): ItemCatalogo => ({
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
  tipoReal:
    item.nombre ||
    (categoria === "revistas"
      ? "Revista"
      : categoria === "periodicos"
        ? "Periódico"
        : categoria === "especiales"
          ? "Colección Especial"
          : "Colección"),
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
  especiales: "Edicion Especial",
};

function ResultadoMunicipalCard({ item }: { item: ItemCatalogo }) {
  return (
    <article className="overflow-hidden bg-white shadow-lg border border-slate-200">
      <div className="grid md:grid-cols-[180px_1fr]">
        <div className="relative h-full min-h-55 bg-slate-200">
          <img
            src={item.imagen}
            alt={item.titulo}
            className="h-full w-full object-cover"
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-cyan-700 backdrop-blur">
            {nombresCategoria[item.categoria]}
          </div>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
              DISPONIBLE
            </span>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-cyan-700">
              En digital
            </span>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-black text-slate-900">
            {item.titulo}
          </h3>

          {item.subtitulo && (
            <p className="mt-1 text-sm font-semibold text-slate-500">
              {item.subtitulo}
            </p>
          )}

          {item.descripcion && (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.descripcion}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
            {item.fecha && (
              <span>
                {new Date(item.fecha).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            )}

            {item.numeroEdicion && <span>Edición N° {item.numeroEdicion}</span>}
            {item.tipoReal && <span>{item.tipoReal}</span>}
          </div>
          <button
            // onClick={() => navigate("/catalogo-digital")}
            className="cursor-pointer inline-flex min-w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-600 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-cyan-50 backdrop-blur-md transition hover:bg-cyan-700 hover:text-white mt-5"
          >
            Ver Digital
          </button>
        </div>
      </div>
    </article>
  );
}

function ResultadoDigitalCard({
  item,
  onOpen,
}: {
  item: ItemCatalogo;
  onOpen: () => void;
}) {
  return (
    <article
      onClick={onOpen}
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

        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800">
          Ver resultado <Eye className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
}

export default function Catalogo() {
  const [tipoActivo] = useState<TipoHemeroteca>("municipal");

  const [itemsMunicipal, setItemsMunicipal] = useState<ItemCatalogo[]>([]);
  const [itemsDigital, setItemsDigital] = useState<ItemCatalogo[]>([]);
  const [loading, setLoading] = useState(true);

  const [busquedaTitulo, setBusquedaTitulo] = useState("");
  const [busquedaDescripcion, setBusquedaDescripcion] = useState("");
  const [busquedaAnio, setBusquedaAnio] = useState("");

  const navigate = useNavigate();

  const cargarItems = async (): Promise<ItemCatalogo[]> => {
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
        ...toArray(pub3).map((i) => mapPublicacion(i, "colecciones")),
        ...toArray(pub4).map((i) => mapPublicacion(i, "especiales")),
      ];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const items = await cargarItems();

      setItemsMunicipal(items.filter((i) => i.destino?.includes("1")));
      setItemsDigital(items.filter((i) => i.destino?.includes("2")));

      setLoading(false);
    };

    init();
  }, []);

  const listaActual =
    tipoActivo === "municipal" ? itemsMunicipal : itemsDigital;

  const hayBusqueda =
    busquedaTitulo.trim() !== "" ||
    busquedaDescripcion.trim() !== "" ||
    busquedaAnio.trim() !== "";

  const limpiarFiltros = () => {
    setBusquedaTitulo("");
    setBusquedaDescripcion("");
    setBusquedaAnio("");
  };

  const itemsFiltrados = useMemo(() => {
    if (!hayBusqueda) return [];

    const titulo = busquedaTitulo.toLowerCase().trim();
    const descripcion = busquedaDescripcion.toLowerCase().trim();
    const anio = busquedaAnio.trim();

    return listaActual.filter((item) => {
      const coincideTitulo =
        titulo === "" || item.titulo.toLowerCase().includes(titulo);

      const coincideDescripcion =
        descripcion === "" ||
        `${item.descripcion ?? ""} ${item.subtitulo ?? ""}`
          .toLowerCase()
          .includes(descripcion);

      const coincideAnio =
        anio === "" || (item.fecha ? item.fecha.includes(anio) : false);

      return coincideTitulo && coincideDescripcion && coincideAnio;
    });
  }, [
    listaActual,
    busquedaTitulo,
    busquedaDescripcion,
    busquedaAnio,
    hayBusqueda,
  ]);

  return (
    <section className="min-h-screen bg-white px-4 pb-6 pt-2 md:px-6 lg:px-8">
      <EditorialHero />

      <div className="mt-10">
        <h2 className="mt-2 mb-6 font-serif text-3xl font-black text-slate-700 justify-center flex">
          BUSCAR CONTENIDO:
        </h2>

        <div className="mb-4 flex flex-wrap items-end gap-4 justify-center">
          <div>
            <label className="mb-2 block text-[13px] font-bold uppercase text-cyan-700 italic">
              Título
            </label>

            <input
              type="text"
              placeholder="Título..."
              value={busquedaTitulo}
              onChange={(e) => setBusquedaTitulo(e.target.value)}
              className="h-12 w-full rounded-2xl border-2 border-cyan-700 bg-white px-4 font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold uppercase text-cyan-700 italic">
              Descripción
            </label>

            <input
              type="text"
              placeholder="Descripción..."
              value={busquedaDescripcion}
              onChange={(e) => setBusquedaDescripcion(e.target.value)}
              className="h-12 w-full rounded-2xl border-2 border-cyan-700 bg-white px-4 font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-[13px] font-bold uppercase text-cyan-700 italic">
              Año
            </label>

            <input
              type="number"
              placeholder="Año..."
              value={busquedaAnio}
              onChange={(e) => setBusquedaAnio(e.target.value)}
              className="h-12 w-full rounded-2xl border-2 border-cyan-700 bg-white px-4 font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-cyan-700 focus:ring-2 focus:ring-cyan-700/10"
            />
          </div>

          {hayBusqueda && (
            <div className="flex items-end justify-end">
              <button
                type="button"
                onClick={limpiarFiltros}
                className="h-12 cursor-pointer rounded-2xl bg-slate-200 px-4 text-md font-bold text-slate-700 transition hover:bg-cyan-700 hover:text-white"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
        {(!hayBusqueda || (hayBusqueda && itemsFiltrados.length === 0)) && (
          <div className="mt-10 rounded-xl border-2 border-dashed border-slate-300 py-20 text-center">
            <p className="font-serif text-xl font-bold text-slate-500">
              Filtra para ver resultados aquí
            </p>
          </div>
        )}
      </div>

      {hayBusqueda && (
        <>
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
            </div>
          ) : itemsFiltrados.length > 0 ? (
            tipoActivo === "municipal" ? (
              <div className="grid grid-cols-1 gap-6">
                {itemsFiltrados.map((item) => (
                  <ResultadoMunicipalCard
                    key={`${item.categoria}-${item.id}`}
                    item={item}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {itemsFiltrados.map((item) => (
                  <ResultadoDigitalCard
                    key={`${item.categoria}-${item.id}`}
                    item={item}
                    onOpen={() => {
                      navigate("/detalles-publicacion", {
                        state: {
                          item,
                          relacionados: itemsFiltrados,
                          categoriaNombre: nombresCategoria[item.categoria],
                          tipoHemeroteca: tipoActivo,
                        },
                      });
                    }}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="mt-10 rounded-xl border-2 border-dashed border-slate-300 py-20 text-center">
              <p className="font-serif text-xl font-bold text-slate-400">
                No se encontraron documentos
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
