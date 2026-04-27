import { useMemo, useState, useEffect, type FormEvent } from "react";
import { ChevronRight, Check, CalendarDays, Eye, Info } from "lucide-react";
import EditorialHero from "../../components/extras/EditorialNavbar";
import KohaApi from "../../api/kohaApi";
import {
  createSolicitudTurno,
  fetchPublicacion_1,
  fetchPublicacion_2,
  fetchPublicacion_3,
  fetchPublicacion_4,
} from "../../services/koha-service";
// import PdfViewer from "../../components/extras/PdfViewer";
import { useNavigate } from "react-router-dom";

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
    badge: "Edicion Especial",
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
  especiales: "Edicion Especial",
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
      className={`group w-full overflow-hidden shadow-md cursor-pointer transition-all ${activo
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
            <Check className="h-5 w-5" />
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

function ResultadoMunicipalCard({
  item,
  onSolicitarTurno,
}: {
  item: ItemCatalogo;
  onSolicitarTurno: () => void;
}) {
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
              Disponible
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-600">
              Consulta presencial
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

          <div className="mt-6">
            <button
              onClick={onSolicitarTurno}
              className="cursor-pointer inline-flex items-center gap-2 bg-cyan-700 px-5 py-3 font-bold text-white transition hover:bg-slate-700"
            >
              <CalendarDays className="h-5 w-5" />
              Solicitar turno
            </button>
          </div>
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

function ModalSolicitarTurno({
  item,
  categoriaNombre,
  onClose,
}: {
  item: ItemCatalogo;
  categoriaNombre: string;
  onClose: () => void;
}) {
  const [hora, setHora] = useState("");
  const [dia, setDia] = useState("");
  const [nombreApellido, setNombreApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [detalle, setDetalle] = useState("");

  const generarHorarios = () => {
    const horarios: string[] = [];

    const agregarRango = (inicio: number, fin: number) => {
      for (let h = inicio; h <= fin; h++) {
        horarios.push(`${String(h).padStart(2, "0")}:00`);
        if (h !== fin) {
          horarios.push(`${String(h).padStart(2, "0")}:30`);
        }
      }
    };

    agregarRango(8, 12);
    agregarRango(15, 18);

    return horarios;
  };

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const hoy = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      await createSolicitudTurno({
        dia,
        hora: `${hora}:00`,
        nombreCompleto: nombreApellido,
        telefono,
        email,
        pedido: `
        Material: ${item.titulo}
        Categoría: ${categoriaNombre}
        Detalle: ${detalle}
        `,
      });

      setSuccess(true);
      setHora("");
      setDia("");
      setNombreApellido("");
      setTelefono("");
      setEmail("");
      setDetalle("");

    } catch (error) {
      console.error("Error al enviar solicitud", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-2 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="w-full max-w-md bg-white p-8 text-center shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-slate-900">
            Solicitud enviada
          </h2>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Tu solicitud de turno fue enviada correctamente.
            Nos vamos a comunicar con vos para confirmarla.
          </p>

          <button
            onClick={onClose}
            className="mt-6 w-full cursor-pointer bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-2 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white px-5 pb-5 pt-4 shadow-2xl sm:px-8 sm:pb-8 sm:pt-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-cyan-700 hover:text-white"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        <div className="mb-6 border-b border-slate-200 py-4 pr-12">
          <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
            Solicitar Turno Presencial
          </h2>

          <div className="grid gap-5 md:grid-cols-[180px_1fr]">
            <div className="overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={item.imagen}
                alt={item.titulo}
                className="h-55 w-full object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
            </div>

            <div>
              <div className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm text-slate-700">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Info className="h-5 w-5 text-cyan-700" />
                </div>
                <div className="leading-relaxed">
                  <p>
                    Este formulario es para solicitar un turno presencial en la
                    hemeroteca.
                  </p>
                  <p className="mt-2">
                    Vas a consultar el material seleccionado y coordinar una
                    fecha de visita.
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>
                  <span className="font-bold text-slate-800">Material:</span>{" "}
                  {item.titulo}
                </p>
                <p>
                  <span className="font-bold text-slate-800">Categoría:</span>{" "}
                  {categoriaNombre}
                </p>
                {item.tipoReal && (
                  <p>
                    <span className="font-bold text-slate-800">Tipo:</span>{" "}
                    {item.tipoReal}
                  </p>
                )}
                {item.fecha && (
                  <p>
                    <span className="font-bold text-slate-800">Fecha:</span>{" "}
                    {new Date(item.fecha).toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                )}
                {item.numeroEdicion && (
                  <p>
                    <span className="font-bold text-slate-800">Edición:</span>{" "}
                    N° {item.numeroEdicion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Día
              </label>
              <input
                type="date"
                min={hoy}
                value={dia}
                onChange={(e) => setDia(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Hora
              </label>
              <select
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
              >
                <option value="">Seleccionar horario</option>
                {generarHorarios().map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-500">
                Turnos de atención de 8 a 12:30 y de 15 a 18:30 hs, de lunes a
                viernes.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Nombre y Apellido
            </label>
            <input
              type="text"
              value={nombreApellido}
              onChange={(e) => setNombreApellido(e.target.value)}
              placeholder="Tu nombre y apellido"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              Ingresá tu nombre y apellido.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Teléfono
            </label>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              type="tel"
              value={telefono}
              onChange={(e) => {
                const soloNumeros = e.target.value.replace(/\D/g, "");
                setTelefono(soloNumeros);
              }}
              placeholder="Tu número de teléfono"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              Ingresá tu número de teléfono.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              ¿Quién solicita?
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tuemail@ejemplo.com"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
            />
            <p className="mt-2 text-xs text-slate-500">
              Ingresá un correo electrónico válido para poder contactarte.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              ¿Qué solicita?
            </label>
            <textarea
              value={detalle}
              onChange={(e) => setDetalle(e.target.value)}
              placeholder={`Detalle brevemente el pedido. Ej: Quiero consultar "${item.titulo}" el día ${dia} a las ${hora}.`}
              rows={5}
              className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer px-4 py-3 font-semibold text-white shadow-md transition
    ${loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 hover:shadow-lg"
                }`}
            >
              {loading ? "Enviando..." : "Enviar solicitud"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { useRef } from "react";

export default function Catalogo() {
  const ITEMS_POR_PAGINA = 6;
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtroMunicipal, setFiltroMunicipal] =
    useState<Categoria>("colecciones");
  const [filtroDigital, setFiltroDigital] = useState<Categoria>("colecciones");
  const [tipoActivo, setTipoActivo] = useState<TipoHemeroteca>("municipal");
  const resultadosRef = useRef<HTMLDivElement | null>(null);

  const [itemsMunicipal, setItemsMunicipal] = useState<ItemCatalogo[]>([]);
  const [itemsDigital, setItemsDigital] = useState<ItemCatalogo[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [busquedaMunicipal, setBusquedaMunicipal] = useState("");
  const [busquedaDigital, setBusquedaDigital] = useState("");

  const [turnoAbierto, setTurnoAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<ItemCatalogo | null>(
    null,
  );

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

  // useEffect(() => {
  //   setBusquedaMunicipal("");
  //   setBusquedaDigital("");
  // }, [tipoActivo]);

  const abrirModalTurno = (item: ItemCatalogo) => {
    setItemSeleccionado(item);
    setTurnoAbierto(true);
  };

  const cerrarModalTurno = () => {
    setTurnoAbierto(false);
    setItemSeleccionado(null);
  };

  const listaActual =
    tipoActivo === "municipal" ? itemsMunicipal : itemsDigital;

  const filtroActual =
    tipoActivo === "municipal" ? filtroMunicipal : filtroDigital;

  const busquedaActual =
    tipoActivo === "municipal" ? busquedaMunicipal : busquedaDigital;

  const itemsFiltrados = useMemo(() => {
    let resultado = listaActual;

    if (filtroActual === "especiales") {
      resultado = resultado.filter(
        (item) =>
          item.categoria === "especiales" ||
          item.categoria === "colecciones"
      );
    } else if (filtroActual !== "colecciones") {
      resultado = resultado.filter(
        (item) => item.categoria === filtroActual
      );
    }

    if (busquedaActual.trim() !== "") {
      const texto = busquedaActual.toLowerCase().trim();

      resultado = resultado.filter((item) =>
        `${item.titulo} ${item.descripcion ?? ""} ${item.subtitulo ?? ""} ${item.tipoReal ?? ""} ${item.numeroEdicion ?? ""}`
          .toLowerCase()
          .includes(texto)
      );
    }

    return resultado;
  }, [listaActual, filtroActual, busquedaActual]);

  const totalPaginas = Math.ceil(itemsFiltrados.length / ITEMS_POR_PAGINA);

  const itemsPaginados = useMemo(() => {
    const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
    const fin = inicio + ITEMS_POR_PAGINA;
    return itemsFiltrados.slice(inicio, fin);
  }, [itemsFiltrados, paginaActual]);

  // useEffect(() => {
  //   setPaginaActual(1);
  // }, [filtroActual, busquedaActual, tipoActivo]);

  return (
    <section className="min-h-screen bg-white px-4 pb-6 pt-2 md:px-6 lg:px-8">
      <EditorialHero />

      <div className="mt-5 mb-10 flex items-center justify-center gap-8">
        {[
          {
            id: "municipal",
            label: "Hemeroteca Municipal",
            sub: "(Archivos físicos)",
            title: "Contenido físico de la Hemeroteca Municipal",
          },
          {
            id: "digital",
            label: "Hemeroteca Digital",
            sub: "(Archivos digitales)",
            title: "Contenido digital y descargable de la Hemeroteca",
          },
        ].map((tab) => (
          <button
            key={tab.id}
            title={tab.title}
            onClick={() => {
              setTipoActivo(tab.id as TipoHemeroteca);

              setTimeout(() => {
                resultadosRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
            className={`flex cursor-pointer flex-col items-center border-b-4 pb-4 text-xl font-bold uppercase font-serif transition ${tipoActivo === tab.id
              ? "border-cyan-700 text-slate-900"
              : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs normal-case font-normal">{tab.sub}</span>
          </button>
        ))}
      </div>

      <div className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtros.map((f) => (
          <FiltroPrincipalCard
            key={f.id}
            item={f}
            activo={filtroActual === f.id}
            onClick={() => {
              if (tipoActivo === "municipal") {
                setFiltroMunicipal(f.id);
              } else {
                setFiltroDigital(f.id);
              }
            }}
          />
        ))}
      </div>

      <div ref={resultadosRef}>
        <header className="mb-4">
          <div className="border-t border-slate-300 pt-6" />
          <span className="text-[13px] font-bold uppercase text-cyan-700">
            Resultados
          </span>
          <h2 className="mt-2 font-serif text-3xl font-black text-slate-900">
            {tipoActivo === "municipal"
              ? `${nombresCategoria[filtroActual]}`
              : `${nombresCategoria[filtroActual]}`}
          </h2>
        </header>
      </div>

      <div className="mb-6">
        <div className="max-w-2xl">
          <label className="mb-2 block text-[13px] font-bold uppercase text-cyan-700 rounded-full border border-slate-100 bg-gray-50 w-max px-2">
            Búsqueda
          </label>

          <input
            type="text"
            placeholder={
              tipoActivo === "municipal"
                ? "Buscar material físico por título, descripción o edición..."
                : "Buscar material digital por título, descripción o edición..."
            }
            value={busquedaActual}
            onChange={(e) => {
              if (tipoActivo === "municipal") {
                setBusquedaMunicipal(e.target.value);
              } else {
                setBusquedaDigital(e.target.value);
              }
            }}
            className="h-12 w-full border-2 border-slate-300 bg-white px-4 font-semibold text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-slate-100 focus:ring-2 focus:ring-cyan-700/10"
          />
        </div>
      </div>

      <div className="mb-5 border-t border-slate-300 pt-6" />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-600 border-t-transparent" />
        </div>
      ) : itemsFiltrados.length > 0 ? (
        tipoActivo === "municipal" ? (
          <div className="grid grid-cols-1 gap-6">
            {itemsPaginados.map((item) => (
              <ResultadoMunicipalCard
                key={`${item.categoria}-${item.id}`}
                item={item}
                onSolicitarTurno={() => abrirModalTurno(item)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {itemsPaginados.map((item) => (
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
            No se encontraron documentos en esta categoría
          </p>
        </div>
      )}

      {turnoAbierto && itemSeleccionado && (
        <ModalSolicitarTurno
          item={itemSeleccionado}
          categoriaNombre={nombresCategoria[itemSeleccionado.categoria]}
          onClose={cerrarModalTurno}
        />
      )}

      {totalPaginas > 1 && (
        <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((p) => p - 1)}
            className="cursor-pointer px-4 py-2 border bg-white disabled:opacity-40"
          >
            Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPaginaActual(num)}
              className={`cursor-pointer px-4 py-2 border ${paginaActual === num
                ? "bg-cyan-700 text-white"
                : "bg-white hover:bg-slate-100"
                }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((p) => p + 1)}
            className="cursor-pointer px-4 py-2 border bg-white disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}
    </section>

  );
}
