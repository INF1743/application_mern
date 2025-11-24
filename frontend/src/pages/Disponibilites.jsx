import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Disponibilites() {
  const navigate = useNavigate();

  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().substring(0, 10);
  });

  const [creneaux, setCreneaux] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  // Charger créneaux depuis API à chaque changement de date
  const chargerCreneaux = async () => {
    setChargement(true);
    setErreur("");
    try {
      const res = await api.get(`/reservations/creneaux?date=${date}`);
      setCreneaux(res.data);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Impossible de charger les créneaux."
      );
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    chargerCreneaux();
    // eslint-disable-next-line
  }, [date]);

  // Réserver un créneau
  const reserver = async (heure) => {
    setErreur("");

    const token = localStorage.getItem("token");
    if (!token) {
      // pas connecté → redirige login
      navigate("/login");
      return;
    }

    try {
      await api.post("/reservations", {
        date,
        heure,
        type: "Coach de vie personnel", // pour l’instant fixe, on améliorera après
      });

      // recharge les créneaux après réservation
      chargerCreneaux();
      alert(`Réservation confirmée pour ${date} à ${heure}`);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Erreur lors de la réservation."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Disponibilités
        </h1>
        <p className="text-gray-600 mt-2">
          Choisissez une date puis sélectionnez un créneau disponible.
        </p>

        {/* sélection date */}
        <section className="mt-6 bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Sélectionner une date
              </h2>
              <p className="text-sm text-gray-500">
                Les créneaux sont chargés depuis l’API.
              </p>
            </div>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700 w-full md:w-auto"
            />
          </div>
        </section>

        {/* erreurs */}
        {erreur && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {erreur}
          </div>
        )}

        {/* liste créneaux */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            Créneaux disponibles le{" "}
            {new Date(date).toLocaleDateString("fr-CA")}
          </h2>

          {chargement ? (
            <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {creneaux.map((c, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border shadow-sm flex items-center justify-between ${
                    c.dispo ? "bg-white" : "bg-gray-100 opacity-70"
                  }`}
                >
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {c.heure}
                    </p>
                    <p
                      className={`text-sm ${
                        c.dispo ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {c.dispo ? "Disponible" : "Indisponible"}
                    </p>
                  </div>

                  <button
                    disabled={!c.dispo}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      c.dispo
                        ? "bg-orange-400 hover:bg-orange-500 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                    onClick={() => reserver(c.heure)}
                  >
                    Réserver
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
