import EditorialHero from "../components/home/EditorialHero";
import NoticiaPrincipal from "../components/home/NoticiaPrincipal";
import SeccionesSecundarias from "../components/home/SeccionesSecundarias";
import TablonNovedades from "../components/home/TablonNovedades";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="w-full px-6 lg:px-10 xl:px-16 pb-14 pt-28">
        <EditorialHero />

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-8">
            <NoticiaPrincipal />
            <SeccionesSecundarias />
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <TablonNovedades />
          </aside>
        </section>
      </main>
    </div>
  );
}
