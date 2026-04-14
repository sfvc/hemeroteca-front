import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Nosotros from "./pages/Nosotros";
import Footer from "./components/extrasFijos/Footer";
import ScrollToTop from "./util/ScrollToTop";
import Equipo from "./pages/Equipo";
import RetroTv from "./components/extrasFijos/RetroTv";
import VideoPage from "./pages/Video";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
import Colecciones from "./pages/Colecciones";
import DetallesPublicacion from "./pages/DetallesPublicacion";

function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <main>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/equipo" element={<Equipo />} />
          <Route path="/practicas-conservacion" element={<RetroTv />} />
          <Route path="/detras-foto" element={<RetroTv />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/colecciones" element={<Colecciones />} />
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
