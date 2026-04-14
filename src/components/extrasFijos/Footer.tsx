import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoMunicipalidad from "/-Isologotipo_Catamarca Capital.png";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-slate-800 border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        {/* Línea editorial superior */}
        <div className="border-t border-b border-slate-300 py-3 mb-10">
          <p className="text-center text-[11px] uppercase tracking-[0.35em] text-sky-600 font-bold">
            Archivo · Cultura · Memoria · Catamarca Capital
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo */}
          <div className="space-y-4">
            <img
              src={logoMunicipalidad}
              alt="logo Municipalidad"
              className="max-h-24 object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Preservando y difundiendo el patrimonio periodístico y documental
              de Catamarca.
            </p>
          </div>

          {/* Ubicación */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-slate-800 mb-4">
              Ubicación
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Pasaje Narváez 790</li>
              <li>SFV de Catamarca · Catamarca</li>
              <li>Argentina · CP K4700</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-slate-800 mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>hemerotecajuvenil@gmail.com</li>
            </ul>
          </div>

          {/* Redes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.28em] text-slate-800 mb-4">
              Seguinos
            </h4>

            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/catamarcatucapital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:scale-110 hover:-translate-y-1 transition duration-300"
              >
                <Facebook size={28} />
              </a>

              <a
                href="https://x.com/MuniSFVC"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:scale-110 hover:-translate-y-1 transition duration-300"
              >
                <Twitter size={28} />
              </a>

              <a
                href="https://www.instagram.com/cultura.catamarcacapital/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:scale-110 hover:-translate-y-1 transition duration-300"
              >
                <Instagram size={28} />
              </a>

              <a
                href="https://www.youtube.com/channel/UCMAeIcE5sQa7chR-J13zlDw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:scale-110 hover:-translate-y-1 transition duration-300"
              >
                <Youtube size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Mini diario abajo */}
        <div className="border-t border-slate-300 pt-6">
          <div className="flex flex-col items-center text-center gap-3">
            <p className="text-[10px] uppercase tracking-[0.35em] text-sky-700 font-bold">
              Edición Digital
            </p>

            <h3 className="text-2xl md:text-3xl font-serif tracking-tight text-slate-900">
              Hemeroteca Municipal
            </h3>

            <p className="text-sm text-slate-600 italic">
              Archivo histórico, memoria colectiva y difusión cultural.
            </p>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 pt-4 text-[11px] uppercase tracking-[0.2em] text-slate-800">
              <span>Catamarca, Argentina</span>
              <span className="hidden md:inline">—</span>
              <span>Secretaría de Cultura</span>
              <span className="hidden md:inline">—</span>
              <span>Municipalidad de Catamarca Capital</span>
            </div>

            <p className="pt-3 text-xs text-slate-800">
              © 2026 · Programa Hemeroteca Municipal / Digital v1.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}