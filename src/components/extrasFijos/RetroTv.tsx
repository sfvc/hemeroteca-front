import React from "react";
import EditorialHero from "../home/EditorialNavbar";

type RetroTvProps = {
  text?: string;
  children?: React.ReactNode;
  videoUrl?: string;
};

export default function RetroTv({
  text = "Practicas de Conservación",
  children,
  videoUrl = "https://www.youtube.com/embed/WOchrFs21_M",
}: RetroTvProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 mt-3">
      <EditorialHero />

      {/* Decoración exterior / ambiente */}
      <div className="pointer-events-none absolute left-0 top-24 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-44 w-44 rounded-full bg-yellow-100/20 blur-3xl" />

      <div className="relative my-16">
        {/* Antenas */}
        <div className="absolute left-1/2 top-19.5 z-0 flex -translate-x-1/2 items-end gap-10">
          <div className="h-24 w-0.75 rotate-28 rounded-full bg-stone-600 shadow-md" />
          <div className="h-24 w-0.75 rotate-28 rounded-full bg-stone-600 shadow-md" />
        </div>

        {/* TV body */}
        <div className="relative rounded-[34px] border-10 border-stone-600 bg-linear-to-b from-[#bdb5a2] via-[#afa68f] to-[#9c927d] p-5">
          {/* Brillo superior del cuerpo */}
          <div className="pointer-events-none absolute left-8 right-8 top-3 h-8 rounded-full bg-white/10 blur-md" />

          <div className="grid gap-5 md:grid-cols-[1fr_170px]">
            {/* Pantalla */}
            <div className="relative rounded-[30px] border-[6px] border-stone-600 bg-[#e7dfd1] p-4">
              <div className="rounded-[22px] border border-stone-300 bg-[#f4efe6] p-3 shadow-inner">
                <div className="relative aspect-4/3 overflow-hidden rounded-[18px] border border-stone-400 bg-[#d8cfbe]">
                  {/* Fondo tenue detrás del video */}
                  <div className="absolute inset-0 bg-linear-to-br from-[#f7f0df] via-[#ddd4c2] to-[#c8bca8]" />

                  {/* Video */}
                  {children ? (
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                      {children}
                    </div>
                  ) : videoUrl ? (
                    <div className="absolute inset-0 z-10">
                      <iframe
                        src={videoUrl}
                        title={text}
                        className="h-full w-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative z-10 flex h-full w-full items-center justify-center px-6">
                      <p className="text-center text-2xl font-black uppercase tracking-wide text-stone-500 sm:text-4xl">
                        {text}
                      </p>
                    </div>
                  )}

                  {/* Glow cálido CRT */}
                  <div className="pointer-events-none absolute inset-0 z-20" />

                  {/* Scanlines */}
                  <div className="pointer-events-none absolute inset-0 z-30 opacity-25 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.16)_1px,transparent_1px)] bg-size[length:100%_3px]" />

                  {/* Grilla retro */}
                  <div
                    className="pointer-events-none absolute inset-0 z-20 opacity-10"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, rgba(120,110,90,0.10) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(120,110,90,0.10) 1px, transparent 1px)
                      `,
                      backgroundSize: "26px 26px",
                    }}
                  />

                  {/* Reflejo vidrio */}
                  <div className="pointer-events-none absolute inset-0 z-40 bg-linear-to-br from-white/30 via-white/5 to-transparent opacity-50" />

                  {/* Viñeta */}
                  <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_70px_rgba(0,0,0,0.30)]" />

                  {/* Lucecita de pantalla encendida */}
                  <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-3 w-28 -translate-x-1/2 rounded-full bg-orange-300/60 blur-md" />
                </div>
              </div>

              {/* Etiqueta decorativa */}
              <div className="mt-3 flex items-center justify-between px-2">
                <div className="rounded-full border border-stone-400 bg-stone-200 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-stone-700">
                  Archivo Visual
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Vintage CRT
                </div>
              </div>
            </div>

            {/* Panel lateral */}
            <div className="flex flex-col justify-between rounded-[22px] border-[6px] border-stone-600 bg-linear-to-b from-[#c1b9a5] to-[#a79d88] p-3">
              <div className="rounded-2xl border-2 border-stone-500 bg-[#d8cebb] p-4 shadow-inner">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-stone-400 bg-[#f5f1ea]">
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-500" />
                      <div className="absolute top-1 h-3 w-0.5 rounded-full bg-stone-500" />
                    </div>
                  </div>

                  <div className="mx-auto h-0.5 w-16 bg-stone-400/70" />

                  <div className="flex justify-center">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full border-4 border-stone-400 bg-[#f5f1ea]">
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-500" />
                      <div className="absolute right-1 h-0.5 w-3 rounded-full bg-stone-500" />
                    </div>
                  </div>

                  <div className="mt-2 flex justify-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-4 border-stone-400 bg-[#f5f1ea]">
                      <div className="absolute h-6 w-1 rotate-45 rounded-full bg-stone-500" />
                      <div className="absolute h-6 w-1 -rotate-45 rounded-full bg-stone-400 opacity-50" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Luces / indicadores */}
              <div className="mt-4 flex items-center justify-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                <div className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.7)]" />
                <div className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]" />
              </div>

              {/* Parlante */}
              <div className="mt-4 rounded-[14px] border border-stone-500/50 bg-stone-700/10 p-3">
                <div className="grid grid-cols-3 gap-1.5">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-2 rounded-full bg-stone-600/70 shadow-inner"
                    />
                  ))}
                </div>
              </div>

              {/* Marca inventada */}
              <div className="mt-4 text-center text-[10px] font-bold uppercase tracking-[0.35em] text-stone-600">
                Tele Cultura
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
