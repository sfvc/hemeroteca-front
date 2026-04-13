import { useState, useEffect, useMemo } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

export default function PdfViewer({
    url,
    onClose,
    onNext,
    onBack,
    mode = "single",
}: {
    url: string;
    onClose: () => void;
    onNext: () => void;
    onBack: () => void;
    mode?: "single" | "spread";
}) {
    const [numPages, setNumPages] = useState(0);
    const [page, setPage] = useState(1);

    const [zoom, setZoom] = useState(() =>
        typeof window !== "undefined" && window.innerWidth < 768 ? 0.9 : 1
    );

    const [viewport, setViewport] = useState(0);

    const isSpread = mode === "spread";

    useEffect(() => {
        const onResize = () => setViewport(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /**
     * Escala real del PDF (más estable que width)
     * - evita overflow raro en zoom alto
     * - se adapta mejor a mobile/desktop
     */
    const scale = useMemo(() => {
        const vw = typeof window !== "undefined" ? window.innerWidth : 800;
        const vh = typeof window !== "undefined" ? window.innerHeight : 600;

        const base = Math.min(vw / 900, vh / 1200);

        return Math.max(0.5, Math.min(base * zoom, 3));
    }, [zoom, viewport]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">

            {/* PDF AREA */}
            <div
                className="flex-1 overflow-auto bg-slate-200"
                style={{
                    scrollBehavior: "smooth",
                }}
            >
                <div className="min-h-full flex justify-center py-6">
                    <Document
                        file={url}
                        onLoadSuccess={({ numPages }) => {
                            setNumPages(numPages);
                            setPage(1);
                        }}
                    >

                        {!isSpread && (
                            <Page
                                pageNumber={page}
                                scale={scale}
                                renderAnnotationLayer={true}
                                renderTextLayer={true}
                            />
                        )}

                        {isSpread && (
                            <div className="flex gap-4 justify-center">
                                <Page
                                    pageNumber={page}
                                    scale={scale}
                                />
                                <Page
                                    pageNumber={page + 1}
                                    scale={scale}
                                />
                            </div>
                        )}

                    </Document>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col gap-3 bg-slate-900 px-4 py-3 md:flex-row md:items-center md:justify-between">

                {/* LEFT */}
                <div className="flex justify-center md:justify-start">
                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-80 transition"
                    >
                        ← Volver
                    </button>
                </div>

                {/* CENTER */}
                <div className="flex items-center justify-center gap-4 bg-slate-800 px-3 py-2 rounded-md w-full md:w-auto">

                    {/* pages */}
                    <div className="flex items-center gap-2 text-white">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className="hover:opacity-80"
                        >
                            <ChevronLeft />
                        </button>

                        <span className="text-sm whitespace-nowrap">
                            {page} / {numPages}
                        </span>

                        <button
                            onClick={() =>
                                setPage((p) => Math.min(p + 1, numPages))
                            }
                            className="hover:opacity-80"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="h-5 w-px bg-slate-600 hidden md:block" />

                    {/* zoom */}
                    <div className="flex items-center gap-2 text-white">
                        <button
                            onClick={() =>
                                setZoom((z) => Math.max(0.5, z - 0.15))
                            }
                            className="hover:opacity-80"
                        >
                            <ZoomOut />
                        </button>

                        <span className="text-xs w-12 text-center">
                            {Math.round(scale * 100)}%
                        </span>

                        <button
                            onClick={() =>
                                setZoom((z) => Math.min(2.5, z + 0.15))
                            }
                            className="hover:opacity-80"
                        >
                            <ZoomIn />
                        </button>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row">

                    <button
                        onClick={onBack}
                        className="bg-slate-700 hover:bg-slate-600 transition text-white px-4 py-2 rounded-md"
                    >
                        ← Anterior colección
                    </button>

                    <button
                        onClick={onNext}
                        className="bg-cyan-600 hover:bg-cyan-500 transition text-white px-4 py-2 rounded-md"
                    >
                        Siguiente colección →
                    </button>

                </div>
            </div>
        </div>
    );
}
