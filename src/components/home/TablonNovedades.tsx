import { CalendarDays, Flag, Music2, Ticket } from "lucide-react";

const Notitas = [
  {
    id: 1,
    text: "Airbag en Catamarca: crónica de un concierto épico y su impacto en la escena local.",
    tone: "bg-white",
    pin: "bg-rose-600",
    rotate: "-rotate-1",
    icon: Music2,
    label: "Airbag",
  },
  {
    id: 2,
    text: "Rally en Catamarca: se disputara la nueva fecha del automovilismo este 27 de marzo",
    tone: "bg-white",
    pin: "bg-sky-600",
    rotate: "rotate-1",
    icon: Flag,
    label: "Rally",
  },
  {
    id: 3,
    text: "Fiesta Internacional del poncho cada vez mas cerca! Mira quienes son los artistas confirmados, donde sacar la entrada y mas!",
    tone: "bg-white",
    pin: "bg-amber-500",
    rotate: "-rotate-1",
    icon: Ticket,
    label: "Fiesta",
  },
  {
    id: 4,
    text: "Nodo Tecnologico Catamarca: un espacio de innovación, aprendizaje y colaboración para jóvenes interesados en tecnología, programación y cultura maker.",
    tone: "bg-white",
    pin: "bg-violet-600",
    rotate: "rotate-1",
    icon: CalendarDays,
    label: "Nodo",
  },
    {
    id: 5,
    text: "Nodo Tecnologico Catamarca: un espacio de innovación, aprendizaje y colaboración para jóvenes interesados en tecnología, programación y cultura maker.",
    tone: "bg-white",
    pin: "bg-violet-600",
    rotate: "rotate-1",
    icon: CalendarDays,
    label: "Nodo",
  },
];

export default function TablonNovedades({ compact = false }) {
  return (
    <section
      className={`relative overflow-hidden rounded-[28px] border border-slate-200 bg-[#867e75] ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      <div className="absolute inset-0 opacity-10 background-image:[radial-gradient(#ffffff_1px,transparent_1px) background-size:14px_14px]" />
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/10" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md shadow-md ring-1 ring-white/10">
          <h3 className="font-serif text-2xl font-black uppercase text-white">
            Novedades
          </h3>
        </div>

        <div className="space-y-4">
          {Notitas.map((note) => {
            const Icon = note.icon;

            return (
              <article
                key={note.id}
                className={`${note.rotate} group relative transition duration-300 hover:rotate-0 hover:scale-[1.015] cursor-pointer`}
              >
                <div
                  className={`${note.tone} relative rounded-[22px] p-4 shadow-[0_12px_25px_rgba(15,23,42,0.18)] ring-1 ring-slate-200/70`}
                >
                  <div
                    className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full ${note.pin} shadow-md`}
                  />
                  <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-[40%] rounded-full bg-white/80" />

                  <div className="mb-3 flex items-center gap-2 text-slate-700">
                    <Icon className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-600">
                      {note.label}
                    </span>
                  </div>

                  <p className="text-sm font-semibold leading-7 text-slate-800">
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
