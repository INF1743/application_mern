import { useState } from "react";
import { api } from "../services/api";

export default function AideModal({ ouvert, onClose }) {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chargement, setChargement] = useState(false);
  const [succes, setSucces] = useState(false);
  const [erreur, setErreur] = useState("");

  if (!ouvert) return null;

  const resetForm = () => {
    setNom("");
    setEmail("");
    setMessage("");
    setErreur("");
    setSucces(false);
  };

  const envoyer = async (e) => {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    try {
      await api.post("/aide", { nom, email, message });
      setSucces(true);
      setNom("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Erreur lors de l'envoi du message."
      );
    } finally {
      setChargement(false);
    }
  };

  const fermer = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={fermer}
      />

      {/* modal */}
      <div className="relative bg-white w-[95%] max-w-lg rounded-2xl shadow-xl p-6">
        <button
          onClick={fermer}
          className="absolute right-4 top-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ×
        </button>

        {!succes ? (
          <>
            <h2 className="text-2xl font-bold text-slate-800">
              Besoin d’aide ?
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Envoyez-nous un message, nous vous répondrons dès que possible.
            </p>

            {erreur && (
              <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
                {erreur}
              </div>
            )}

            <form onSubmit={envoyer} className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Nom
                </label>
                <input
                  type="text"
                  required
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  className="border w-full p-2 mt-1 rounded-lg"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border w-full p-2 mt-1 rounded-lg"
                  placeholder="exemple@mail.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border w-full p-2 mt-1 rounded-lg"
                  placeholder="Expliquez votre besoin..."
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
                {chargement ? "Envoi..." : "Envoyer"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-green-700">
              Message reçu ✅
            </h2>
            <p className="text-gray-700 mt-3">
              Votre mail est bien reçu et nous vous répondrons dès que possible.
            </p>
            <button
              onClick={fermer}
              className="mt-6 bg-slate-700 text-white px-5 py-2 rounded-lg hover:bg-slate-800"
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
