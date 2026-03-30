{
  /* HERO ESTILO PERIODICO (que podria usarse como el navbar tambien) */
}

export default function EditorialHero() {
  return (
    <header className="border-b border-slate-300 bg-white mt-1">
      <div className="border-b border-slate-200">
        <div className="mx-auto flex w-full max-w-350 items-center justify-between px-4 py-3 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-slate-600">
            <span className="font-semibold uppercase tracking-[0.2em]">
              Hemeroteca digital
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline uppercase">
              Catamarca Capital
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-350 px-4 pt-6 sm:px-4 lg:px-4">
        <div className="grid items-center gap-4 border-b border-slate-300 pb-6 md:grid-cols-3">
          <div className="hidden md:block"></div>

          {/* Tracking (espacio entre letras) */}

          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-slate-500">
              Noticias
            </p>
            <h1 className="mt-2 font-serif text-4xl font-black uppercase text-slate-950 sm:text-6xl lg:text-6xl">
              Nueva Hemeroteca
            </h1>
          </div>
        </div>

        {/* Mejor navbar? */}

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-b border-slate-200 py-4 text-sm font-medium text-slate-700">
          <a href="#" className="hover:text-slate-950">
            Inicio
          </a>
          <a href="#" className="hover:text-slate-950">
            Archivo General
          </a>
          <a href="#" className="hover:text-slate-950">
            Eventos
          </a>
          <a href="#" className="hover:text-slate-950">
            Turismo
          </a>
          <a href="#" className="hover:text-slate-950">
            Nosotros
          </a>
        </nav>
      </div>
    </header>
  );
}
