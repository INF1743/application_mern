import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Utilisateur",
      required: true
    },
    date: {
      type: String, // format YYYY-MM-DD
      required: true
    },
    heure: {
      type: String, // ex: "10:30"
      required: true
    },
    type: {
      type: String,
      enum: ["Coach de vie personnel", "Développement de carrière"],
      required: true
    },
    statut: {
      type: String,
      enum: ["Confirmée", "En attente", "Annulée"],
      default: "En attente"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Reservation", reservationSchema);
