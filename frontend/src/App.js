import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
      </Routes>
    </BrowserRouter>
  );
}
