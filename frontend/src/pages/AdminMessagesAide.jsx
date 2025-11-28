import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminMessagesAide() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    // pas connecté
    if (!token) {
      navigate("/login");
      return;
    }

    // connecté mais pas admin
    if (!user || user.role !== "admin") {
      navigate("/"); // retour accueil
      return;
    }

    chargerMessages();
    // eslint-disable-next-line
  }, []);

  const chargerMessages = async () => {
    setChargement(true);
    setErreur("");
    try {
      const res = await api.get("/aide");
      setMessages(res.data);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Impossible de charger les messages d’aide."
      );
    } finally {
      setChargement(false);
    }
  };

  const traiter = async (id) => {
    setErreur("");
    try {
      await api.patch(`/aide/${id}/traiter`);
      chargerMessages();
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Erreur lors de la mise à jour."
      );
    }
  };

  const badgeStatut = (statut) =>
    statut === "Traité"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Messages d’aide (Admin)
        </h1>
        <p className="text-gray-600 mt-2">
          Tous les messages envoyés par les utilisateurs.
        </p>

        {erreur && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {erreur}
          </div>
        )}

        {chargement ? (
          <p className="mt-6 text-gray-600">Chargement...</p>
        ) : messages.length === 0 ? (
          <div className="mt-6 bg-white border rounded-xl p-6 text-center">
            Aucun message pour le moment.
          </div>
        ) : (
          <div className="mt-6 bg-white border rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-700 text-white">
                <tr>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Nom</th>
                  <th className="text-left p-4">Email</th>
                  <th className="text-left p-4">Message</th>
                  <th className="text-left p-4">Statut</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((m) => (
                  <tr key={m._id} className="border-t align-top">
                    <td className="p-4 whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleString("fr-CA")}
                    </td>
                    <td className="p-4">{m.nom}</td>
                    <td className="p-4">{m.email}</td>
                    <td className="p-4 max-w-md">
                      <p className="text-sm text-gray-800">{m.message}</p>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStatut(
                          m.statut
                        )}`}
                      >
                        {m.statut}
                      </span>
                    </td>
                    <td className="p-4">
                      {m.statut !== "Traité" ? (
                        <button
                          onClick={() => traiter(m._id)}
                          className="text-sm font-semibold text-green-700 hover:underline"
                        >
                          Marquer traité
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
