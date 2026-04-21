import { useMemo, useState, useEffect } from "react";
import { Search, CheckCircle2, CalendarCheck, Info, X, BookOpen, FileText, Newspaper, Archive } from "lucide-react";
import EditorialHero from "../components/extrasFijos/EditorialNavbar";
import KohaApi from "../api/kohaApi";
import {
  fetchPublicacion_1,
  fetchPublicacion_2,
  fetchPublicacion_3,
  fetchPublicacion_4,
} from "../services/koha-service";

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

const mapPublicacion = (item: PublicacionAPI, categoria: Categoria): ItemColeccion => ({
  id: item.id,
  titulo: item.titulo,
  categoria,
  imagen: item.portada_publicacion ? getAssetUrl(item.portada_publicacion) : "/placeholder.jpg",
  descripcion: item.descripcion ?? undefined,
  subtitulo: item.subtitulo ?? undefined,
  archivoPdf: item.archivo_pdf ? getAssetUrl(item.archivo_pdf) : undefined,
  fecha: item.fecha_publicacion ?? undefined,
  destino: item.destino
    ? Array.isArray(item.destino) ? item.destino : [item.destino]
    : undefined,
  numeroEdicion: item.numero_publicacion,
  medio_publicador: item.medio_publicador,
  tipoReal: item.nombre || (categoria === "revistas" ? "Revista" : "Periódico"),
});

const toArray = (data: PublicacionAPI | PublicacionAPI[] | null): PublicacionAPI[] => {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
};

const nombresCategoria: Record<Categoria, string> = {
  revistas: "Revista",
  periodicos: "Periódico",
  colecciones: "Colección",
  especiales: "Colección Especial",
};

const iconosCategoria: Record<Categoria, typeof BookOpen> = {
  revistas: BookOpen,
  periodicos: Newspaper,
  colecciones: Archive,
  especiales: FileText,
};

function formatearFecha(fecha?: string) {
  if (!fecha) return null;
  const date = new Date(fecha);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" });
}

function generarHorarios() {
  const horarios: string[] = [];
  const agregarRango = (inicio: number, fin: number) => {
    for (let h = inicio; h <= fin; h++) {
      horarios.push(`${String(h).padStart(2, "0")}:00`);
      if (h !== fin) horarios.push(`${String(h).padStart(2, "0")}:30`);
    }
  };
  agregarRango(8, 12);
  agregarRango(15, 18);
  return horarios;
}

