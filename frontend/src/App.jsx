import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Disponibilites from "./pages/Disponibilites";
import MesReservations from "./pages/MesReservations";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Offres from "./pages/Offres"; // ✅
import AdminMessagesAide from "./pages/AdminMessagesAide"; // ✅

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/disponibilites" element={<Disponibilites />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/offres" element={<Offres />} /> {/* ✅ */}
        <Route path="/admin/messages-aide" element={<AdminMessagesAide />} /> {/* ✅ */}
      </Routes>
    </BrowserRouter>
  );
}
