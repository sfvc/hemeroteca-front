// import React from "react";
import logoMunicipalidad from "/LOGO MUNI PNG.png";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginHemeroteca() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-[#0b1328]">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 pt-6 pb-4 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logoMunicipalidad}
            alt="Catamarca Capital"
            className="h-10 sm:h-10 object-contain"
          />
          <div className="flex items-center gap-3 text-[#1f3554]">
            <span className="text-xs tracking-[0.3em] font-bold uppercase">
              Hemeroteca Digital
            </span>
            <span className="text-sm text-gray-500">| Catamarca Capital</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
        {/* HERO */}
        <div className="rounded-3xl p-8 bg-[url('/hemerotecaVintage.png')] bg-cover bg-center relative overflow-hidden">
          {/* BOTON VOLVER */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 hover:bg-white text-orange-600 px-3 py-2 rounded-full transition"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-semibold">Volver</span>
          </button>
        </div>

        {/* LOGIN CARD */}
        <div className="bg-white/90 backdrop-blur rounded-3xl p-8 border border-gray-200 flex flex-col justify-center">
          <p className="text-orange-500 text-xs tracking-[0.25em] font-bold uppercase mb-2">
            Bienvenido
          </p>

          <h2 className="font-serif text-4xl font-bold uppercase">
            HEMEROTECA MUNICIPAL
          </h2>

          <p className="text-gray-500 mt-3 mb-6">
            Ingresa tus credenciales para ponder acceder a la informacion de la
            AGM.
          </p>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1f3554] mb-1">
                Username o email
              </label>
              <input
                type="text"
                placeholder="usuario o correo@ejemplo.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1f3554]/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1f3554] mb-1">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1f3554]/20"
              />
            </div>

            <div className="flex justify-between items-center text-sm mt-1">
              <label className="flex items-center gap-2 text-gray-500">
                <input type="checkbox" className="accent-orange-600" />
                Recordarme
              </label>

              <a
                href="#"
                className="text-orange-600 font-semibold hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Al ingresar con sus credenciales se les redirige a AGM o a la AGM del mismo sistema si es que las fusionamos a las paginas */}

            <button
              type="submit"
              className="mt-4 bg-orange-600 text-white py-3 rounded-full font-bold hover:bg-orange-700 transition"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            ¿No tenes cuenta?
            <Link
              to="/register"
              className="text-orange-600 font-semibold hover:underline"
            >
              Registrate
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