function ModalTurno({ item, onClose }: { item: ItemColeccion; onClose: () => void }) {
  const [hora, setHora] = useState("");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-2 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white px-5 pb-5 pt-4 shadow-2xl sm:px-8 sm:pb-8 sm:pt-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-cyan-700 hover:text-white"
          aria-label="Cerrar modal"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 border-b border-slate-200 py-4 pr-12">
          <h2 className="mb-1 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Solicitar Turno Presencial
          </h2>
          <p className="text-sm text-slate-500">
            Para: <span className="font-semibold text-slate-700">{item.titulo}</span>
          </p>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm text-slate-700">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <Info className="h-5 w-5 text-cyan-700" />
            </div>
            <p className="leading-relaxed">
              Este formulario es para solicitar un turno presencial en la hemeroteca. Podrás asistir
              a las oficinas en la fecha seleccionada y consultar los materiales solicitados.
            </p>
          </div>
        </div>

        <form className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Día</label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Hora</label>
              <select
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
              >
                <option value="">Seleccionar horario</option>
                {generarHorarios().map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-500">
                Atención de 8 a 12:30 y de 15 a 18:30 hs, lunes a viernes.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Nombre y Apellido</label>
            <input
              type="text"
              placeholder="Tu nombre y apellido"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Teléfono</label>
            <input
              type="tel"
              placeholder="Tu número de teléfono"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Correo electrónico</label>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">¿Qué solicita?</label>
            <textarea
              rows={4}
              defaultValue={`Solicito consulta del material: "${item.titulo}" (${nombresCategoria[item.categoria]})`}
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer bg-cyan-700 px-4 py-3 font-bold text-white shadow-md transition hover:bg-cyan-800 hover:shadow-lg"
            >
              Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ResultCard({ item, onSolicitarTurno }: { item: ItemColeccion; onSolicitarTurno: () => void }) {
  const Icono = iconosCategoria[item.categoria];

  return (
    <div className="flex items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:border-cyan-200">
      {/* Imagen lateral */}
      <div className="relative hidden w-28 shrink-0 overflow-hidden sm:block">
        <img
          src={item.imagen}
          alt={item.titulo}
          className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center">
        <div className="flex-1 min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-cyan-700">
              <Icono className="h-3 w-3" />
              {nombresCategoria[item.categoria]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-emerald-700">
              <CheckCircle2 className="h-3 w-3" />
              Disponible
            </span>
          </div>

          <h3 className="font-serif text-xl font-black leading-tight text-slate-900 sm:text-2xl">
            {item.titulo}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            {item.fecha && <span>{formatearFecha(item.fecha)}</span>}
            {item.numeroEdicion && <span>Edición N° {item.numeroEdicion}</span>}
            {item.subtitulo && <span className="italic">{item.subtitulo}</span>}
          </div>

          {item.descripcion && (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500">
              {item.descripcion}
            </p>
          )}
        </div>

        {/* Botón */}
        <div className="shrink-0">
          <button
            onClick={onSolicitarTurno}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-cyan-800 hover:shadow-lg active:scale-[0.98] whitespace-nowrap"
          >
            <CalendarCheck className="h-4 w-4" />
            Solicitar turno
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Colecciones() {
  const [items, setItems] = useState<ItemColeccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [itemTurno, setItemTurno] = useState<ItemColeccion | null>(null);

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
    cargarItems().then((rawItems) => {
      const vistos = new Set<string>();
      const unicos = rawItems.filter((i) => {
        const key = `${i.categoria}-${i.id}`;
        if (vistos.has(key)) return false;
        vistos.add(key);
        return true;
      });
      // Solo hemeroteca municipal (destino "1")
      setItems(unicos.filter((i) => i.destino?.includes("1")));
      setLoading(false);
    });
  }, []);

  const itemsFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (!texto) return [];
    return items.filter((item) => {
      const titulo = item.titulo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return titulo.includes(texto);
    });
  }, [items, busqueda]);

  const hayBusqueda = busqueda.trim().length > 0;

  return (
    <section className="min-h-screen bg-white pb-16">
      <EditorialHero />

      <div className="mx-auto max-w-4xl px-4 py-12 md:px-6">
        {/* Encabezado */}
        <div className="mb-10 text-center">
          <h2 className="mt-2 font-serif text-3xl font-black text-slate-950 sm:text-4xl">
            Buscá en nuestra colección
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-500">
            Ingresá el título de la publicación para ver si está disponible y solicitar un turno presencial.
          </p>
        </div>

        {/* Buscador */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título de publicación..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            autoFocus
            className="h-16 w-full border-2 border-slate-300 bg-white pl-14 pr-14 text-lg font-semibold text-slate-800 placeholder:text-slate-400 shadow-md outline-none transition-all duration-200 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-700/10"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Cargando */}
        {loading && (
          <div className="mt-12 flex justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-700 border-t-transparent" />
          </div>
        )}

        {/* Estado inicial */}
        {!loading && !hayBusqueda && (
          <div className="mt-10 border-2 border-dashed border-slate-200 bg-white py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-slate-300" />
            <p className="mt-4 font-serif text-lg font-bold text-slate-400">
              Escribí el nombre de una publicación para comenzar
            </p>
          </div>
        )}

        {/* Resultados */}
        {!loading && hayBusqueda && (
          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold text-slate-500">
              {itemsFiltrados.length === 0
                ? `Sin resultados para "${busqueda.trim()}"`
                : `${itemsFiltrados.length} resultado${itemsFiltrados.length === 1 ? "" : "s"} para "${busqueda.trim()}"`}
            </p>

            {itemsFiltrados.length > 0 ? (
              <div className="flex flex-col gap-4">
                {itemsFiltrados.map((item) => (
                  <ResultCard
                    key={`${item.categoria}-${item.id}`}
                    item={item}
                    onSolicitarTurno={() => setItemTurno(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-white py-16 text-center">
                <p className="font-serif text-lg font-bold text-slate-400">
                  No encontramos esa publicación en el catálogo
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Podés intentar con otro término o contactarnos directamente.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal turno */}
      {itemTurno && (
        <ModalTurno item={itemTurno} onClose={() => setItemTurno(null)} />
      )}
    </section>
  );
}