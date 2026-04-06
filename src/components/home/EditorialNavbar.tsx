import { Link, useLocation, useNavigate } from "react-router-dom";
import logoMunicipalidad from "/LOGO MUNI PNG.png";
import { useState, useEffect } from "react";
import {
  fetchBotonDerecho,
  fetchBotonIzquierdo,
  fetchEncabezado,
} from "../../services/koha-service";
import { formatFecha } from "../../util/formatFecha";
import { Info } from "lucide-react";

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
};

export default function EditorialHero() {
  const [openModal, setOpenModal] = useState(false);
  const [botonIzquierdo, setBotonIzquierdo] = useState<Boton | null>(null);
  const [botonDerecho, setBotonDerecho] = useState<Boton | null>(null);
  const [encabezado, setEncabezado] = useState<Encabezado | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBotones = async () => {
      const left = await fetchBotonIzquierdo();
      const right = await fetchBotonDerecho();

      const leftActivo = left?.find((item: Boton) => item.activo === true);
      const rightActivo = right?.find((item: Boton) => item.activo === true);

      setBotonIzquierdo(leftActivo || null);
      setBotonDerecho(rightActivo || null);
    };

    fetchBotones();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEncabezado();
      if (data) setEncabezado(data);
    };

    loadData();
  }, []);

  const isActive = (route: string) => {
    if (route === "/") return location.pathname === "/";
    return location.pathname.startsWith(route);
  };

  const navClass = (route: string) =>
    `transition ${
      isActive(route)
        ? "text-orange-600 font-bold"
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

  return (
    <header className="w-full border-b border-slate-300 bg-white">
      <div className="border-b border-slate-200">
        <div className="flex w-full items-center justify-between px-4 py-3 text-xs sm:px-6 lg:px-8">
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

          <div className="hidden items-center gap-3 sm:flex">
            {botonIzquierdo && (
              <button
                onClick={() => {
                  if (!botonIzquierdo.activo) return;
                  handleNavigation(botonIzquierdo.link);
                }}
                disabled={!botonIzquierdo.activo}
                style={getButtonStyle(botonIzquierdo)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  botonIzquierdo.activo
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                {botonIzquierdo.titulo}
              </button>
            )}



            <button
              onClick={() => setOpenModal(true)}
              style={{
                backgroundColor: botonDerecho?.color_fondo || "#334155",
                color: botonDerecho?.color_texto || "#ffffff",
              }}
              className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-px hover:opacity-90 cursor-pointer"
            >
              Solicitar Turno
            </button>

            {botonDerecho && (
              <button
                onClick={() => {
                  if (!botonDerecho.activo) return;
                  handleNavigation(botonDerecho.link);
                }}
                disabled={!botonDerecho.activo}
                style={getButtonStyle(botonDerecho)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  botonDerecho.activo
                    ? "cursor-pointer hover:opacity-80"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
                }`}
              >
                {botonDerecho.titulo}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full px-4 pt-6 sm:px-6 lg:px-8">
        <div className="border-b border-slate-300 pb-6">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-4 text-sm font-medium sm:hidden">
              {botonIzquierdo && (
                <button
                  onClick={() => {
                    if (!botonIzquierdo.activo) return;
                    handleNavigation(botonIzquierdo.link);
                  }}
                  disabled={!botonIzquierdo.activo}
                  style={getButtonStyle(botonIzquierdo)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    botonIzquierdo.activo
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  {botonIzquierdo.titulo}
                </button>
              )}

              <button
                onClick={() => setOpenModal(true)}
                style={{
                  backgroundColor: botonDerecho?.color_fondo || "#334155",
                  color: botonDerecho?.color_texto || "#ffffff",
                }}
                className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium shadow-sm transition-all duration-300 hover:-translate-y-px hover:opacity-90 cursor-pointer"
              >
                Solicitar Turno
              </button>

              {botonDerecho && (
                <button
                  onClick={() => {
                    if (!botonDerecho.activo) return;
                    handleNavigation(botonDerecho.link);
                  }}
                  disabled={!botonDerecho.activo}
                  style={getButtonStyle(botonDerecho)}
                  className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    botonDerecho.activo
                      ? "cursor-pointer hover:opacity-80"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
                >
                  {botonDerecho.titulo}
                </button>
              )}
            </div>

            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-orange-500">
              {encabezado?.temaDelMes || "Noticias"}
            </p>

            <h1 className="mt-2 font-serif text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl lg:text-7xl">
              {encabezado?.nombre ? (
                encabezado.nombre.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))
              ) : (
                <>
                  Nueva <br /> Hemeroteca
                </>
              )}
            </h1>

            {encabezado?.lugar && (
              <p className="mt-3 text-xs uppercase tracking-widest text-slate-500">
                {encabezado.lugar}
                {encabezado.fechaFantasia &&
                  ` — ${formatFecha(encabezado.fechaFantasia)}`}
              </p>
            )}
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-slate-200 py-4 text-sm font-medium">
          <Link to="/" className={navClass("/")}>
            Inicio
          </Link>

          <Link to="/login" className={navClass("/login")}>
            Archivo General
          </Link>

          <Link to="/noticias" className={navClass("/noticias")}>
            Noticias
          </Link>

          <Link to="/nosotros" className={navClass("/nosotros")}>
            Nosotros
          </Link>
        </nav>
      </div>

      {openModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onClick={() => setOpenModal(false)}
        >
          <div
            className="relative w-full max-w-xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-red-50 hover:text-red-600 cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="mb-6 border-b border-slate-200 pb-4">
              <h2 className="mb-3 font-serif text-2xl font-bold text-slate-900 sm:text-3xl">
                Solicitar Turno Presencial
              </h2>

              <div className="flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4 text-sm text-slate-700">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <Info className="h-5 w-5 text-orange-500" />
                </div>
                <p className="leading-relaxed">
                  Este formulario es para solicitar un turno presencial en la
                  hemeroteca. Podrás asistir a las oficinas en la fecha
                  seleccionada y retirar los libros previamente solicitados.
                </p>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Día
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Hora
                  </label>
                  <input
                    type="time"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  ¿Quién solicita?
                </label>
                <input
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
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
                  placeholder="Detalle del pedido"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-orange-500 px-4 py-3 font-semibold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg cursor-pointer"
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
