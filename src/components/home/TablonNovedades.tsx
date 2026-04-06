import { useEffect, useState } from "react";
import { CalendarDays, Flag, Music2, Ticket } from "lucide-react";
import { fetchNovedades } from "../../services/koha-service";

interface NovedadesItem {
  id: number;
  titulo: string;
  contenido?: string;
  icono?: string;
  activo?: boolean;
}

const iconMap = [Music2, Flag, Ticket, CalendarDays];

export default function TablonNovedades({ compact = false }) {
  const [novedades, setNovedades] = useState<NovedadesItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data: NovedadesItem[] | null = await fetchNovedades();

      if (data) {
        const activas: NovedadesItem[] = data.filter(
          (item: NovedadesItem) => item.activo === true,
        );
        setNovedades(activas);
      }
    };

    getData();
  }, []);

  return (
    <section
      className={`relative overflow-hidden border border-slate-200 bg-slate-800 mt-5 shadow-md rounded-md ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      <div className="absolute inset-0 opacity-10 background-image:[radial-gradient(#ffffff_1px,transparent_1px) background-size:14px_14px]" />
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/10" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md shadow-xl ring-1 ring-white/10">
          <h3 className=" font-serif text-2xl font-black uppercase text-slate-100">
            Novedades
          </h3>
        </div>

        <div className="space-y-4">
          {novedades.map((note, index) => {
            const Icon = iconMap[index % iconMap.length];

            // const rotateStyles = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];
            const pinColors = [
              "bg-red-600",
              "bg-cyan-600",
              "bg-orange-500",
              "bg-green-600",
            ];

            return (
              <article
                key={note.id}
                className={`group relative transition duration-300 hover:rotate-0 hover:scale-[1.02] cursor-pointer `}
              >
                <div className="bg-gray-100 relative min-h-35 p-4">
                  <div
                    className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full ${pinColors[index % 4]} shadow-md`}
                  />

                  <div className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-[40%] rounded-full bg-white/75" />

                  <div className="mb-3 flex items-center gap-2 text-slate-700">
                    <Icon className="h-5 w-5" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
                      {note.titulo}
                    </span>
                  </div>

                  <p className="text-sm font-semibold leading-6 text-slate-800">
                    {note.contenido}
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
