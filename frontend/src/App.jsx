import { BrowserRouter, Routes, Route } from "react-router-dom";

import Accueil from "./pages/Accueil";

import Contenus from "./pages/Contenus";

import DetailContenu from "./pages/DetailContenu";

import Login from "./pages/Login";

import Register from "./pages/Register";
 
export default function App() {

  return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Accueil />} />
<Route path="/contenus" element={<Contenus />} />
<Route path="/contenus/:id" element={<DetailContenu />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
</Routes>
</BrowserRouter>

  );

}

 