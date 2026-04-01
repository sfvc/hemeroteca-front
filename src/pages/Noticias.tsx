import EditorialHero from "../components/home/EditorialNavbar";
import Carrousel from "../components/Carrousel";
import {
  Music2,
  Flag,
  ExternalLink,
  PartyPopper,
  Clock3,
  MapPin,
  Ticket,
  Radio,
  ChevronRight,
} from "lucide-react";

type NewNotice = {
  id: number;
  label: string;
  date: string;
  title: string;
  subTitle: string;
  description: string;
  image?: string;
  Url?: string;
  Datos?: string[];
  icon: React.ElementType;
  tone: string;
};

const featuredNews: NewNotice[] = [
  {
    id: 1,
    label: "Airbag",
    date: "25 abril 2026",
    title: "Airbag toca en Catamarca este 25 de abril",
    subTitle:
      "La banda llega a la provincia con uno de los shows más esperados del año.",
    description:
      "Airbag aterriza en Catamarca con un recital que promete convocar a fanáticos de toda la región. La fecha genera muchísima expectativa entre el público joven y se perfila como uno de los eventos musicales más fuertes de la temporada. Será una noche para disfrutar de los grandes éxitos de la banda y vivir una experiencia única en el Estadio Bicentenario.",
    image:
      "https://es.rollingstone.com/wp-content/uploads/2025/12/El-rock-esta-en-un-gran-momento-Airbag-1.jpg",
    Url: "https://youtu.be/dQw4w9WgXcQ?si=v37lWTMIOkm-YEGl",
    Datos: [
      "Lugar: Estadio Bicentenario",
      "Horario: 22:00 hs",
      "Entradas: anticipadas disponibles",
      "Edad: mayores de 16 años",
      "Se recomienda llegar con anticipación",
      "Respetar indicaciones del personal",
    ],
    icon: Music2,
    tone: "bg-red-600",
  },
  {
    id: 2,
    label: "Rally",
    date: "27 marzo 2026",
    title: "Nueva fecha del rally en Catamarca",
    subTitle:
      "Se viene una nueva jornada del automovilismo con gran expectativa entre pilotos y fanáticos.",
    description:
      "La provincia vuelve a recibir una de las competencias más convocantes del calendario deportivo local. Será una fecha clave para el campeonato y una gran oportunidad para disfrutar de un fin de semana a pura velocidad. El circuito de Valle Viejo se prepara para recibir a los mejores pilotos y a miles de fanáticos.",
    image:
      "https://www.rallyargentino.com/documentos/carreras/716e0e0f0cd1ad74f5a510198a98b39f.jpg",
    Url: "https://youtu.be/dQw4w9WgXcQ?si=v37lWTMIOkm-YEGl",
    Datos: [
      "Circuito: Valle Viejo",
      "Hora de inicio: 09:00 hs",
      "Acceso: libre en sectores habilitados",
      "Actividades para toda la familia",
      "Zona gastronómica disponible",
    ],
    icon: Flag,
    tone: "bg-sky-600",
  },
  {
    id: 3,
    label: "Festival",
    date: "18 julio 2026",
    title: "La Fiesta del Poncho cada vez más cerca",
    subTitle:
      "Crece la expectativa por una nueva edición de uno de los eventos más importantes de la provincia.",
    description:
      "La Fiesta del Poncho se prepara para una nueva edición con propuestas culturales, música, gastronomía y artesanías. Cada jornada promete convocar a visitantes de distintos puntos del país, consolidando a Catamarca como un polo cultural y turístico durante la temporada.",
    image:
      "https://latamvoyage.com/wp-content/uploads/2023/07/62bc7c6d8f22c.jpg",
    Url: "https://youtu.be/dQw4w9WgXcQ?si=v37lWTMIOkm-YEGl",
    Datos: [
      "Lugar: Predio Ferial",
      "Horario general: 09:00 hs a 00:00 hs",
      "Patios gastronómicos hasta la madrugada",
      "Acceso libre en sectores seleccionados",
      "Shows y actividades Novedades",
    ],
    icon: PartyPopper,
    tone: "bg-orange-600",
  },
];

