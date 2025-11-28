import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Disponibilites() {
  const navigate = useNavigate();

  // Date sélectionnée
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().substring(0, 10);
  });

  // Type sélectionné via SELECT
  const [type, setType] = useState("Coach de vie personnel");

  const [creneaux, setCreneaux] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  // ==============================
  // Vérifier si une date est passée
  // ==============================
  const dateEstPassee = (dateStr) => {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const dateChoisie = new Date(dateStr);
    dateChoisie.setHours(0, 0, 0, 0);

    return dateChoisie < aujourdHui;
  };

  const bloquerReservation = dateEstPassee(date);

  // ==============================
  // Charger les créneaux depuis API
  // ==============================
  const chargerCreneaux = async () => {
    setChargement(true);
    setErreur("");

    if (bloquerReservation) {
      setCreneaux([]);
      setErreur("Vous ne pouvez pas réserver une date passée.");
      setChargement(false);
      return;
    }

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

  // ==============================
  // Réserver un créneau
  // ==============================
  const reserver = async (heure) => {
    setErreur("");

    if (bloquerReservation) {
      setErreur("Date passée : réservation impossible.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/reservations", { date, heure, type });
      await chargerCreneaux();
      alert(`Réservation confirmée pour ${date} à ${heure}`);
    } catch (err) {
      setErreur(
        err?.response?.data?.message ||
          "Erreur lors de la réservation."
      );
    }
  };

  // ==============================
  // UI
  // ==============================
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Disponibilités
        </h1>
        <p className="text-gray-600 mt-2">
          Choisissez une date, un type de rendez-vous et un créneau disponible.
        </p>

        {/* --- SÉLECTION DATE --- */}
        <section className="mt-6 bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Sélectionner une date
              </h2>
              <p className="text-sm text-gray-500">
                Les créneaux sont chargés automatiquement.
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

        {/* --- SÉLECTION TYPE (SELECT) --- */}
        <section className="mt-4 bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Type de rendez-vous
              </h2>
              <p className="text-sm text-gray-500">
                Choisissez le service désiré.
              </p>
            </div>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg px-3 py-2 text-gray-700 w-full md:w-auto"
            >
              <option>Coach de vie personnel</option>
              <option>Développement de carrière</option>
            </select>
          </div>
        </section>

        {/* --- ERREURS --- */}
        {erreur && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {erreur}
          </div>
        )}

        {/* --- LISTE DES CRENEAUX --- */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            Créneaux disponibles le {new Date(date).toLocaleDateString("fr-CA")}
          </h2>

          {chargement ? (
            <p className="mt-4 text-gray-600">Chargement des créneaux...</p>
          ) : creneaux.length === 0 ? (
            <p className="mt-4 text-gray-500">
              Aucun créneau disponible pour cette date.
            </p>
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
                    disabled={!c.dispo || bloquerReservation}
                    className={`px-4 py-2 rounded-md font-semibold ${
                      c.dispo && !bloquerReservation
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
