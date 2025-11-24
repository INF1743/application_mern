import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MesReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Données temporaires (on remplacera par l’API plus tard)
    const exempleReservations = [
      {
        id: 1,
        date: "2025-11-25",
        heure: "10:30",
        type: "Coach de vie personnel",
        statut: "Confirmée"
      },
      {
        id: 2,
        date: "2025-11-29",
        heure: "14:00",
        type: "Développement de carrière",
        statut: "En attente"
      },
      {
        id: 3,
        date: "2025-12-02",
        heure: "09:00",
        type: "Coach de vie personnel",
        statut: "Annulée"
      }
    ];

    setReservations(exempleReservations);
  }, []);

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
        {/* Titre */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Mes réservations
        </h1>
        <p className="text-gray-600 mt-2">
          Retrouvez ici tous vos rendez-vous passés et à venir.
        </p>

        {/* Si aucune réservation */}
        {reservations.length === 0 ? (
          <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border text-center">
            <p className="text-gray-700 font-medium">
              Vous n’avez aucune réservation pour le moment.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Rendez-vous sur la page Disponibilités pour réserver un créneau.
            </p>
          </div>
        ) : (
          <>
            {/* Tableau (desktop) */}
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
                    <tr key={r.id} className="border-t">
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
                          <button className="text-red-600 hover:underline text-sm font-semibold">
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

            {/* Cartes (mobile) */}
            <div className="md:hidden mt-8 flex flex-col gap-4">
              {reservations.map((r) => (
                <div key={r.id} className="bg-white p-5 rounded-xl shadow-sm border">
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
                    <button className="mt-3 text-red-600 hover:underline text-sm font-semibold">
                      Annuler
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Petit résumé */}
        <section className="mt-10 bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-lg font-bold text-gray-900">
            À savoir
          </h2>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-600 space-y-1">
            <li>Vous pouvez annuler un rendez-vous jusqu’à 24h avant.</li>
            <li>Les rendez-vous “En attente” seront confirmés par email.</li>
            <li>Pour modifier un rendez-vous, contactez-moi directement.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
