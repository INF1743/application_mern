import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import des pages
import Accueil from "./pages/Accueil";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page d’accueil */}
        <Route path="/" element={<Accueil />} />

        {/* Tu ajouteras les autres pages ici plus tard */}
        {/* <Route path="/disponibilites" element={<Disponibilites />} /> */}
        {/* <Route path="/mes-reservations" element={<MesReservations />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
