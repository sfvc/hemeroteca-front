import EditorialHero from "../components/home/EditorialNavbar";
import Carrousel from "../components/extrasFijos/Carrousel";
import {
  Music2,
  ExternalLink,
  PartyPopper,
  Clock3,
  MapPin,
  Ticket,
  Radio,
  WandSparkles,
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
    // Datos: [
    //   "Lugar: Estadio Bicentenario",
    //   "Horario: 22:00 hs",
    //   "Entradas: anticipadas disponibles",
    //   "Edad: mayores de 16 años",
    //   "Se recomienda llegar con anticipación",
    //   "Respetar indicaciones del personal",
    // ],
    icon: Music2,
    tone: "bg-[#F0901B]",
  },
  {
    id: 2,
    label: "MMM: Misterios Misteriosamente Misteriosos",
    date: "27 marzo 2026",
    title: "Creen en lo Paranormal? Se viene el MMM a Catamarca",
    subTitle:
      "La provincia se prepara para recibir a los investigadores más reconocidos del país en una jornada dedicada a los fenómenos paranormales.",
    description:
      "El evento MMM: Misterios Misteriosamente Misteriosos llega a Catamarca con la presencia de expertos en fenómenos paranormales, quienes compartirán sus investigaciones y experiencias. La jornada promete ser una oportunidad única para los amantes del misterio y lo desconocido, con charlas, debates y actividades relacionadas con el mundo paranormal. Se espera una gran convocatoria de público interesado en descubrir los enigmas que rodean a estos fenómenos.",
    image: "/Misterios.png",
    Url: "https://youtu.be/dQw4w9WgXcQ?si=v37lWTMIOkm-YEGl",
    // Datos: [
    //   "Circuito: Valle Viejo",
    //   "Hora de inicio: 09:00 hs",
    //   "Acceso: libre en sectores habilitados",
    //   "Actividades para toda la familia",
    //   "Zona gastronómica disponible",
    // ],
    icon: WandSparkles,
    tone: "bg-[#0F4C94]",
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
    // Datos: [
    //   "Lugar: Predio Ferial",
    //   "Horario general: 09:00 hs a 00:00 hs",
    //   "Patios gastronómicos hasta la madrugada",
    //   "Acceso libre en sectores seleccionados",
    //   "Shows y actividades Novedades",
    // ],
    icon: PartyPopper,
    tone: "bg-[#F0901B]",
  },
];

export default function Noticias() {
  const mainNews = featuredNews[0];

  return (
    <section className="min-h-screen bg-white text-slate-900">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-2">
        {/* Navbar estilo diario */}

        <EditorialHero />

        <div className="mt-8">
          {/* Aca si banco que este el carrusel */}

          <Carrousel />

          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-7xl">
              <HeroNews news={mainNews} />
            </div>
          </div>

          <section className="mt-12 border-t border-slate-300 pt-8">
            <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-md font-bold uppercase tracking-windest text-cyan-600">
                  Cobertura destacada
                </p>
                <h2 className="mt-2 font-serif text-2xl font-black uppercase leading-none sm:text-2xl">
                  En otras Novedades...
                </h2>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center gap-8">
              {featuredNews.map((news) => (
                <div key={news.id} className="w-full max-w-7xl">
                  <NewsCard news={news} />
                </div>
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
    <section className="mt-8">
      <article>
        <div className="border-b border-slate-300 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">
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
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-200 px-5 py-3 text-sm font-semibold text-cyan-600 transition hover:bg-slate-100"
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

              <p>
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised
                in the 1960s with the release of Letraset sheets containing
                Lorem Ipsum passages, and more recently with desktop publishing
                software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
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
                <div className="overflow-hidden bg-slate-100 aspect-3/4 lg:aspect-2/3 flex items-center justify-center shadow-md">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="h-full w-full object-contain"
                  />
                </div>
              )}

              {/* {news.Datos && news.Datos.length > 0 && (
                <div className="border border-slate-200 bg-slate-50 p-5">
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
              )} */}
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
      <div className="mt-0.5 rounded-full bg-slate-200 p-2">
        <Icon className="h-5 w-5 text-cyan-600" />
      </div>
      <p className="text-sm text-slate-700 mt-2">{text}</p>
    </div>
  );
}
