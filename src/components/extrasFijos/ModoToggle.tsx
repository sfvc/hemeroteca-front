type ModoToggleProps = {
  value: "HEMEROTECA MUNICIPAL" | "HEMEROTECA DIGITAL";
  onChange: (value: "HEMEROTECA MUNICIPAL" | "HEMEROTECA DIGITAL") => void;
};

function ModoToggle({ value, onChange }: ModoToggleProps) {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="flex w-full max-w-245 flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-center">
        {/* HEMEROTECA MUNICIPAL */}
        <button
          type="button"
          onClick={() => onChange("HEMEROTECA MUNICIPAL")}
          className={`cursor-pointer relative flex w-full items-center justify-center px-5 py-4 text-center text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 sm:min-h-24 sm:flex-1 sm:px-8 sm:py-5 sm:text-base md:px-10 md:text-lg lg:text-xl ${
            value === "HEMEROTECA MUNICIPAL"
              ? "text-slate-100"
              : "text-slate-500 hover:text-slate-800 bg-slate-200"
          }`}
        >
          {value === "HEMEROTECA MUNICIPAL" && (
            <>
              {/* cuerpo principal */}
              <span className="absolute inset-y-0 left-6 right-0 rounded-4xl bg-[url('/biblioteca2.jpg')] shadow-md sm:left-8" />

              {/* flecha izquierda */}
              <span
                className="absolute left-0 top-0 h-full w-12 bg-[url('biblioteca2.jpg')] sm:w-16 md:w-20"
                style={{
                  clipPath:
                    "polygon(100% 0%, 100% 50%, 100% 100%, 0% 100%, 42% 50%, 0% 0%)",
                }}
              />
            </>
          )}

          <span className="relative z-10 wrap-break-words">
            HEMEROTECA MUNICIPAL
          </span>
        </button>

        {/* HEMEROTECA DIGITAL */}
        <button
          type="button"
          onClick={() => onChange("HEMEROTECA DIGITAL")}
          className={`cursor-pointer relative w-full rounded-4xl px-5 py-4 text-center text-sm font-black uppercase tracking-[0.18em] transition-all duration-300 sm:min-h-24 sm:flex-1 sm:px-8 sm:py-5 sm:text-base md:px-10 md:text-lg lg:text-xl ${
            value === "HEMEROTECA DIGITAL"
              ? "bg-[url('/digital.jpg')] text-white shadow-md"
              : "text-slate-500 hover:text-slate-800 bg-slate-200"
          }`}
        >
          HEMEROTECA DIGITAL
        </button>
      </div>
    </div>
  );
}

export default ModoToggle;
