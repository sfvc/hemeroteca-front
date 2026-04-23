import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Home from "./pages/HemerotecaMunicipal/HemerotecaInicio";
import Noticias from "./pages/HemerotecaMunicipal/Noticias";
import Nosotros from "./pages/HemerotecaMunicipal/Nosotros";
import Footer from "./components/extras/Footer";
import ScrollToTop from "./util/ScrollToTop";
import Equipo from "./components/extras/Equipo";
import RetroTv from "./components/componentsInicio/RetroTv";
import VideoPage from "./components/extras/Video";
import Catalogo from "./pages/HemerotecaMunicipal/CatalogoMunicipal";
import DetallesPublicacion from "./pages/HemerotecaMunicipal/DetallesPublicacion";
import LoaderEditorial from "./components/extras/LoaderEditorial";
import HemerotecaDigital from "./pages/HemerotecaDigital/HemerotecaDigital";
// import CatalogoDigital from "./pages/HemerotecaDigital/CatalogoDigital";

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
          <Route
            path="/detalles-publicacion"
            element={<DetallesPublicacion />}
          />

          {/* EXTRAS */}
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/equipo" element={<Equipo />} />

          {/* HEMEROTECA DIGITAL */}
          <Route path="/hemeroteca-digital" element={<HemerotecaDigital />} />
          {/* <Route path="/catalogo-digital" element={<CatalogoDigital />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
