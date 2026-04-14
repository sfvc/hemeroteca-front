import { useState, useEffect, useMemo, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, FileText, BookOpen, Calendar, Hash, Loader2 } from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

function Loader() {
    return (
        <div className="flex flex-col items-center justify-center gap-4 text-slate-500">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
            <div className="flex flex-col items-center">
                <span className="text-sm font-medium text-slate-700">Preparando documento</span>
                <span className="text-xs text-slate-400">Esto puede tardar unos segundos en archivos pesados</span>
            </div>
        </div>
    );
}

function ThumbPage({ url, pageNumber, isActive, onClick }: { url: string; pageNumber: number; isActive: boolean; onClick: () => void; }) {
    return (
        <button
            onClick={onClick}
            className={`relative group flex flex-col items-center gap-1 p-1 rounded-md transition-all duration-150 cursor-pointer ${isActive ? "bg-cyan-500/20 ring-1 ring-cyan-400" : "hover:bg-slate-800"}`}
        >
            <div className={`overflow-hidden rounded-sm border transition-all duration-150 ${isActive ? "border-cyan-400" : "border-slate-700"}`}>
                <Document file={url} loading={<div className="w-24 h-32 bg-slate-800 animate-pulse" />}>
                    <Page pageNumber={pageNumber} scale={0.13} renderAnnotationLayer={false} renderTextLayer={false} loading={null} />
                </Document>
            </div>
            <span className={`text-[10px] font-medium ${isActive ? "text-cyan-400" : "text-slate-500"}`}>{pageNumber}</span>
        </button>
    );
}

