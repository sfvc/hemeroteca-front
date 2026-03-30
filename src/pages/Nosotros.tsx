{/* Campos */}

type InfoCardsProps = {
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  variant?: "light" | "brand";
  reverse?: boolean;
};

function InfoCard({
  title,
  description,
  image,
  eyebrow,
  variant = "brand",
  reverse = false,
}: InfoCardsProps) {
  const panelBrand = "bg-white text-slate-800";
  const panelLight = "bg-white text-white";

  return (
    <article className="w-full max-w-7xl mx-auto mb-14">
      <div className="relative overflow-hidden bg-white">
        <div
          className={`grid items-stretch md:grid-cols-12 ${
            reverse
              ? "md:[&_.visual-side]:order-2 md:[&_.text-side]:order-1"
              : ""
          }`}
        >
          {/* TITULO Y DESCRIPCION */}
          <div
            className={`text-side relative md:col-span-5 flex items-center ${
              variant === "brand" ? panelBrand : panelLight
            }`}
          >
            <div className="w-full px-6 sm:px-10 md:px-12 py-10 sm:py-12 font-serif">
              <div className="max-w-xl">
                <h3 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                  {title}
                </h3>

                <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </div>
          </div>
          <div className="visual-side relative md:col-span-7 p-4 sm:p-5">
            <div className="grid h-full grid-cols-6 grid-rows-2 gap-4 min-h-105 md:min-h-130">
              {/* Imagen principal */}
              <div className="col-span-12 row-span-2 md:col-span-8 relative overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0" />

                {eyebrow ? (
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
                      {eyebrow}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Nosotros() {
  return (
    <section className="bg-white">
      {/* HEADER */}
      <header className="border-b border-slate-300 bg-white mt-30">
        <div className="border-b border-slate-200">
          <div className="mx-auto flex w-full max-w-350 items-center justify-between px-4 py-3 text-xs sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 text-slate-600">
              <span className="font-semibold uppercase tracking-[0.2em]">
                Hemeroteca digital
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">Catamarca Capital</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-350 px-4 pt-6 sm:px-6 lg:px-8">
          <div className="grid items-center gap-4 border-b border-slate-300 pb-6 md:grid-cols-3">
            <div className="hidden md:block"></div>

            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em] text-slate-500">
                Desarrollo
              </p>
              <h1 className="mt-2 font-serif text-5xl font-black uppercase tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
                Sobre Nosotros
              </h1>
            </div>
          </div>

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

      {/* Contenido */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-1 sm:py-14 lg:py-16">
        <div className="space-y-10 sm:space-y-14 lg:space-y-16">
          <InfoCard
            title="¿Quiénes somos en Hemeroteca Digital?"
            description={`Consulta las colecciones digitales de diarios, periódicos y revistas de Catamarca que estamos preservando y poniendo en línea. También podés solicitar una noticia en particular para recibirla por correo electrónico.`}
            image="/HM.png"
            variant="brand"
          />

          <Divider />

          <InfoCard
            title="¿Quiénes desarrollamos Hemeroteca Digital?"
            description={`En el Nodo Tecnológico de la Secretaría Municipal de Modernización del Gobierno de Catamarca, trabajamos para preservar y difundir el patrimonio periodístico de nuestra provincia a través de la Hemeroteca Digital. Nuestro equipo se dedica a digitalizar, catalogar y poner a disposición del público las colecciones de diarios, periódicos y revistas que forman parte de la historia de Catamarca.`}
            image="https://www.catamarcaciudad.gob.ar/wp-content/uploads/nodo-tecnologico.jpeg"
            variant="light"
          />

          <Divider />

          <InfoCard
            title="¿Dónde estamos ubicados?"
            description={`Nosotros en la Biblioteca Municipal estamos ubicados en los siguientes puntos de la ciudad de Catamarca:`}
            image="/ubiHemeroteca.png"
            variant="brand"
          />
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex justify-center">
      <div className="h-px w-full max-w-xs sm:max-w-md lg:max-w-lg bg-slate-200 rounded-full" />
    </div>
  );
}
