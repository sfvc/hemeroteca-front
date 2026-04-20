import { motion } from "framer-motion";

export default function LoaderEditorial() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#f7f6f2] px-6">
      <div className="w-full max-w-4xl text-center">
        {/* DIVIDER*/}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-6 h-px w-full bg-slate-400 origin-center"
        />

        {/* BARRA */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-[11px] uppercase tracking-[0.45em] text-sky-700 font-semibold"
        >
          Noticias · Archivo · Cultura
        </motion.p>

        {/* HEMEROTECA MUNICIPAL */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-[clamp(2.8rem,8vw,6rem)] leading-none font-serif font-bold tracking-tight text-slate-950"
        >
          HEMEROTECA
        </motion.h1>

        {/* SUBTITULO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-5 text-[11px] md:text-xs uppercase tracking-[0.3em] text-slate-500"
        >
          Catamarca, Argentina — Archivo histórico digital
        </motion.p>

        {/* DIVIDER */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.8 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mx-auto mt-8 h-px w-full bg-slate-400"
        />

        {/* CIRCULOS DE CARGA */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="h-2.5 w-2.5 rounded-full bg-orange-600"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            className="h-2.5 w-2.5 rounded-full bg-cyan-600"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="h-2.5 w-2.5 rounded-full bg-sky-800"
          />
        </div>

        {/* PIE DE PÁGINA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 border-t border-slate-400 pt-4"
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
            Secretaria de Modernizacion · Municipalidad de Catamarca Capital ·
            Secretaría de Cultura
          </p>
        </motion.div>
      </div>
    </div>
  );
}
