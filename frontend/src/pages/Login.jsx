import { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    try {
      const res = await api.post("/auth/login", { email, motDePasse });

      // Sauvegarde token
      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);

      // (Optionnel) Sauvegarder info user
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // retour accueil
    } catch (err) {
      setErreur(
        err?.response?.data?.message || "Email ou mot de passe incorrect."
      );
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Connexion
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Connectez-vous pour réserver un rendez-vous.
        </p>

        <form
          onSubmit={submit}
          className="bg-white mt-6 p-6 rounded-xl shadow-sm border space-y-4"
        >
          {erreur && (
            <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
              {erreur}
            </div>
          )}

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="border w-full p-2 mt-1 rounded-lg"
              placeholder="exemple@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              required
              className="border w-full p-2 mt-1 rounded-lg"
              placeholder="********"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>

          <button
            disabled={chargement}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              chargement
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-slate-700 hover:bg-slate-800"
            }`}
          >
            {chargement ? "Connexion..." : "Se connecter"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-blue-600 underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
