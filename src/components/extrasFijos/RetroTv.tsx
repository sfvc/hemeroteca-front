import React from "react";
import EditorialHero from "../home/EditorialNavbar";

type RetroTvProps = {
  text?: string;
  children?: React.ReactNode;
  videoUrl?: string;
  relatedVideos?: string[];
  onSelectVideo?: (url: string) => void;
};

const extractYoutubeId = (url: string) => {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const watch = url.match(/[?&]v=([^&]+)/);
  if (watch) return watch[1];
  const embed = url.match(/youtube\.com\/embed\/([^?&]+)/);
  if (embed) return embed[1];
  return "";
};

export default function RetroTv({
  text = "Practicas de Conservación",
  children,
  videoUrl = "https://www.youtube.com/embed/WOchrFs21_M",
  relatedVideos,
  onSelectVideo,
}: RetroTvProps) {
  return (
    <div className="relative mx-auto w-full max-w-6xl px-4 mt-3">
      <EditorialHero />

      <div className="pointer-events-none absolute left-0 top-24 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-56 w-56 rounded-full bg-orange-300/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-44 w-44 rounded-full bg-yellow-100/20 blur-3xl" />

      <div className="relative my-16">
        {/* antenas — ocultas en mobile */}
        <div className="hidden md:flex absolute left-1/2 top-19.5 z-0 -translate-x-1/2 items-end gap-10">
          <div className="h-24 w-0.75 rotate-28 rounded-full bg-stone-600 shadow-md" />
          <div className="h-24 w-0.75 rotate-28 rounded-full bg-stone-600 shadow-md" />
        </div>

        {/* TV */}
        <div className="relative rounded-[34px] border-10 border-stone-600 bg-linear-to-b from-[#bdb5a2] via-[#afa68f] to-[#9c927d] p-4 md:p-5">
          <div className="pointer-events-none absolute left-8 right-8 top-3 h-8 rounded-full bg-white/10 blur-md" />

          {/* mobile: columna / desktop: grilla */}
          <div className="flex flex-col gap-4 md:grid md:gap-5 md:grid-cols-[1fr_170px]">

            {/* ─── PANTALLA ─── */}
            <div className="relative rounded-3xl md:rounded-[30px] border-[6px] border-stone-600 bg-[#e7dfd1] p-3 md:p-4">
              <div className="rounded-[18px] md:rounded-[22px] border border-stone-300 bg-[#f4efe6] p-2 md:p-3 shadow-inner">
                <div className="relative aspect-video md:aspect-4/3 overflow-hidden rounded-[14px] md:rounded-[18px] border border-stone-400 bg-[#d8cfbe]">
                  <div className="absolute inset-0 bg-linear-to-br from-[#f7f0df] via-[#ddd4c2] to-[#c8bca8]" />

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
                      <p className="text-center text-xl md:text-4xl font-black uppercase tracking-wide text-stone-500">
                        {text}
                      </p>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 z-20" />
                  <div className="pointer-events-none absolute inset-0 z-30 opacity-25 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.16)_1px,transparent_1px)] bg-size[length:100%_3px]" />
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
                  <div className="pointer-events-none absolute inset-0 z-40 bg-linear-to-br from-white/30 via-white/5 to-transparent opacity-50" />
                  <div className="pointer-events-none absolute inset-0 z-40 shadow-[inset_0_0_70px_rgba(0,0,0,0.30)]" />
                  <div className="pointer-events-none absolute bottom-2 left-1/2 z-40 h-3 w-28 -translate-x-1/2 rounded-full bg-orange-300/60 blur-md" />
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-2">
                <div className="rounded-full border border-stone-400 bg-stone-200 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-stone-700">
                  Archivo Visual
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Vintage CRT
                </div>
              </div>
            </div>

            {/* ─── PANEL LATERAL ─── */}
            <div className="flex flex-col rounded-[22px] border-[6px] border-stone-600 bg-linear-to-b from-[#c1b9a5] to-[#a79d88] p-3 gap-3">

              {relatedVideos && relatedVideos.length > 0 && (
                <div className="
                  flex flex-row gap-3 overflow-x-auto pb-1
                  md:flex-col md:overflow-x-hidden md:overflow-y-auto md:max-h-42 md:pr-1
                  scrollbar-thin scrollbar-thumb-stone-500 scrollbar-track-transparent
                ">
                  {relatedVideos.map((url, i) => {
                    const id = extractYoutubeId(url);
                    return (
                      <button
                        key={i}
                        onClick={() => onSelectVideo?.(url)}
                        className="cursor-pointer group shrink-0 w-36 md:w-full overflow-hidden rounded-xl border-2 border-stone-500 bg-stone-200/40 transition hover:scale-[1.02]"
                      >
                        <div className="relative">
                          <img
                            src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`}
                            className="h-20 w-full object-cover opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-black/20" />
                          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)] bg-size[length:100%_3px]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* controles — ocultos en mobile para no agrandar la tele */}
              <div className="hidden md:flex flex-col gap-3">
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

                <div className="flex items-center justify-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.7)]" />
                  <div className="h-3 w-3 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(252,211,77,0.7)]" />
                  <div className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.7)]" />
                </div>

                <div className="rounded-[14px] border border-stone-500/50 bg-stone-700/10 p-3">
                  <div className="grid grid-cols-3 gap-1.5">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="h-2 rounded-full bg-stone-600/70 shadow-inner" />
                    ))}
                  </div>
                </div>

                <div className="text-center text-[10px] font-bold uppercase tracking-[0.35em] text-stone-600">
                  Tele Cultura
                </div>
              </div>

              {/* luces visibles en mobile como detalle mínimo */}
              <div className="flex md:hidden items-center justify-center gap-3 py-1">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.7)]" />
                <div className="h-2.5 w-2.5 rounded-full bg-lime-400 shadow-[0_0_8px_rgba(163,230,53,0.7)]" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
