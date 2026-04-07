import { Star } from "lucide-react";
import { useState } from "react";

const reviews = [
  {
    name: "María Gómez",
    rating: 4,
    text: "Un espacio cultural increíble, muy bien organizado.",
  },
  {
    name: "Lucas Díaz",
    rating: 5,
    text: "Excelente atención y gran contenido histórico.",
  },
  {
    name: "Camila Rojas",
    rating: 4,
    text: "Muy buena experiencia, volvería sin dudas.",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < n ? "fill-amber-400 text-amber-400" : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

export default function ResenasHome() {
  const [open] = useState(false);

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

          {/* <button
            onClick={() => setOpen(true)}
            className="text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Ver todas →
          </button> */}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <article
              key={i}
              className="rounded-2xl bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{r.name}</span>
                <Stars n={r.rating} />
              </div>

              <p className="mt-3 text-sm text-slate-600">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-90 bg-black/60 backdrop-blur-sm p-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6">
            <h3 className="text-xl font-bold mb-4">Todas las reseñas</h3>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              {reviews.map((r, i) => (
                <div key={i} className="border-b pb-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">{r.name}</span>
                    <Stars n={r.rating} />
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
