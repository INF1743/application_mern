import mongoose from "mongoose";

const contenuSchema = new mongoose.Schema(
  {
    titre: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, 
    categorie: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Contenu", contenuSchema);
