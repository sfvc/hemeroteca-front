{
  /* CONTENIDO NOTICIA PRINCIPAL (home) */
}

const featured = {
  category: "MUSICA",
  title: "Airbag en Catamarca!",
  description:
    "Crónica de un concierto épico y su impacto en la escena local. Descubre cómo la banda argentina Airbag conquistó el escenario catamarqueño, dejando una huella imborrable en la música local y generando un impacto cultural que resonará por mucho tiempo.",
  image: "/airbagBanner2.png",
};

export default function MainStoryCard() {
  return (
    <section className="overflow-hidden rounded-[28px] bg-white">
      <div className="relative overflow-hidden">
        <img
          src={featured.image}
          alt={featured.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-0 top-0 m-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
          {featured.category}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7"></div>
      </div>
      <div className="bg-gray-100 flex items-center justify-start gap-2 p-5 sm:p-7">
        <div className="max-w-3xl">
          <h2 className="font-serif uppercase text-2xl font-bold leading-tight text-slate-800 sm:text-3xl lg:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {featured.description}
          </p>
        </div>
      </div>
    </section>
  );
}
