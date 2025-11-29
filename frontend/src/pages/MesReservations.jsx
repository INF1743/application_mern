import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function MesReservations() {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");
  const [estAdmin, setEstAdmin] = useState(false);

  // 🔎 Filtres
  const [filtreStatut, setFiltreStatut] = useState("TOUS"); // TOUS | CONFIRMEES | EN_ATTENTE | ANNULEES
  const [filtreTemps, setFiltreTemps] = useState("TOUS");   // TOUS | A_VENIR | PASSEES

  // ✅ Correction du bug J-1 : formatage manuel de la date
  const formaterDate = (dateStr) => {
    if (!dateStr) return "";

    // On prend uniquement "YYYY-MM-DD"
    const iso = dateStr.slice(0, 10);
    const [annee, mois, jour] = iso.split("-");

    return `${jour}/${mois}/${annee}`;
  };

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
    // Vérification admin
    const utilisateurJSON = localStorage.getItem("utilisateur");
    if (utilisateurJSON) {
      try {
        const utilisateur = JSON.parse(utilisateurJSON);
        if (utilisateur?.role === "admin") {
          setEstAdmin(true);
        }
      } catch (e) {
        console.error("Erreur lecture utilisateur :", e);
      }
    }

    chargerReservations();
  }, []);

  const annuler = async (id) => {
    setErreur("");

    try {
      await api.patch(`/reservations/${id}/annuler`);
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

  // ========= Aide pour le filtre par date =========
  const estDansLeFutur = (r) => {
    if (!r?.date) return false;
    const aujourdHui = new Date();
    aujourdHui.setHours(0, 0, 0, 0);

    const d = new Date(r.date);
    d.setHours(0, 0, 0, 0);

    return d >= aujourdHui;
  };

  // ========= Application des filtres =========
  const reservationsAffichees = reservations
    // Filtre statut
    .filter((r) => {
      if (filtreStatut === "CONFIRMEES") return r.statut === "Confirmée";
      if (filtreStatut === "EN_ATTENTE") return r.statut === "En attente";
      if (filtreStatut === "ANNULEES") return r.statut === "Annulée";
      return true; // TOUS
    })
    // Filtre temps
    .filter((r) => {
      if (filtreTemps === "A_VENIR") return estDansLeFutur(r);
      if (filtreTemps === "PASSEES") return !estDansLeFutur(r);
      return true; // TOUS
    });

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

        {/* 🔧 Bouton admin */}
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

        {/* 🎚️ Barre de filtres */}
        <section className="mt-6 bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">
              Filtres d’affichage
            </h2>
            <p className="text-xs text-gray-500">
              Ajustez les filtres pour afficher les rendez-vous souhaités.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Filtre statut */}
            <select
              value={filtreStatut}
              onChange={(e) => setFiltreStatut(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm text-gray-700"
            >
              <option value="TOUS">Tous les statuts</option>
              <option value="CONFIRMEES">Seulement confirmés</option>
              <option value="EN_ATTENTE">Seulement en attente</option>
              <option value="ANNULEES">Seulement annulés</option>
            </select>

            {/* Filtre temps */}
            <select
              value={filtreTemps}
              onChange={(e) => setFiltreTemps(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm text-gray-700"
            >
              <option value="TOUS">Toutes les dates</option>
              <option value="A_VENIR">Rendez-vous à venir</option>
              <option value="PASSEES">Rendez-vous passés</option>
            </select>
          </div>
        </section>

        {/* Erreur */}
        {erreur && (
          <div className="mt-4 bg-red-100 text-red-700 p-3 rounded text-sm">
            {erreur}
          </div>
        )}

        {/* Loading / contenu */}
        {chargement ? (
          <p className="mt-8 text-gray-600">Chargement...</p>
        ) : reservationsAffichees.length === 0 ? (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border text-center">
            <p className="text-gray-700 font-medium">
              Aucune réservation à afficher avec les filtres actuels.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Essayez de modifier les filtres ou de réserver un nouveau créneau.
            </p>
          </div>
        ) : (
          <>
            {/* TABLEAU DESKTOP */}
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
                  {reservationsAffichees.map((r) => (
                    <tr key={r._id} className="border-t">
                      <td className="p-4">{formaterDate(r.date)}</td>
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

            {/* VERSION MOBILE */}
            <div className="md:hidden mt-8 flex flex-col gap-4">
              {reservationsAffichees.map((r) => (
                <div
                  key={r._id}
                  className="bg-white p-5 rounded-xl shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-gray-900">
                      {formaterDate(r.date)} • {r.heure}
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

      <Footer />
    </div>
  );
}
