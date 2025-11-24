import Reservation from "../modeles/Reservation.js";

// Création de réservation
export const creerReservation = async (req, res) => {
  try {
    const { date, heure, type } = req.body;

    // validations
    if (!date || !heure || !type) {
      return res.status(400).json({
        message: "date, heure et type sont obligatoires."
      });
    }

    // Vérifier si le créneau est déjà réservé
    const existe = await Reservation.findOne({ date, heure });
    if (existe) {
      return res.status(400).json({
        message: "Ce créneau est déjà réservé."
      });
    }

    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({ message: "Utilisateur non authentifié." });
    }

    const reservation = await Reservation.create({
      user: userId,
      date,
      heure,
      type,
      statut: "Confirmée"
    });

    res.status(201).json(reservation);
  } catch (err) {
    console.error("❌ ERREUR CREATION RESERVATION :", err);
    res.status(500).json({
      message: "Erreur lors de la création.",
      erreur: err.message
    });
  }
};

// Récupérer les réservations du user connecté
export const mesReservations = async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).sort({
    date: 1,
    heure: 1
  });

  res.json(reservations);
};

// Annuler une réservation
export const annulerReservation = async (req, res) => {
  const id = req.params.id;

  const reservation = await Reservation.findOne({
    _id: id,
    user: req.user._id
  });

  if (!reservation) {
    return res.status(404).json({ message: "Réservation introuvable." });
  }

  reservation.statut = "Annulée";
  await reservation.save();

  res.json({ message: "Réservation annulée.", reservation });
};

// Obtenir les créneaux disponibles
export const creneauxDisponibles = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ message: "Date requise." });
  }

  const creneauxTous = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];
  const reservations = await Reservation.find({ date });
  const creneauxOccupes = reservations.map((r) => r.heure);

  const resultat = creneauxTous.map((h) => ({
    heure: h,
    dispo: !creneauxOccupes.includes(h)
  }));

  res.json(resultat);
};
