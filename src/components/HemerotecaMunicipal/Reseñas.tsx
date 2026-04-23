import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchReviews } from "../../services/koha-service";

interface Review {
  id: number;
  nombre: string;
  descripcion: string;
  estrellas: number;
  activo?: boolean | null;
}

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < n ? "fill-amber-400 text-amber-400" : "text-slate-300"
            }`}
        />
      ))}
    </div>
  );
}

export default function ResenasHome() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadReviews = async () => {
      const data = await fetchReviews();
      if (data) setReviews(data);
      setLoading(false);
    };

    loadReviews();
  }, []);

  const activeReviews = reviews.filter((r) => r.activo === true);

  if (!loading && activeReviews.length === 0) {
    return null;
  }

  return (
    <>
      <section className="bg-white p-6 border border-slate-100 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-700">
              Reseñas
            </p>
            <h3 className="font-serif text-2xl font-black text-slate-900">
              Opiniones de Usuarios
            </h3>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Ver todas →
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-slate-500">Cargando reseñas...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {activeReviews.slice(0, 3).map((r) => (
              <article
                key={r.id}
                className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">{r.nombre}</span>
                  <Stars n={r.estrellas} />
                </div>

                <p className="mt-3 text-sm text-slate-600">
                  {r.descripcion}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center min-h-dvh">
          <div className="w-full max-w-3xl mx-4 rounded-2xl bg-white p-6 max-h-[85dvh] flex flex-col">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Todas las reseñas</h3>
              <button
                onClick={() => setOpen(false)}
                className="cursor-pointer text-sm text-slate-500 hover:text-black"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="space-y-4 overflow-y-auto">
              {reviews
                .filter((r) => r.activo === true)
                .map((r) => (
                  <div key={r.id} className="border-b pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">{r.nombre}</span>
                      <Stars n={r.estrellas} />
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                      {r.descripcion}
                    </p>
                  </div>
                ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
