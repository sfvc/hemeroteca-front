import EditorialHero from "../components/home/EditorialHero";
import NoticiaPrincipal from "../components/home/NoticiaPrincipal";
import SeccionesSecundarias from "../components/home/SeccionesSecundarias";
import TablonNovedades from "../components/home/TablonNovedades";
import GaleriaHome from "../components/home/CarruselSecundario";
import ResenasHome from "../components/home/Reseñas";
import UbicacionHome from "../components/home/Ubicacion";

export default function Home() {

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-8">
        {/* HERO + NOTICIA A LA IZQUIERDA / TABLON A LA DERECHA */}
        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px] items-start">
          <div className="min-w-0 space-y-8">
            <EditorialHero />

            <NoticiaPrincipal />
          </div>

          <aside className="w-full self-start xl:sticky xl:top-8">
            <TablonNovedades />
          </aside>
        </section>

        <section className="mt-10">
          <SeccionesSecundarias />
        </section>

        <section className="mt-14 space-y-10">
          <GaleriaHome />
          <ResenasHome />
          <UbicacionHome />
        </section>
      </main>
    </div>
  );
}