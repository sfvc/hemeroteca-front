import EditorialHero from "../components/home/EditorialNavbar";
import SeccionesSecundarias from "../components/home/SeccionesSecundarias";
import TablonNovedades from "../components/home/TablonNovedades";
import GaleriaImagenes from "../components/home/GaleriaImagenes";
import Reseñas from "../components/home/Reseñas";
import Ubicaciones from "../components/home/Ubicacion";
import Carrousel from "../components/Carrousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-2">
        {/* NAVBAR + NOTICIA A LA IZQUIERDA / TABLON A LA DERECHA */}
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] items-start">
          <div className="min-w-0 space-y-8">
            <EditorialHero />
            <Carrousel />
          </div>

          <aside className="w-full self-start xl:sticky xl:top-8">
            <TablonNovedades />
          </aside>
        </section>

        <section className="mt-10">
          <SeccionesSecundarias />
        </section>

        <section className="mt-14 space-y-10">
          <GaleriaImagenes />
          <Reseñas />
          <Ubicaciones />
        </section>
      </main>
    </div>
  );
}
