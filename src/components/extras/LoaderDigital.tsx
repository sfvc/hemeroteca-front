import { motion } from "framer-motion";

export default function LoaderTech() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-700 px-6 overflow-hidden">
      {/* GRID */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#22d3ee_1px,transparent_1px)] bg-size-[20px_20px]" />

      {/* CONTENEDOR CON GLOW */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0px rgba(34,211,238,0.0)",
            "0 0 25px rgba(34,211,238,0.25)",
            "0 0 5px rgba(34,211,238,0.1)",
            "0 0 30px rgba(34,211,238,0.3)",
            "0 0 0px rgba(34,211,238,0.0)",
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative w-full max-w-3xl text-center px-8 py-10 border border-cyan-400/20 bg-slate-800 backdrop-blur-sm rounded-md"
      >
        {/* LINEA */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-8 h-px w-full bg-cyan-400 origin-left"
        />

        {/* TEXTO */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-3 text-[10px] uppercase tracking-[0.5em] text-cyan-300 font-mono"
        >
          Info Digital · Sistema de datos · Archivos descargables
        </motion.p>

        {/* TITULO */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-white"
        >
          HEMEROTECA
          <br />
          <span className="text-cyan-400">DIGITAL</span>
        </motion.h1>

        {/* SUB */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-[11px] uppercase tracking-[0.4em] text-white font-mono"
        >
          initializing digital hemeroteca...
        </motion.p>

        {/* BARRA */}
        <div className="mt-10 w-full h-0.5 bg-slate-700 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="h-full w-1/3 bg-linear-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {/* CIRCULOS DE CARGA */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="h-2.5 w-2.5 rounded-full bg-red-500"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
            className="h-2.5 w-2.5 rounded-full bg-green-500"
          />
          <motion.span
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="h-2.5 w-2.5 rounded-full bg-cyan-500"
          />
        </div>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-[10px] tracking-[0.3em] text-white font-mono"
        >
          Municipalidad de Catamarca · Digital Hemeroteca v1.0
        </motion.p>
      </motion.div>
    </div>
  );
}
