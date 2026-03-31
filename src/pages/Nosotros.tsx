import EditorialHero from "../components/home/EditorialNavbar";

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
    <article className="mx-auto mb-14 w-full max-w-7xl">
      <div className="relative overflow-hidden bg-white">
        <div
          className={`grid items-stretch md:grid-cols-12 ${
            reverse
              ? "md:[&_.visual-side]:order-2 md:[&_.text-side]:order-1"
              : ""
          }`}
        >
          <div
            className={`text-side relative flex items-center md:col-span-5 ${
              variant === "brand" ? panelBrand : panelLight
            }`}
          >
            <div className="w-full px-6 py-10 font-serif sm:px-10 sm:py-12 md:px-12">
              <div className="max-w-xl">
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                  {title}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>
          </div>

          <div className="visual-side relative p-4 sm:p-5 md:col-span-7">
            <div className="grid h-full min-h-105 grid-cols-6 grid-rows-2 gap-4 md:min-h-130">
              <div className="relative col-span-12 row-span-2 overflow-hidden md:col-span-8">
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
      <main className="w-full px-6 pb-14 pt-8 lg:px-10 xl:px-16">
        <EditorialHero />

        <div className="mx-auto w-full max-w-7xl py-8 sm:py-14 lg:py-16">

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

          </div>
        </div>
      </main>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex justify-center">
      <div className="h-px w-full max-w-xs rounded-full bg-slate-200 sm:max-w-md lg:max-w-lg" />
    </div>
  );
}