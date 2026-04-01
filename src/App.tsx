import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Noticias from "./pages/Noticias";
import Nosotros from "./pages/Nosotros";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      {/* <Navbar /> */}

      <main className="">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
