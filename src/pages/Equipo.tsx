import { useEffect, useState } from "react";
import { fetchEquipo } from "../services/koha-service";
import KohaApi from "../api/kohaApi";
import EditorialHero from "../components/home/EditorialNavbar";

interface Miembro {
  id: number;
  nombre: string;
  descripcion: string;
  avatar: string;
  departamento: string;
}

function getInitials(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const Equipo = () => {
  const [equipo, setEquipo] = useState<Miembro[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = KohaApi.defaults.baseURL || "";

  useEffect(() => {
    const loadEquipo = async () => {
      try {
        const data = await fetchEquipo();
        setEquipo(data || []);
      } catch (error) {
        console.error("Error cargando equipo:", error);
      } finally {
        setLoading(false);
      }
    };
    loadEquipo();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-slate-300 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (equipo.length === 0) {
    return (
      <p className="text-center text-slate-400 py-12">
        No hay miembros disponibles.
      </p>
    );
  }

  return (
    <section className="py-10 px-4">
        <EditorialHero />
      {/* Título de sección */}
      <div className="mb-10 text-center mt-6">
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
          Quiénes somos
        </span>
        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
          Nuestro Equipo
        </h2>
        <div className="mt-3 mx-auto w-12 h-0.5 bg-slate-300 rounded-full" />
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {equipo.map((miembro) => {
          const avatarUrl = miembro.avatar
            ? `${apiUrl}/assets/${miembro.avatar}`
            : null;

          return (
            <div
              key={miembro.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
            >
              {/* Franja superior decorativa */}
              <div className="h-24 bg-linear-to-br from-slate-700 to-slate-900 relative overflow-hidden">
                {/* Patrón sutil */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* Avatar flotante */}
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={miembro.nombre}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md ring-2 ring-slate-100 group-hover:ring-slate-300 transition-all duration-300"
                    onError={(e) => {
                      // Fallback si la imagen falla
                      (e.target as HTMLImageElement).style.display = "none";
                      const parent = (e.target as HTMLImageElement)
                        .parentElement;
                      if (parent) {
                        parent.innerHTML = `<div class="w-24 h-24 rounded-full border-4 border-white shadow-md bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">${getInitials(miembro.nombre)}</div>`;
                      }
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xl">
                    {getInitials(miembro.nombre)}
                  </div>
                )}
              </div>

              {/* Contenido inferior */}
              <div className="pt-16 pb-6 px-5 text-center">
                <h3 className="font-bold text-slate-800 text-lg leading-tight">
                  {miembro.nombre}
                </h3>

                {miembro.descripcion && (
                  <p className="mt-1.5 text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {miembro.descripcion}
                  </p>
                )}

                {miembro.departamento && (
                  <span className="mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600 tracking-wide">
                    {miembro.departamento}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Equipo;
