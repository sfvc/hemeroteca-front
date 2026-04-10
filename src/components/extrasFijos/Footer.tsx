import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import logoMunicipalidad from "/-Isologotipo_Catamarca Capital_blanco.png";

export default function Footer() {
  return (
    <div className="w-full overflow-hidden">
      {/* Logo */}

      <footer className="w-full bg-slate-800 text-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            <div className="flex items-center gap-4">
              <img
                src={logoMunicipalidad}
                alt="logoMunicipalidad"
                className="max-h-40"
              />
            </div>

            {/* UBICACION */}

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-100">
                Ubicación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Pasaje Narvaez 790, Catamarca Capital</li>
                <li>SFV de Catamarca · Catamarca</li>
                <li>Argentina · CP K4700</li>
              </ul>
            </div>

            {/* INFO DE CONTACTO */}

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-100">
                Contacto
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>HemerotecaJuvenil@gmail.com</li>
              </ul>
            </div>

            {/* REDES SOCIALES */}

            <div>
              <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-slate-100">
                Seguinos!
              </h4>

              <div className="flex gap-5">
                <a
                  href="https://www.facebook.com/catamarcatucapital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:scale-110 transition"
                >
                  <Facebook size={32} />
                </a>

                <a
                  href="https://x.com/MuniSFVC"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:scale-110 transition"
                >
                  <Twitter size={32} />
                </a>

                <a
                  href="https://www.instagram.com/cultura.catamarcacapital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:scale-110 transition"
                >
                  <Instagram size={32} />
                </a>

                <a
                  href="https://www.youtube.com/channel/UCMAeIcE5sQa7chR-J13zlDw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:scale-110 transition"
                >
                  <Youtube size={32} />
                </a>
              </div>
            </div>
          </div>

          {/* RELLENO DE LA MUNI */}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>© 2026 Municipalidad de Catamarca Capital</p>
            <p>Secretaría de Cultura</p>
            <p>Programa Hemeroteca Municipal/Digital v1.0</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
