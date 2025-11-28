import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MesReservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [estAdmin, setEstAdmin] = useState(false);

  const chargerReservations = async () => {
    setChargement(true);
    setErreur("");

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await api.get("/reservations");
      setReservations(res.data);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Impossible de charger vos réservations."
      );
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    // Détecter si l'utilisateur est admin à partir du localStorage
    const utilisateurJSON = localStorage.getItem("utilisateur");
    if (utilisateurJSON) {
      try {
        const utilisateur = JSON.parse(utilisateurJSON);
        if (utilisateur?.role === "admin") {
          setEstAdmin(true);
        }
      } catch (e) {
        console.error("Erreur lors de la lecture de l'utilisateur :", e);
      }
    }

    chargerReservations();
    // eslint-disable-next-line
  }, []);

  const annuler = async (id) => {
    setErreur("");

    try {
      await api.patch(`/reservations/${id}/annuler`);
      // Recharger après annulation
      chargerReservations();
    } catch (err) {
      setErreur(
        err?.response?.data?.message || "Erreur lors de l'annulation."
      );
    }
  };

  const badgeStyle = (statut) => {
    switch (statut) {
      case "Confirmée":
        return "bg-green-100 text-green-700";
      case "En attente":
        return "bg-yellow-100 text-yellow-700";
      case "Annulée":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Mes réservations
        </h1>
        <p className="text-gray-600 mt-2">
          Retrouvez ici vos rendez-vous passés et à venir.
        </p>

        {/* 🔧 Bouton admin : Messages d’aide */}
        {estAdmin && (
          <div className="mt-4">
            <button
              onClick={() => navigate("/admin/messages-aide")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm hover:bg-slate-700 transition-colors"
            >
              <span className="w-7 h-7 rounded bg-white/10 flex items-center justify-center">
                🛠️
              </span>
              Messages d’aide
            </button>
          </div>
        )}

        {/* Erreur */}
        {erreur && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {erreur}
          </div>
        )}

        {/* Chargement */}
        {chargement ? (
          <p className="mt-8 text-gray-600">Chargement...</p>
        ) : reservations.length === 0 ? (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border text-center">
            <p className="text-gray-700 font-medium">
              Vous n’avez aucune réservation pour le moment.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Allez sur Disponibilités pour réserver un créneau.
            </p>
          </div>
        ) : (
          <>
            {/* Tableau desktop */}
            <div className="hidden md:block mt-8 bg-white rounded-xl shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-700 text-white">
                  <tr>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Heure</th>
                    <th className="text-left p-4">Type</th>
                    <th className="text-left p-4">Statut</th>
                    <th className="text-left p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td className="p-4">
                        {new Date(r.date).toLocaleDateString("fr-CA")}
                      </td>
                      <td className="p-4">{r.heure}</td>
                      <td className="p-4">{r.type}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeStyle(
                            r.statut
                          )}`}
                        >
                          {r.statut}
                        </span>
                      </td>
                      <td className="p-4">
                        {r.statut !== "Annulée" ? (
                          <button
                            onClick={() => annuler(r._id)}
                            className="text-red-600 hover:underline text-sm font-semibold"
                          >
                            Annuler
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

            {/* Cartes mobile */}
            <div className="md:hidden mt-8 flex flex-col gap-4">
              {reservations.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-5 rounded-xl shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      {new Date(r.date).toLocaleDateString("fr-CA")} • {r.heure}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle(
                        r.statut
                      )}`}
                    >
                      {r.statut}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 mt-2">{r.type}</p>

                  {r.statut !== "Annulée" && (
                    <button
                      onClick={() => annuler(r._id)}
                      className="mt-3 text-red-600 hover:underline text-sm font-semibold"
                    >
                      Annuler
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
