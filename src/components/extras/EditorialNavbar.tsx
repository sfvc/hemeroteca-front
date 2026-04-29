import { Link, useLocation, useNavigate } from "react-router-dom";
import logoMunicipalidad from "/LOGO MUNI PNG.png";
import { useState, useEffect } from "react";
import {
  fetchBotonDerecho,
  fetchBotonIzquierdo,
  fetchEncabezado,
} from "../../services/koha-service";
import { formatFecha } from "../../util/formatFecha";
import { BookMarked, Info, CalendarCheck } from "lucide-react";
import LoaderDigital from "../extras/LoaderDigital";

type Boton = {
  id: number;
  titulo: string;
  link: string;
  activo: boolean | null;
  color_fondo?: string | null;
  color_texto?: string | null;
};

type Encabezado = {
  nombre: string;
  temaDelMes?: string;
  lugar?: string;
  fechaFantasia?: string;
  activo?: boolean;
};

export default function EditorialHero() {
  const [openModal, setOpenModal] = useState(false);
  const [botonIzquierdo, setBotonIzquierdo] = useState<Boton | null>(null);
  const [botonDerecho, setBotonDerecho] = useState<Boton | null>(null);
  const [encabezado, setEncabezado] = useState<Encabezado | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDigitalLoader, setShowDigitalLoader] = useState(false);
  const [hora, setHora] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [left, right, data] = await Promise.all([
          fetchBotonIzquierdo(),
          fetchBotonDerecho(),
          fetchEncabezado(),
        ]);

        const leftActivo = left?.find((item: Boton) => item.activo === true);
        const rightActivo = right?.find((item: Boton) => item.activo === true);

        setBotonIzquierdo(leftActivo || null);
        setBotonDerecho(rightActivo || null);
        if (data) setEncabezado(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const isActive = (route: string) => {
    if (route === "/") return location.pathname === "/";
    return location.pathname.startsWith(route);
  };

  const navClass = (route: string) =>
    `transition ${
      isActive(route)
        ? "text-cyan-600 font-bold"
        : "text-slate-700 hover:text-slate-950"
    }`;

  const handleNavigation = (link: string) => {
    if (!link) return;

    const isExternal = link.startsWith("http");

    if (isExternal) {
      window.open(link, "_blank", "noopener,noreferrer");
    } else {
      navigate(link);
    }
  };

  const getButtonStyle = (boton: Boton) => {
    if (!boton.activo) return {};

    return {
      backgroundColor: boton.color_fondo || "#334155",
      color: boton.color_texto || "#ffffff",
    };
  };

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

    // Mañana: 08:00 - 12:30
    agregarRango(8, 12);

    // Tarde: 15:00 - 18:30
    agregarRango(15, 18);

    return horarios;
  };

  const handleHemerotecaDigital = () => {
    setShowDigitalLoader(true);

    sessionStorage.setItem("skipGlobalLoader", "true");

    setTimeout(() => {
      navigate("/hemeroteca-digital");
    }, 1500);
  };

  return (
    <header className="w-full bg-white">
      {showDigitalLoader && <LoaderDigital />}
      {/* HEADER SUPERIOR */}
      <div className="border-b border-slate-200">
        <div className="flex w-full items-center justify-between px-4 py-3 text-xs sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex w-full items-center justify-between animate-pulse">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-slate-200 rounded-md" />
                <div className="h-4 w-40 bg-slate-200 rounded" />
              </div>

              <div className="hidden sm:flex gap-3">
                <div className="h-9 w-28 bg-slate-200 rounded-2xl" />
                <div className="h-9 w-32 bg-slate-200 rounded-2xl" />
                <div className="h-9 w-28 bg-slate-200 rounded-2xl" />
              </div>
            </div>
          ) : (
            <>
              <Link to="/" className={navClass("/")}>
                <div className="mb-2 flex items-center gap-3 text-slate-600">
                  <img
                    src={logoMunicipalidad}
                    alt="Catamarca Capital"
                    className="h-10 object-contain sm:h-10"
                  />
                  <span className="font-extrabold uppercase tracking-[0.2em]">
                    Hemeroteca Municipal
                  </span>
                  <span className="hidden sm:inline">|</span>
                  <span className="hidden sm:inline uppercase">
                    Catamarca Capital
                  </span>
                </div>
              </Link>

              <div className="hidden items-center gap-3 sm:flex">
                {botonIzquierdo && (
                  <button
                    onClick={() =>
                      botonIzquierdo.activo &&
                      handleNavigation(botonIzquierdo.link)
                    }
                    disabled={!botonIzquierdo.activo}
                    style={getButtonStyle(botonIzquierdo)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:opacity-90 bg-cyan-700   hover:scale-105 text-white"
                  >
                    {botonIzquierdo.titulo}
                  </button>
                )}

                {/* SOLICITAR TURNO PRESENCIAL */}

                <button
                  onClick={() => setOpenModal(true)}
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:opacity-90 bg-cyan-700   hover:scale-105 text-white"
                >
                  <CalendarCheck className="h-5 w-5" />
                  Solicitar Turno
                </button>

                {/* IR A LA AGM DENUEVO */}

                <button
                  onClick={() =>
                    window.open("https://agm.cc.gob.ar/", "_blank")
                  }
                  className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-300 hover:opacity-90 bg-cyan-700   hover:scale-105 text-white shadow-md"
                >
                  <BookMarked className="h-5 w-5" />
                  Archivo General Municipal (AGM)
                </button>

                {botonDerecho && (
                  <button
                    onClick={() =>
                      botonDerecho.activo && handleNavigation(botonDerecho.link)
                    }
                    disabled={!botonDerecho.activo}
                    style={getButtonStyle(botonDerecho)}
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 hover:opacity-90 bg-cyan-700   hover:scale-105 text-white"
                  >
                    {botonDerecho.titulo}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONTENIDO */}
      <div className="w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="border-b border-slate-200 pb-6">
          <div className="text-center">
            {loading ? (
              <div className="flex flex-col items-center gap-4 animate-pulse">
                <div className="h-3 w-32 bg-orange-200 rounded" />
                <div className="h-10 w-64 bg-slate-300 rounded" />
                <div className="h-3 w-40 bg-slate-200 rounded" />
              </div>
            ) : (
              <>
                <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-cyan-500">
                  {encabezado?.temaDelMes}
                </p>

                <h1 className="mt-2 font-serif text-4xl font-black uppercase text-slate-950 sm:text-5xl lg:text-7xl">
                  {encabezado?.nombre}
                </h1>

                {encabezado?.lugar && (
                  <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">
                    {encabezado.lugar}
                    {encabezado.fechaFantasia &&
                      ` — ${formatFecha(encabezado.fechaFantasia)}`}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {/* NAV */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-slate-200 py-4 text-sm font-medium">
          {loading ? (
            <div className="flex gap-4 animate-pulse">
              <div className="h-4 w-16 bg-slate-200 rounded" />
              <div className="h-4 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-200 rounded" />
            </div>
          ) : (
            <>
              <Link to="/" className={navClass("/")}>
                Inicio
              </Link>
              <button
                type="button"
                onClick={handleHemerotecaDigital}
                className={`cursor-pointer ${navClass("/hemeroteca-digital")}`}
              >
                Hemeroteca Digital
              </button>
              <Link to="/catalogo" className={navClass("/catalogo")}>
                Catalogo
              </Link>
              <Link to="/noticias" className={navClass("/noticias")}>
                Noticias
              </Link>
              <Link to="/nosotros" className={navClass("/nosotros")}>
                Nosotros
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* MODAL */}
      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-3 py-2 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white px-5 pb-5 pt-4 shadow-2xl sm:px-8 sm:pb-8 sm:pt-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* BOTON CERRAR */}
            <button
              onClick={() => setOpenModal(false)}
              className="cursor-pointer absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-cyan-700 hover:text-white"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* HEADER */}
            <div className="mb-6 border-b border-slate-200 py-4 pr-12">
              <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                Solicitar Turno Presencial
              </h2>

              <div className="flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-4 text-sm text-slate-700">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Info className="h-5 w-5 text-cyan-700" />
                </div>
                <p className="leading-relaxed">
                  Este formulario es para solicitar un turno presencial en la
                  hemeroteca. Podrás asistir a las oficinas en la fecha
                  seleccionada y retirar los libros previamente solicitados.
                </p>
              </div>
            </div>

            {/* FORMULARIO */}
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* DIA */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Día
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* HORA */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Hora
                  </label>
                  <select
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
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
                    Turnos de atención de 8 a 12:30 y de 15 a 18:30 hs, de lunes
                    a viernes.
                  </p>
                </div>
              </div>

              {/* NOMBRE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Nombre y Apellido
                </label>
                <input
                  type="text"
                  placeholder="Tu nombre y apellido"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Ingresá tu nombre y apellido.
                </p>
              </div>

              {/* TELÉFONO */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Teléfono
                </label>
                <input
                  type="number"
                  placeholder="Tu número de teléfono"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Ingresá tu número de teléfono.
                </p>
              </div>

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ¿Quién solicita?
                </label>
                <input
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Ingresá un correo electrónico válido para poder contactarte.
                </p>
              </div>

              {/* DETALLE */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ¿Qué solicita?
                </label>
                <textarea
                  placeholder="Detalle brevemente el pedido"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              {/* BOTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-cyan-500 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-cyan-600 hover:shadow-lg"
                >
                  Enviar solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
