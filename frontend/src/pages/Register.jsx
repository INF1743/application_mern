import { useState } from "react";
import { api } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
 
export default function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const navigate = useNavigate();
 
  const submit = async (e) => {
    e.preventDefault();
 
    try {
      await api.post("/auth/register", {
        nom,
        email,
        motDePasse,
      });
 
      // Après inscription, envoyer l'utilisateur vers login
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de l'inscription");
    }
  };
 
  return (
<form onSubmit={submit} className="p-6 max-w-md mx-auto">
<h2 className="text-2xl font-bold">Créer un compte</h2>
 
      <input
        className="border p-2 w-full mt-3"
        placeholder="Nom complet"
        onChange={(e) => setNom(e.target.value)}
      />
 
      <input
        className="border p-2 w-full mt-3"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
 
      <input
        className="border p-2 w-full mt-3"
        placeholder="Mot de passe"
        type="password"
        onChange={(e) => setMotDePasse(e.target.value)}
      />
 
      <button className="bg-black text-white px-4 py-2 mt-4 rounded">
        S’inscrire
</button>
 
      <p className="mt-2 text-sm">
        Déjà un compte ?{" "}
<Link to="/login" className="underline">
          Se connecter
</Link>
</p>
</form>
  );
}

