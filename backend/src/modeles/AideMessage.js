import mongoose from "mongoose";

const aideMessageSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },

    // Statut du message (nouveau par défaut)
    statut: {
      type: String,
      enum: ["Nouveau", "Traité"],
      default: "Nouveau",
    },
  },
  {
    timestamps: true, // createdAt & updatedAt automatiquement
  }
);

export default mongoose.model("AideMessage", aideMessageSchema);
