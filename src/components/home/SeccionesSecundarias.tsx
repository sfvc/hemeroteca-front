import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const secondaryNews = [
  {
    id: 1,
    category: "Tutorial",
    title: "Detras de La  Foto",
    description:
      "Aqui va uno de los 2 videos con fondo de tele viejo. (No hara falta loguearse)",
    image: "/hemerotecaVintage.png",
  },
  {
    id: 2,
    category: "Tutorial",
    title: "Practicas de Conservacion",
    description:
      "Aqui va uno de los 2 videos con fondo de tele viejo. (No hara falta loguearse)",
    image: "/hemerotecaVintage.png",
  },
  {
    id: 3,
    category: "Investigacion",
    title: "Nuestras Colecciones",
    description:
      "Aqui puedes ver todas nuestras colecciones de Libros, revistas, diarios y mas! Ingresa a la AGM (Archivo General Municipal) a investigar, ver y descargar cualquier contenido que quieras!. (Hara falta Loguearse)",
    image: "/hemerotecaVintage.png",
  },
  {
    id: 4,
    category: "Investigacion",
    title: "AGM: Archivo general Municipal",
    description:
      "Para los adictos a saber cada detalle de nuestra historia y cultura. Investiga y recorre la biblioteca municipal leyendo libros, periodicos, aprendiendo sobre personajes y mas!. (Hara falta Loguearse)",
    image: "/hemerotecaVintage.png",
  },
];

export default function SeccionesSecundarias() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-5 border-b border-slate-300 pb-3"></div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {secondaryNews.map((item) => (
          <article
            key={item.id}
            className="group overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] cursor-pointer"
          >
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute left-0 top-0 m-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.24em] text-slate-700 backdrop-blur">
                {item.category}
              </div>
            </div>

            <div className="p-5">
              <h4 className="font-serif text-xl font-black text-slate-900">
                {item.title}
              </h4>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {item.description}
              </p>

              <button
                onClick={() => navigate("/login")}
                className="mt-5 inline-flex items-center gap-2 text-md font-semibold text-slate-800 transition hover:gap-3 cursor-pointer"
              >
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
