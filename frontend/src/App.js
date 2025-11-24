import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Disponibilites from "./pages/Disponibilites";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages principales */}
        <Route path="/" element={<Accueil />} />
        <Route path="/disponibilites" element={<Disponibilites />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Optionnel : page 404 */}
        <Route path="*" element={<h1 className="p-6 text-xl">Page introuvable</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
