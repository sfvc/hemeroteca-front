import { useEffect, useState } from "react";
import {
  CalendarDays,
  Flag,
  Music2,
  Ticket,
  Bell,
  Megaphone,
  Newspaper,
  Sparkles,
  Star,
  AlertCircle,
} from "lucide-react";
import { fetchNovedades } from "../../services/koha-service";

interface NovedadesItem {
  id: number;
  titulo: string;
  contenido?: string;
  icono?: string;
  activo?: boolean;
}

const iconMap = [
  Music2,
  Flag,
  Ticket,
  CalendarDays,
  Bell,
  Megaphone,
  Newspaper,
  Sparkles,
  Star,
  AlertCircle,
];

export default function TablonNovedades({ compact = false }) {
  const [novedades, setNovedades] = useState<NovedadesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data: NovedadesItem[] | null = await fetchNovedades();

        if (data) {
          const activas: NovedadesItem[] = data
            .filter((item: NovedadesItem) => item.activo === true)
            .slice(0, 6);

          setNovedades(activas);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const pinColors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-orange-500",
    "bg-purple-600",
    "bg-yellow-500",
  ];

  return (
    <section
      className={`relative overflow-hidden border border-slate-200 bg-[#f0ebe9] ${
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6"
      }`}
    >
      <div className="absolute inset-0 opacity-10 background-image:[radial-gradient(#ffffff_1px,transparent_1px) background-size:14px_14px]" />
      <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/10" />

      <div className="relative z-10">
        <div className="mb-5 inline-flex rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md shadow-xl ring-1 ring-white/10">
          {loading ? (
            <div className="h-6 w-32 bg-slate-300 rounded animate-pulse" />
          ) : (
            <h3 className="font-serif text-2xl font-black uppercase text-slate-700">
              Novedades
            </h3>
          )}
        </div>

        <div className="space-y-4">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="relative bg-gray-100 min-h-30 p-4 animate-pulse shadow-[0_12px_25px_rgba(15,23,42,0.18)]"
                >
                  <div
                    className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full ${
                      pinColors[index % pinColors.length]
                    }`}
                  />

                  <div className="mb-3 flex items-center gap-2">
                    <div className="h-5 w-5 bg-slate-300 rounded" />
                    <div className="h-3 w-40 bg-slate-300 rounded" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 w-full bg-slate-300 rounded" />
                    <div className="h-3 w-5/6 bg-slate-300 rounded" />
                    <div className="h-3 w-2/3 bg-slate-300 rounded" />
                  </div>
                </div>
              ))
            : novedades.map((note, index) => {
                const Icon = iconMap[index % iconMap.length];

                return (
                  <article
                    key={note.id}
                    className="group relative transition duration-300 hover:scale-[1.02] cursor-pointer"
                  >
                    <div className="bg-gray-100 relative min-h-30 p-4 shadow-[0_12px_25px_rgba(15,23,42,0.18)]">
                      <div
                        className={`absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full ${
                          pinColors[index % pinColors.length]
                        } shadow-md`}
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
