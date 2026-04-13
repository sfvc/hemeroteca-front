import { useState, useMemo, useEffect } from "react";
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
    const [zoom, setZoom] = useState(
        typeof window !== "undefined" && window.innerWidth < 768 ? 0.9 : 1
    );
    const [viewport, setViewport] = useState(0);

    const isSpread = mode === "spread";

    const pageWidth = useMemo(() => {
        const vw =
            typeof window !== "undefined"
                ? window.innerWidth
                : 800;

        const isMobile = vw < 768;

        const base = isMobile
            ? vw * 0.92
            : Math.min(vw * 0.85, 1100);

        return base * zoom;
    }, [zoom]);

    useEffect(() => {
        const onResize = () => setViewport(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [zoom, viewport]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">

            {/* PDF */}
            <div className="flex-1 overflow-auto flex justify-center items-center bg-slate-200">
                <Document
                    file={url}
                    onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setPage(1);
                    }}
                >

                    {/* SINGLE PAGE */}
                    {!isSpread && (
                        <Page
                            pageNumber={page}
                            width={pageWidth}
                        />
                    )}

                    {/* DOUBLE PAGE (REVISTAS) */}
                    {isSpread && (
                        <div className="flex gap-2 justify-center">
                            <Page pageNumber={page} width={pageWidth / 2} />
                            <Page pageNumber={page + 1} width={pageWidth / 2} />
                        </div>
                    )}

                </Document>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col gap-3 bg-slate-900 px-4 py-3 md:flex-row md:items-center md:justify-between">

                {/* IZQUIERDA */}
                <div className="flex justify-center md:justify-start">
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-white hover:opacity-80 transition"
                    >
                        ← Volver
                    </button>
                </div>

                {/* CENTRO (PAGE + ZOOM) */}
                <div className="flex items-center justify-center gap-4 bg-slate-800 px-3 py-2 rounded-md w-full md:w-auto">

                    {/* páginas */}
                    <div className="flex items-center gap-2 text-white">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            className="cursor-pointer hover:opacity-80"
                        >
                            <ChevronLeft />
                        </button>

                        <span className="cursor-pointer text-sm whitespace-nowrap">
                            {page} / {numPages}
                        </span>

                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, numPages))}
                            className="cursor-pointer hover:opacity-80"
                        >
                            <ChevronRight />
                        </button>
                    </div>

                    <div className="h-5 w-px bg-slate-600 hidden md:block" />

                    {/* zoom */}
                    <div className="flex items-center gap-2 text-white">
                        <button
                            onClick={() => setZoom((z) => Math.max(0.5, z - 0.2))}
                            className="cursor-pointer hover:opacity-80"
                        >
                            <ZoomOut />
                        </button>

                        <span className="text-xs w-10 text-center">
                            {Math.round(zoom * 100)}%
                        </span>

                        <button
                            onClick={() => setZoom((z) => Math.min(2.5, z + 0.2))}
                            className="cursor-pointer hover:opacity-80"
                        >
                            <ZoomIn />
                        </button>
                    </div>

                </div>

                {/* DERECHA (COLECCIONES) */}
                <div className="flex flex-col gap-2 w-full md:w-auto md:flex-row md:gap-2">

                    <button
                        onClick={onBack}
                        className="cursor-pointer bg-slate-700 hover:bg-slate-600 transition text-white px-4 py-2 rounded-md w-full md:w-auto"
                    >
                        ← Anterior colección
                    </button>

                    <button
                        onClick={onNext}
                        className="cursor-pointer bg-cyan-600 hover:bg-cyan-500 transition text-white px-4 py-2 rounded-md w-full md:w-auto"
                    >
                        Siguiente colección →
                    </button>
                </div>
            </div>
        </div>
    );
}
