import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Disponibilites() {
  // Date sélectionnée
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().substring(0, 10); // yyyy-mm-dd
  });

  // Créneaux (pour l’instant en dur)
  const [creneaux, setCreneaux] = useState([]);

  // Simuler un chargement de créneaux à partir de la date
  useEffect(() => {
    // Exemple de créneaux; plus tard on les chargera depuis le backend
    const exemple = [
      { heure: "09:00", dispo: true },
      { heure: "10:30", dispo: true },
      { heure: "12:00", dispo: false },
      { heure: "14:00", dispo: true },
      { heure: "15:30", dispo: true },
      { heure: "17:00", dispo: false }
    ];

    setCreneaux(exemple);
  }, [date]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Disponibilités
        </h1>
        <p className="text-gray-600 mt-2">
          Choisissez une date puis sélectionnez un créneau disponible.
        </p>

        {/* Bloc sélection date */}
        <section className="mt-6 bg-white p-5 rounded-xl shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Sélectionner une date
              </h2>
              <p className="text-sm text-gray-500">
                Les créneaux changent selon la date choisie.
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

        {/* Liste des créneaux */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-900">
            Créneaux disponibles le {new Date(date).toLocaleDateString("fr-CA")}
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {creneaux.map((c, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border shadow-sm flex items-center justify-between ${
                  c.dispo
                    ? "bg-white"
                    : "bg-gray-100 opacity-70"
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
                  onClick={() => alert(`Réservation pour ${date} à ${c.heure}`)}
                >
                  Réserver
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Petit bloc info */}
        <section className="mt-10 bg-slate-700 text-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-bold">Besoin d’un autre moment ?</h3>
          <p className="text-sm mt-2 text-gray-100">
            Si aucun créneau ne vous convient, contactez-moi et nous trouverons
            une alternative.
          </p>

          <button className="mt-4 bg-white text-slate-800 font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
            Me contacter
          </button>
        </section>
      </main>
    </div>
  );
}