export default function Noticias() {
  const mainNews = featuredNews[0];

  return (
    <section className="min-h-screen bg-white text-slate-900">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-2">
        <EditorialHero />
        <div className="mt-8">
          {/* Aca si banco que este el carrusel */}
          <Carrousel />
          <HeroNews news={mainNews} />

          <section className="mt-12 border-t border-slate-300 pt-8">
            <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-slate-500">
                  Cobertura destacada
                </p>
                <h2 className="mt-2 font-serif text-4xl font-black uppercase leading-none sm:text-5xl">
                  En otras Noticias...
                </h2>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-950"
              >
                Ver archivo completo
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 space-y-8">
              {featuredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </section>
  );
}
{
  /* Noticia principal (tiene los mismos datos de la primera noticia de abajo) */
}

function HeroNews({ news }: { news: NewNotice }) {
  return (
    <section className="mt-8 grid gap-8 lg:grid-cols-12">
      <article className="lg:col-span-8">
        <div className="border-b border-slate-300 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center rounded-full bg-slate-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-600">
              {news.label}
            </span>
            <span>{news.date}</span>
          </div>

          <h2 className="mt-4 max-w-5xl font-serif text-2xl font-black sm:text-5xl lg:text-7xl">
            {news.title}
          </h2>

          <p className="mt-5 max-w-3xl text-lg text-slate-700 sm:text-xl">
            {news.subTitle}
          </p>
        </div>

        <div className="mt-6 overflow-hidden border border-slate-200 bg-white">
          {news.image && (
            <img
              src={news.image}
              alt={news.title}
              className="h-70 w-full object-cover sm:h-105"
            />
          )}

          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div>
              <p className="text-base leading-8 text-slate-700 sm:text-lg">
                {news.description}
              </p>

              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                Palabras de la banda:
                <br />
                “Esperamos que nuestros fans de catamarca pasen una noche
                inolvidable, se diviertan y tomen mucho que es lo mas
                importante”
              </p>

              {news.Url && (
                <a
                  href={news.Url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-700 px-5 py-3 text-sm font-semibold text-orange-600 transition hover:bg-slate-600"
                >
                  Leer nota completa
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <aside className="space-y-4 bg-slate-100 p-5">
              <div>
                <p className="text-xs font-bold uppercase text-slate-500">
                  Detalles:
                </p>
                <div className="mt-4 space-y-4">
                  <MiniData icon={MapPin} text="Estadio Bicentenario" />
                  <MiniData icon={Clock3} text="22:00hs" />
                  <MiniData
                    icon={Radio}
                    text="Transmision en vivo por tv publica"
                  />
                  <MiniData
                    icon={Ticket}
                    text="Saca tus entradas en www.ticketed.com.ar"
                  />
                  <MiniData icon={Ticket} text="Acceso con entrada en mano" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* Noticias adicionales de la derecha */}

      <aside className="space-y-5 lg:col-span-4">
        <div className="border-2 border-slate-200 bg-slate-50 p-6 ">
          <p className="text-xs font-extrabold uppercase text-orange-600">
            Novedad
          </p>
          <h3 className="mt-3 text-2xl font-black leading-8 text-black">
            Nodo Tecnologico abre sus inscripciones para la diplomatura en
            Full-Stack
          </h3>
          <p className="mt-3 text-sm text-slate-800">
            Este proximo 25/03 se abren las incripciones para la Diplomatura en
            desarrollo web full stack en el nodo Tecnologico. Entra a si pagina
            y inscribete antes de quedarte sin cupos!
          </p>
        </div>
        <div className="border-2 border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-extrabold uppercase text-orange-600">
            Novedad
          </p>
          <h3 className="mt-3 text-2xl font-black leading-8 text-black">
            Marvel esta devuelta!
          </h3>
          <p className="mt-3 text-sm text-slate-800">
            El UCM vuelve a estar en boca de todos por el estreno de "Spider-man
            brand new day" este proximo 31 de julio de 2026. Despues de las
            fuertes criticas a sus ultimas series y peliculas, decicidieron
            apostarle al amigable vecino Spiderman. Esperamos que llene nuestras
            expectativas mientras esperamos el estreno de Avengers Doomsday.
          </p>
        </div>
        <div className="border-2 border-slate-200 bg-slate-50 p-6">
          <p className="text-xs font-extrabold uppercase text-orange-600">
            Novedad
          </p>
          <h3 className="mt-3 text-2xl font-black leading-8 text-black">
            Mano a mano con el padre de Colapinto: “Franco saca más fuerza
            gracias al apoyo de la gente”
          </h3>
          <p className="mt-3 text-sm text-slate-800">
            Llegó y saludó a todos y cada uno de los presentes. Con su habitual
            simpatía y amabilidad, Aníbal Colapinto acompañó con su impronta en
            el encuentro de la peña FC43 y se le iluminan los ojos cuando habla
            de su hijo, el piloto argentino que viene de sumar su primer punto
            con el equipo Alpine en la Fórmula 1. De hecho, anticipó el buen
            domingo que tuvo el piloto de 22 años en el Gran Premio de China.
          </p>
        </div>
      </aside>
    </section>
  );
}

{
  /* Las 3 Noticias de abajo */
}

function NewsCard({ news }: { news: NewNotice }) {
  const Icon = news.icon;

  return (
    <article className="overflow-hidden border border-slate-50 bg-white shadow-sm">
      <div className={`h-2 w-full ${news.tone}`} />

      <div className="p-6 sm:p-8 lg:p-10">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${news.tone} text-white`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              {news.label}
            </p>
            <p className="text-sm text-slate-500">{news.date}</p>
          </div>
        </div>

        <h2 className="mt-6 max-w-4xl font-serif text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
          {news.title}
        </h2>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
          {news.subTitle}
        </p>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                {news.description}
              </p>

              <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-bold tracking-[0.16em] text-slate-500 uppercase">
                  Palabras de la banda
                </h3>

                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-700">
                    “Esperamos que nuestros fans de catamarca pasen una noche
                    inolvidable, se diviertan y tomen mucho que es lo mas
                    importante”
                  </p>
                </div>
              </div>

              {news.Url && (
                <a
                  href={news.Url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Saber más
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="space-y-4 lg:col-span-5">
              {news.image && (
                <div className="overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-64 w-full object-cover"
                  />
                </div>
              )}

              {news.Datos && news.Datos.length > 0 && (
                <div className=" border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
                    Detalles
                  </h3>

                  <div className="mt-4 space-y-3">
                    {news.Datos.map((item, index) => (
                      <p
                        key={index}
                        className="text-sm leading-6 text-slate-700"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

{
  /* Card de detalles de la noticia princial */
}

function MiniData({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 rounded-full bg-white p-2">
        <Icon className="h-5 w-5 text-orange-600" />
      </div>
      <p className="text-sm text-slate-700 mt-2">{text}</p>
    </div>
  );
}
