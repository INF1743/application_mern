import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Disponibilites() {
  const navigate = useNavigate();

  // Date sélectionnée
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().substring(0, 10); // "YYYY-MM-DD"
  });

  // Type sélectionné via SELECT
  const [type, setType] = useState("Coach de vie personnel");

  const [creneaux, setCreneaux] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  // ==============================
  // Vérifier si une date est passée (en local)
  // ==============================
  const dateEstPassee = (dateStr) => {
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const [annee, mois, jour] = dateStr.split("-");
    const dateChoisie = new Date(
      Number(annee),
      Number(mois) - 1,
      Number(jour)
    );
    dateChoisie.setHours(0, 0, 0, 0);

    return dateChoisie < aujourdHui;
  };

  // ✅ Dimanche (0) en local
  const estDimanche = (dateStr) => {
    if (!dateStr) return false;
    const [annee, mois, jour] = dateStr.split("-");
    const d = new Date(Number(annee), Number(mois) - 1, Number(jour));
    return d.getDay() === 0;
  };

  // ✅ Samedi (6) en local
  const estSamedi = (dateStr) => {
    if (!dateStr) return false;
    const [annee, mois, jour] = dateStr.split("-");
    const d = new Date(Number(annee), Number(mois) - 1, Number(jour));
    return d.getDay() === 6;
  };

  // ✅ Affichage de la date sans bug J-1
  const formaterDateAffichage = (dateStr) => {
    if (!dateStr) return "";
    const iso = dateStr.slice(0, 10); // "YYYY-MM-DD"
    const [annee, mois, jour] = iso.split("-");
    return `${jour}/${mois}/${annee}`;
  };

  const bloquerReservation = dateEstPassee(date);

  // ✅ Gestion du changement de date : on empêche de choisir un dimanche
  const handleDateChange = (e) => {
    const valeur = e.target.value;
    if (!valeur) return;

    if (estDimanche(valeur)) {
      setErreur(
        "Les rendez-vous ne sont pas disponibles le dimanche. Merci de choisir un jour du lundi au samedi."
      );
      // On NE change pas la date sélectionnée
      return;
    }

    setErreur("");
    setDate(valeur);
  };

  // ==============================
  // Filtre des créneaux du samedi (10h–14h)
  // ==============================
  const filtrerCreneauxSamedi = (liste) => {
    return liste.filter((c) => {
      if (!c.heure || typeof c.heure !== "string") return false;
      // On prend les 2 premiers chiffres de l'heure, par ex. "09:00", "10h00", "14:30"
      const match = c.heure.match(/^(\d{1,2})/);
      if (!match) return false;
      const h = parseInt(match[1], 10);
      return h >= 10 && h <= 14;
    });
  };

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

    // Sécurité supplémentaire pour le dimanche
    if (estDimanche(date)) {
      setCreneaux([]);
      setErreur(
        "Aucun rendez-vous n’est proposé le dimanche. Merci de choisir un autre jour."
      );
      setChargement(false);
      return;
    }

    try {
      const res = await api.get(`/reservations/creneaux?date=${date}`);
      let liste = res.data;

      // ✅ Si c'est samedi, on garde seulement 10h–14h
      if (estSamedi(date)) {
        liste = filtrerCreneauxSamedi(liste);
      }

      setCreneaux(liste);
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

    if (estDimanche(date)) {
      setErreur("Les rendez-vous ne sont pas disponibles le dimanche.");
      return;
    }

    // ✅ Sécurité : même si un horaire bizarre passe un samedi, on bloque
    if (estSamedi(date)) {
      const match = typeof heure === "string" ? heure.match(/^(\d{1,2})/) : null;
      const h = match ? parseInt(match[1], 10) : NaN;
      if (isNaN(h) || h < 10 || h > 14) {
        setErreur(
          "Le samedi, les rendez-vous sont possibles uniquement entre 10h et 14h."
        );
        return;
      }
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/reservations", { date, heure, type });
      await chargerCreneaux();
      alert(
        `Réservation confirmée pour le ${formaterDateAffichage(
          date
        )} à ${heure}`
      );
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
        <p className="text-xs text-gray-500 mt-1">
          Rendez-vous disponibles du lundi au vendredi (9h–18h) et le samedi (10h–14h). Dimanche fermé.
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
              onChange={handleDateChange}
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

        {/* --- LISTE DES CRÉNEAUX --- */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            Créneaux disponibles le {formaterDateAffichage(date)}
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
                    disabled={
                      !c.dispo || bloquerReservation || estDimanche(date)
                    }
                    className={`px-4 py-2 rounded-md font-semibold ${
                      c.dispo &&
                      !bloquerReservation &&
                      !estDimanche(date)
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

      <Footer />
    </div>
  );
}
