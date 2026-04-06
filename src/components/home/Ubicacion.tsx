import { MapPin, Mail, Phone } from "lucide-react";

export default function UbicacionHome() {
  return (
    <section className="bg-white p-8 border border-slate-100 shadow-md">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">
          Ubicación
        </p>
        <h3 className="font-serif text-3xl font-extrabold text-slate-900 mt-2">
          Visitá la Hemeroteca
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Encontranos en el corazón de la ciudad con acceso fácil y rápido.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* MAPA */}
        <div className="overflow-hidden rounded-2xl shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.32361439379!2d-65.77718592363699!3d-28.469799260057627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x942429006de4490d%3A0x44ccd1e33d331fff!2sHemeroteca%20Municipal!5e0!3m2!1ses-419!2sar!4v1774968403756!5m2!1ses-419!2sar"
            className="w-full h-80 lg:h-full"
            loading="lazy"
            title="Mapa de la Hemeroteca"
          ></iframe>
        </div>

        {/* INFO */}
        <div className="flex flex-col justify-between">
          <div className="space-y-6 text-sm text-slate-700">
            <div className="flex items-center gap-3 hover:text-slate-900 transition">
              <MapPin className="text-slate-500" />
              <span>Pasaje Narvaez 790, Catamarca Capital</span>
            </div>

            <div className="flex items-center gap-3 hover:text-slate-900 transition">
              <Mail className="text-slate-500" />
              <a href="mailto:Hemeroteca@gmail.com" className="hover:underline">
                HemerotecaJuvenil@gmail.com
              </a>
            </div>

            <div className="flex items-center gap-3 hover:text-slate-900 transition">
              <Phone className="text-slate-500" />
              <a href="tel:+543811234567" className="hover:underline">
                +5493834-1234567
              </a>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/dir/?api=1&destination=-28.469759239696472,-65.774652239962"
            target="_blank"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
