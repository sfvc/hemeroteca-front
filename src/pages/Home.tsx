import { useState } from "react";
import SeccionesSecundarias from "../components/home/SeccionesSecundarias";
import TablonNovedades from "../components/home/TablonNovedades";
import GaleriaImagenes from "../components/home/GaleriaImagenes";
import Reseñas from "../components/home/Reseñas";
import Ubicaciones from "../components/home/Ubicacion";
import Carrousel from "../components/extrasFijos/Carrousel";
import NoticiasCarousel from "../components/home/NoticiasCarrousel";
import EditorialHero from "../components/home/EditorialNavbar";

type Modo = "HEMEROTECA MUNICIPAL" | "HEMEROTECA DIGITAL";

export default function Home() {
  const [modoActivo, setModoActivo] = useState<Modo>("HEMEROTECA MUNICIPAL");

  const esMunicipal = modoActivo === "HEMEROTECA MUNICIPAL";

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-2">
        <section className={`grid gap-8 items-start ${esMunicipal ? "xl:grid-cols-[minmax(0,1fr)_340px]" : ""
          }`}>
          <div className="min-w-0 space-y-8">
            <EditorialHero modoActivo={modoActivo} onModoChange={setModoActivo} />
            {esMunicipal && <Carrousel />}
          </div>

          {esMunicipal && (
            <aside className="w-full self-start xl:sticky xl:top-8">
              <TablonNovedades />
            </aside>
          )}
        </section>

        <section className="mt-10">
          <SeccionesSecundarias esMunicipal={esMunicipal} />
        </section>

        <section className="mt-14 space-y-10">
          {esMunicipal && (
            <>
              <NoticiasCarousel />
              <GaleriaImagenes />
              <Reseñas />
              <Ubicaciones />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
