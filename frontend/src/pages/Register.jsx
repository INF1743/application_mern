import { useState } from "react";
import { api, setAuthToken } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
export default function Register() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (motDePasse !== confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }

    setChargement(true);
    try {
      const res = await api.post("/auth/register", {
        nom,
        email,
        motDePasse
      });

      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // retour accueil
    } catch (err) {
      setErreur(
        err?.response?.data?.message || "Erreur lors de l'inscription."
      );
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Enregistrement
        </h1>
        <p className="text-gray-600 text-center mt-2">
          Créez un compte pour accéder aux réservations.
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
              Nom complet
            </label>
            <input
              type="text"
              required
              className="border w-full p-2 mt-1 rounded-lg"
              placeholder="Votre nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>

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

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              required
              className="border w-full p-2 mt-1 rounded-lg"
              placeholder="********"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
            />
          </div>

          <button
            disabled={chargement}
            className={`w-full py-3 rounded-lg font-semibold text-white ${
              chargement
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-400 hover:bg-orange-500"
            }`}
          >
            {chargement ? "Création..." : "Créer mon compte"}
          </button>

          <p className="text-sm text-gray-600 text-center">
            Déjà un compte ?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}
