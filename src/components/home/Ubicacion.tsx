import { MapPin, Mail, Phone } from "lucide-react";

export default function UbicacionHome() {
  return (
    <section className="rounded-3xl bg-white p-6 border border-slate-300">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">
          Ubicación
        </p>
        <h3 className="font-serif text-2xl font-black text-slate-900">
          Visitá la Hemeroteca
        </h3>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* MAPA */}
        <div className="overflow-hidden rounded-2xl">
          <iframe
            src="https://www.google.com/maps?q=Catamarca&z=15&output=embed"
            className="h-75 w-full"
          />
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-between">
          <div className="space-y-4 text-sm text-slate-600">
            <div className="flex gap-3">
              <MapPin />
              Dirección completa de la Hemeroteca
            </div>

            <div className="flex gap-3">
              <Mail />
              Hemeroteca@gmail.com
            </div>

            <div className="flex gap-3">
              <Phone />
              XXXX-XXXXXX
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
