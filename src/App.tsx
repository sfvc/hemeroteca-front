import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "./pages/HemerotecaInicio";
import Noticias from "./pages/Noticias";
import Nosotros from "./pages/Nosotros";
import Footer from "./components/extrasFijos/Footer";
import ScrollToTop from "./util/ScrollToTop";
import Equipo from "./pages/Equipo";
import RetroTv from "./components/extrasFijos/RetroTv";
import VideoPage from "./pages/Video";
import Catalogo from "./pages/CatalogoMunicipal";
import DetallesPublicacion from "./pages/DetallesPublicacion";
import LoaderEditorial from "./components/extrasFijos/LoaderEditorial";
import HemerotecaDigital from "./pages/HemerotecaDigital";
import CatalogoDigital from "./pages/CatalogoDigital";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const skipLoader = sessionStorage.getItem("skipGlobalLoader");

    if (skipLoader === "true") {
      sessionStorage.removeItem("skipGlobalLoader");
      setLoading(false);
      return;
    }

    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1600);

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <div className="min-h-dvh bg-white text-slate-900">
      {loading && <LoaderEditorial />}

      <main>
        <ScrollToTop />

        <Routes>
          {/* HEMEROTECA MUNICIPAL */}
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/practicas-conservacion" element={<RetroTv />} />
          <Route path="/detras-foto" element={<RetroTv />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/catalogo" element={<Catalogo />} />

          {/* EXTRAS */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/equipo" element={<Equipo />} />

          {/* HEMEROTECA DIGITAL */}
          <Route path="/hemeroteca-digital" element={<HemerotecaDigital />} />
          <Route path="/catalogo-digital" element={<CatalogoDigital />} />
          <Route
            path="/detalles-publicacion"
            element={<DetallesPublicacion />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
