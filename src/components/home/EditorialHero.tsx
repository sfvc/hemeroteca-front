import { Link, useLocation } from "react-router-dom";
import logoMunicipalidad from "/LOGO MUNI PNG.png";

export default function EditorialHero() {
  const location = useLocation();

  const isActive = (route: string) => {
    if (route === "/") return location.pathname === "/";
    return location.pathname.startsWith(route);
  };

  const navClass = (route: string) =>
    `transition ${
      isActive(route)
        ? "text-slate-950 font-bold"
        : "text-slate-700 hover:text-slate-950"
    }`;

  return (
    <header className="w-full border-b border-slate-300 bg-white">
      <div className="border-b border-slate-200">
        <div className="flex w-full items-center justify-between px-4 py-3 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-slate-600">
            <img
              src={logoMunicipalidad}
              alt="Catamarca Capital"
              className="h-10 sm:h-10 object-contain"
            />
            <span className="font-extrabold uppercase tracking-[0.2em]">
              Hemeroteca digital
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline uppercase">
              Catamarca Capital
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-slate-700 hover:bg-gray-300 hover:text-slate-900 cursor-pointer">
              Solicitar Turno
            </button>

            <button className="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-all duration-300 bg-slate-700 hover:bg-gray-300 hover:text-slate-900 cursor-pointer">
              Solicitar Turno Digital
            </button>
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
          <Link to="/" className={navClass("/")}>
            Inicio
          </Link>

          <Link to="/" className={navClass("/")}>
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
    </header>
  );
}