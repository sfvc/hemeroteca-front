import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Articulos from "./pages/Articulos";
import Nosotros from "./pages/Nosotros";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <Navbar />

      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
