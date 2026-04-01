import { Link, useLocation, useNavigate } from "react-router-dom";
import logoMunicipalidad from "/LOGO MUNI PNG.png";
import { useState, useEffect } from "react";
import { fetchBotonDerecho, fetchBotonIzquierdo } from "../../services/koha-service";
import Carrousel from "../Carrousel";

type Boton = {
  id: number;
  titulo: string;
  link: string;
  activo: boolean | null;
  color_fondo?: string | null;
  color_texto?: string | null;
};

export default function EditorialHero() {
  const [openModal, setOpenModal] = useState(false);
  const [botonIzquierdo, setBotonIzquierdo] = useState<Boton | null>(null);
  const [botonDerecho, setBotonDerecho] = useState<Boton | null>(null);

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
          <div className="flex items-center gap-3 text-slate-600 mb-2">
            <img
              src={logoMunicipalidad}
              alt="Catamarca Capital"
              className="h-10 sm:h-10 object-contain"
            />
            <span className="font-extrabold uppercase tracking-[0.2em]">
              Hemeroteca Municipal
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline uppercase">
              Catamarca Capital
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {/* BOTON IZQUIERDO */}
            {botonIzquierdo && (
              <button
                onClick={() => {
                  if (!botonIzquierdo.activo) return;
                  handleNavigation(botonIzquierdo.link);
                }}
                disabled={!botonIzquierdo.activo}
                style={getButtonStyle(botonIzquierdo)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${botonIzquierdo.activo
                  ? "hover:opacity-80 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {botonIzquierdo.titulo}
              </button>
            )}

            {/* BOTON DERECHO */}
            {botonDerecho && (
              <button
                onClick={() => {
                  if (!botonDerecho.activo) return;
                  handleNavigation(botonDerecho.link);
                }}
                disabled={!botonDerecho.activo}
                style={getButtonStyle(botonDerecho)}
                className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-all duration-300 ${botonDerecho.activo
                  ? "hover:opacity-80 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-orange-500">
              Noticias
            </p>

            <h1 className="mt-2 font-serif text-4xl font-black uppercase leading-none text-slate-950 sm:text-5xl lg:text-7xl">
              Nueva
              <br />
              Hemeroteca
            </h1>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-slate-200 py-4 text-sm font-medium">
          {/* Publico */}

          <Link to="/" className={navClass("/")}>
            Inicio
          </Link>

          {/* Te patea al login y una vez logueado o registrado recien te lleva a la AGM */}

          <Link to="/login" className={navClass("/login")}>
            Archivo General
          </Link>

          {/* Publico */}

          <Link to="/noticias" className={navClass("/noticias")}>
            Noticias
          </Link>

          {/* Publico */}

          <Link to="/nosotros" className={navClass("/nosotros")}>
            Nosotros
          </Link>
        </nav>
      </div>

      <Carrousel />

      {/* FORM en modal */}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 relative">
            {/* Botón cerrar */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-3 right-3 text-slate-800 hover:text-red-600 cursor-pointer"
            >
              ✕
            </button>

            {/* Titulo */}
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-serif">
              Solicitar Turno Presencial
            </h2>

            {/* Formulario */}
            <form className="space-y-4">
              {/* Dia */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Día
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Hora
                </label>
                <input
                  type="time"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>

              {/* Quien solicita */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  ¿Quién solicita?
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>

              {/* Que solicita */}
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  ¿Qué solicita?
                </label>
                <textarea
                  placeholder="Detalle del pedido"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>

              {/* Boton que envia solicitud al mail de la hemeroteca */}
              <button
                type="submit"
                className="w-full rounded-xl bg-orange-500 py-2 font-semibold text-white hover:bg-orange-600 transition"
              >
                Enviar solicitud
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
