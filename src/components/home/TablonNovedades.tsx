import { CalendarDays, Flag, Music2, Ticket } from "lucide-react";

{
  /* TITULO, COLORES, ICONO Y ROTACION DE LAS CARDS */
}

const Notitas = [
  {
    id: 1,
    text: "Airbag en Catamarca: crónica de un concierto épico y su impacto en la escena local.",
    tone: "bg-gray-100",
    pin: "bg-rose-600",
    rotate: "-rotate-2",
    icon: Music2,
  },
  {
    id: 2,
    text: "Rally en Catamarca: se disputara la nueva fecha del automovilismo este 27 de marzo",
    tone: "bg-gray-100",
    pin: "bg-sky-600",
    rotate: "rotate-1",
    icon: Flag,
  },
  {
    id: 3,
    text: "Fiesta Internacional del poncho cada vez mas cerca! Mira quienes son los artistas confirmados, donde sacar la entrada y mas!",
    tone: "bg-gray-100",
    pin: "bg-amber-500",
    rotate: "-rotate-1",
    icon: Ticket,
  },
  {
    id: 4,
    text: "Nodo Tecnologico Catamarca: un espacio de innovación, aprendizaje y colaboración para jóvenes interesados en tecnología, programación y cultura maker.",
    tone: "bg-gray-100",
    pin: "bg-violet-600",
    rotate: "rotate-2",
    icon: CalendarDays,
  },
];

export default function Tablon() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-[#bd998b] p-5 sm:p-6">
      <div className="absolute inset-0 opacity-10 background-image:[radial-gradient(#2d1608_1px,transparent_1px)] background-size:12px_12px]" />
      <div className="absolute inset-0 bg-linear-to-br from-white/5 via-transparent to-black/10" />

      {/* TITULO */}

      <div className="relative z-10">
        <div className="mb-5 inline-block rounded-md px-4 py-2 shadow-md">
          <h3 className="font-serif text-2xl font-black uppercase text-gray-100">
            Novedades
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {Notitas.map((note) => {
            const Icon = note.icon;

            {
              /* LA CARD */
            }

            return (
              <article
                key={note.id}
                className={`${note.rotate} group relative transition duration-300 hover:rotate-0 hover:scale-[1.02] cursor-pointer`}
              >
                <div
                  className={`${note.tone} relative min-h-35 rounded-xl p-4 shadow-[0_12px_25px_rgba(15,23,42,0.18)]`}
                >
                  <div
                    className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full ${note.pin} shadow-md`}
                  />
                  <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-[40%] rounded-full bg-white/75" />

                  <div className="mb-3 flex items-center gap-2 text-slate-700">
                    <Icon className="h-5 w-5" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
                      {note.text.split(" ")[0]}
                    </span>
                  </div>

                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {note.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
