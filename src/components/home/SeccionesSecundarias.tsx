import { ChevronRight } from "lucide-react";

{
  /* CAMPOS DE LA CARD */
}

const secondaryNews = [
  {
    id: 1,
    category: "Desarrollo",
    title: "Aprende mas sobre nosotros!",
    description:
      "Descubre más sobre nosotros, nuestro compromiso con la comunidad juvenil de Catamarca y cómo trabajamos para fomentar la cultura, la educación y el desarrollo de los jóvenes en nuestra ciudad. Conoce nuestras iniciativas, eventos y proyectos diseñados para inspirar y empoderar a las nuevas generaciones.",
    image: "/SobreNosotros.png",
  },
  {
    id: 2,
    category: "CULTURA",
    title:
      "Fiesta del Poncho 2024: artistas confirmados y actividades planeadas",
    description:
      "La Fiesta del Poncho 2024 se acerca y promete ser un evento inolvidable en Catamarca. Con una lista de artistas confirmados que incluye a destacados músicos nacionales e internacionales, así como una variedad de actividades culturales, esta edición del festival se perfila como una celebración vibrante de la cultura catamarqueña. Descubre quiénes serán los protagonistas de esta fiesta y qué actividades emocionantes se han planeado para los asistentes.",
    image: "/VintageMini.png",
  },
  {
    id: 3,
    category: "Educacion",
    title: "Hemeroteca: Archivo general Municipal",
    description:
      "Para los adictos a saber cada detalle de nuestra historia y cultura. Investiga y recorre la biblioteca municipal leyendo libros, periodicos, aprendiendo sobre personajes y mas!",
    image: "/HM.png",
  },
];

{
  /* CARDS SECUNDARIAS DEL HOME */
}

export default function SecondaryNewsSection() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-slate-300 pb-3">
        <h3 className="font-serif text-2xl font-black uppercase text-slate-900"></h3>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {secondaryNews.map((item) => (
          <article
            key={item.id}
            className="relative group overflow-hidden rounded-3xl bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-105 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] cursor-pointer"
          >
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute left-0 top-0 m-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
              {item.category}
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7"></div>

            <div className="p-5">
              <h4 className="font-serif text-xl font-black text-slate-900">
                {item.title}
              </h4>
              <p className="mt-3 text-sm text-slate-600">{item.description}</p>

              {/* boton para redirigir a la pagina que se quiera o articulos */}

              <button className="mt-5 inline-flex items-center gap-2 text-md font-semibold text-slate-800 transition hover:gap-3">
                Ver mas
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