export default function PdfViewer({
    url, onClose, onNext, onBack, mode = "single", collectionName, collectionDate, collectionType = "Documento"
}: {
    url: string; onClose: () => void; onNext: () => void; onBack: () => void; mode?: "single" | "spread";
    collectionName?: string; collectionDate?: string; collectionType?: string;
}) {
    const [numPages, setNumPages] = useState(0);
    const [visiblePages, setVisiblePages] = useState(15);
    const [page, setPage] = useState(1);
    const [docLoading, setDocLoading] = useState(true);
    const [jumpValue, setJumpValue] = useState("");
    const thumbsContainerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const [viewport, setViewport] = useState(0);
    const isMobile = viewport < 768;
    const isSpread = mode === "spread";

    const [zoom, setZoom] = useState(() => typeof window !== "undefined" && window.innerWidth < 768 ? 0.9 : 1);

    const scale = useMemo(() => {
        const vw = viewport || (typeof window !== "undefined" ? window.innerWidth : 800);
        const vh = typeof window !== "undefined" ? window.innerHeight : 600;
        const sidebarWidth = vw >= 1024 ? 384 : 0;
        const horizontalPadding = vw > 768 ? 80 : 20;
        const availableWidth = vw - sidebarWidth - horizontalPadding;
        const availableHeight = vh - 180;
        const docBaseWidth = isSpread ? 1200 : 600;
        const docBaseHeight = 800;
        const widthScale = availableWidth / docBaseWidth;
        const heightScale = availableHeight / docBaseHeight;
        const baseScale = isSpread ? Math.min(widthScale, heightScale * 1.2) : Math.min(widthScale, heightScale);
        return Math.max(0.4, Math.min(baseScale * zoom, 4));
    }, [zoom, viewport, isSpread]);

    const handleJump = () => {
        const target = parseInt(jumpValue, 10);
        if (!isNaN(target) && target >= 1 && target <= numPages) { setPage(target); setJumpValue(""); }
    };

    const nextPage = () => {
        setPage((p) => {
            const next = Math.min(p + (isSpread ? 2 : 1), numPages);
            if (next >= visiblePages - 2 && visiblePages < numPages) setVisiblePages((prev) => Math.min(prev + 10, numPages));
            return next;
        });
    };

    const prevPage = () => setPage((p) => Math.max(p - (isSpread ? 2 : 1), 1));

    useEffect(() => {
        const onResize = () => setViewport(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (!thumbsContainerRef.current) return;
        const active = thumbsContainerRef.current.querySelector("[data-active='true']") as HTMLElement | null;
        if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [page]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col font-sans select-none">
            <div className="flex flex-1 overflow-hidden">
                <div className="flex-1 overflow-auto bg-slate-300/50 flex flex-col">
                    <div ref={viewerRef} className={`flex-1 relative flex min-h-full overflow-auto ${isMobile || scale > 1.3 ? "justify-start items-start" : "justify-center items-center"}`}>
                        {docLoading && <div className="absolute inset-0 flex items-center justify-center bg-slate-200 z-50"><Loader /></div>}
                        <Document key={url} file={url} onLoadSuccess={({ numPages }) => { setNumPages(numPages); setVisiblePages(Math.min(15, numPages)); setPage(1); setDocLoading(false); }} onLoadStart={() => setDocLoading(true)} loading={null}>
                            <div className={`flex ${isSpread ? 'flex-row' : 'flex-col'} items-center justify-center shadow-2xl transition-opacity duration-300 ${docLoading ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="relative bg-white border-r border-slate-100 shrink-0"><Page pageNumber={page} scale={scale} loading={null} /></div>
                                {isSpread && page + 1 <= numPages && (
                                    <div className="relative bg-white border-l border-slate-100 shrink-0"><Page pageNumber={page + 1} scale={scale} loading={null} /></div>
                                )}
                            </div>
                        </Document>
                    </div>
                </div>

                <aside className="hidden lg:flex flex-col w-96 bg-slate-900 border-l border-slate-700/60 overflow-hidden">
                    <div className="px-4 py-4 border-b border-slate-700/60">
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen size={13} className="text-cyan-400 shrink-0" />
                            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Colección</span>
                        </div>
                        {collectionName && <p className="text-sm font-medium text-white mb-1 truncate" title={collectionName}>{collectionName}</p>}
                        {collectionDate && (
                            <div className="flex items-center gap-1.5 mt-1">
                                <Calendar size={11} className="text-slate-500 shrink-0" />
                                <span className="text-xs text-slate-400">{collectionDate}</span>
                            </div>
                        )}
                        <div className="mt-3">
                            <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/50 uppercase tracking-tighter">
                                {collectionType}
                            </span>
                        </div>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-700/60 flex items-center justify-between text-white">
                        <div className="flex items-center gap-2"><FileText size={13} className="text-slate-500" /><span className="text-xs text-slate-400">Páginas del PDF</span></div>
                        <span className="text-sm font-semibold">{numPages || "—"}</span>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-700/60">
                        <div className="flex items-center gap-2 mb-2"><Hash size={13} className="text-slate-500" /><span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">Ir a página</span></div>
                        <div className="flex gap-2">
                            <input type="number" value={jumpValue} onChange={(e) => setJumpValue(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleJump()} className="flex-1 bg-slate-800 border border-slate-700 rounded-md px-2 py-1.5 text-xs text-white focus:ring-1 focus:ring-cyan-500 outline-none" placeholder={`1 - ${numPages}`} />
                            <button onClick={handleJump} className="cursor-pointer px-3 bg-slate-700 text-white text-xs rounded-md hover:bg-slate-600 transition-colors">Ir</button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-3 py-3 custom-scrollbar" ref={thumbsContainerRef}>
                        {!docLoading && (
                            <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: visiblePages }, (_, i) => i + 1).map((p) => (
                                    <div key={p} data-active={p === page || (isSpread && p === page + 1) ? "true" : undefined}>
                                        <ThumbPage url={url} pageNumber={p} isActive={p === page || (isSpread && p === page + 1)} onClick={() => setPage(p)} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </aside>
            </div>
            <div className="flex flex-col gap-3 bg-slate-900 px-4 py-3 border-t border-slate-700/60 md:flex-row md:items-center md:justify-between">
                <button onClick={onClose} className="cursor-pointer text-white hover:text-cyan-400 transition text-sm font-medium">← Volver al sistema</button>
                <div className="flex items-center justify-center gap-4 bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-700">
                    <div className="flex items-center gap-3 text-white">
                        <button onClick={prevPage} className="cursor-pointer p-1 hover:bg-slate-700 rounded-full transition disabled:opacity-20" disabled={page <= 1}><ChevronLeft size={20} /></button>
                        <span className="text-sm font-mono min-w-16 text-center">{isSpread ? `${page}-${Math.min(page + 1, numPages)}` : page} / {numPages}</span>
                        <button onClick={nextPage} className="cursor-pointer p-1 hover:bg-slate-700 rounded-full transition disabled:opacity-20" disabled={page >= numPages}><ChevronRight size={20} /></button>
                    </div>
                    <div className="h-4 w-px bg-slate-600" />
                    <div className="flex items-center gap-2 text-white">
                        <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))} className="cursor-pointer p-1 hover:bg-slate-700 rounded-full transition"><ZoomOut size={18} /></button>
                        <span className="text-xs w-10 text-center font-mono">{Math.round(scale * 100)}%</span>
                        <button onClick={() => setZoom((z) => Math.min(3, z + 0.2))} className="cursor-pointer p-1 hover:bg-slate-700 rounded-full transition"><ZoomIn size={18} /></button>
                    </div>
                </div>
                <div className="flex gap-2 justify-center">
                    <button onClick={onBack} className="cursor-pointer bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white text-xs px-4 py-2 rounded-md transition">Anterior Publicación</button>
                    <button onClick={onNext} className="cursor-pointer bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-4 py-2 rounded-md transition font-medium">Siguiente Publicación</button>
                </div>
            </div>
        </div>
    );
}
