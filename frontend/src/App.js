import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Disponibilites from "./pages/Disponibilites";
import MesReservations from "./pages/MesReservations";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/disponibilites" element={<Disponibilites />} />
        <Route path="/mes-reservations" element={<MesReservations />} />
      </Routes>
    </BrowserRouter>
  );
}
