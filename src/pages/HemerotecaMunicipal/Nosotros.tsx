import { useEffect, useState } from "react";
import EditorialHero from "../../components/extras/EditorialNavbar";
import Equipo from "../../components/extras/Equipo";
import { fetchQueHacemos, type QueHacemos } from "../../services/koha-service";

type InfoCardsProps = {
  title: string;
  description: string;
  image: string;
  eyebrow?: string;
  variant?: "light" | "brand";
  reverse?: boolean;
  isHtml?: boolean;
};

const hasContent = (item?: {
  titulo?: string;
  descripcion?: string;
  imagenUrl?: string;
} | null) => {
  if (!item) return false;

  return (
    Boolean(item.titulo?.trim()) ||
    Boolean(item.descripcion?.trim()) ||
    Boolean(item.imagenUrl?.trim())
  );
};

function InfoCard({
  title,
  description,
  image,
  eyebrow,
  reverse = false,
}: InfoCardsProps) {
  const hasText = title || description || eyebrow;
  const hasImage = image;

  // 🚫 Si no hay nada, no renderiza
  if (!hasText && !hasImage) return null;

  return (
    <article className="mx-auto w-full max-w-7xl">
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

        <div
          className={`grid items-stretch md:grid-cols-12 ${reverse
            ? "md:[&_.visual-side]:order-2 md:[&_.text-side]:order-1"
            : ""
            }`}
        >
          {/* 📝 TEXTO */}
          {hasText && (
            <div className="text-side relative flex items-center md:col-span-5">
              <div className="w-full px-6 py-10 sm:px-10 sm:py-12 md:px-12">

                {eyebrow && (
                  <span className="inline-block text-xs font-semibold tracking-wide text-slate-400 uppercase">
                    {eyebrow}
                  </span>
                )}

                {title && (
                  <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                    {title}
                  </h3>
                )}

                {description && (
                  <div
                    className="mt-5 text-slate-600 text-base leading-relaxed sm:text-lg
                    [&_p]:mb-4
                    [&_span]:text-inherit"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
              </div>
            </div>
          )}

          {/* 🖼️ IMAGEN */}
          {hasImage && (
            <div className="visual-side relative md:col-span-7">
              <div className="relative h-full min-h-65 md:min-h-105 overflow-hidden">
                <img
                  src={image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-linear-to-br from-white/10 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Nosotros() {
  const [info, setInfo] = useState<QueHacemos | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchQueHacemos();
      setInfo(data);
    };

    load();
  }, []);

  return (
    <section className="bg-white">
      <main className="w-full px-6 pb-14 pt-2 lg:px-10 xl:px-16">
        <EditorialHero />

        <div className="mx-auto w-full max-w-7xl py-8 sm:py-14 lg:py-16">
          <div className="space-y-10 sm:space-y-14 lg:space-y-16">

            {/* 🔹 QUIENES SOMOS */}
            {hasContent(info?.quienesSomos) && info?.quienesSomos && (
              <InfoCard
                title={info.quienesSomos.titulo}
                description={info.quienesSomos.descripcion}
                image={info.quienesSomos.imagenUrl}
                variant="brand"
              />
            )}

            <Divider />

            {/* 🔹 QUE HACEMOS */}
            {hasContent(info?.queHacemos) && info?.queHacemos && (
              <InfoCard
                title={info.queHacemos.titulo}
                description={info.queHacemos.descripcion}
                image={info.queHacemos.imagenUrl}
                variant="light"
                reverse
              />
            )}

            <Equipo />

            <Divider />
          </div>
        </div>
      </main>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex justify-center py-2">
      <div className="h-px w-full max-w-xl bg-linear-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
}
