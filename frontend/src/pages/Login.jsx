import { useState } from "react";

import { api, setAuthToken } from "../services/api";

import { useNavigate, Link } from "react-router-dom";
 
export default function Login() {

  const [email, setEmail] = useState("");

  const [motDePasse, setMotDePasse] = useState("");

  const navigate = useNavigate();
 
  const submit = async (e) => {

    e.preventDefault();

    const res = await api.post("/auth/login", { email, motDePasse });

    localStorage.setItem("token", res.data.token);

    setAuthToken(res.data.token);

    navigate("/");

  };
 
  return (
<form onSubmit={submit} className="p-6 max-w-md mx-auto">
<h2 className="text-2xl font-bold">Connexion</h2>
 
      <input

        className="border p-2 w-full mt-3"

        placeholder="Email"

        onChange={(e) => setEmail(e.target.value)}

      />
<input

        className="border p-2 w-full mt-3"

        type="password"

        placeholder="Mot de passe"

        onChange={(e) => setMotDePasse(e.target.value)}

      />
 
      <button className="bg-black text-white px-4 py-2 mt-4 rounded">

        Se connecter
</button>
 
      <p className="mt-2 text-sm">

        Pas de compte ? <Link to="/register" className="underline">Créer un compte</Link>
</p>
</form>

  );

}

 