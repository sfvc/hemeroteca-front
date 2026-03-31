import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const featured = {
  category: "MUSICA",
  title: "Airbag en Catamarca!",
  description:
    "Airbag aterriza en Catamarca con un recital que promete convocar a fanáticos de toda la región. La fecha genera muchísima expectativa entre el público joven y se perfila como uno de los eventos musicales más fuertes de la temporada. Será una noche para disfrutar de los grandes éxitos de la banda y vivir una experiencia única en el Estadio Bicentenario.",
  image: "/airbagBanner2.png",
};

export default function NoticiaPrincipal() {
  const navigate = useNavigate();
  return (
    <section className="overflow-hidden rounded-[28px] bg-white">
      <div className="relative overflow-hidden">
        <img
          src={featured.image}
          alt={featured.title}
          className="h-80 w-full object-cover sm:h-95 lg:h-107.5"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute left-0 top-0 m-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
          {featured.category}
        </div>
      </div>

      <div className="bg-gray-100 p-5 sm:p-7">
        <div className="max-w-3xl">
          <h2 className="font-serif text-2xl font-bold uppercase leading-tight text-slate-800 sm:text-3xl lg:text-4xl">
            {featured.title}
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            {featured.description}
          </p>
        </div>
        <button
          onClick={() => navigate("/noticias")}
          className="mt-5 inline-flex items-center gap-2 text-md font-semibold text-slate-800 transition hover:gap-3 cursor-pointer"
        >
          Ver mas
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
