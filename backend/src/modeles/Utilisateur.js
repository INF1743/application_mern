import mongoose from "mongoose";
import bcrypt from "bcrypt";

const utilisateurSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true }
  },
  { timestamps: true }
);

utilisateurSchema.pre("save", async function (next) {
  if (!this.isModified("motDePasse")) return next();
  const salt = await bcrypt.genSalt(10);
  this.motDePasse = await bcrypt.hash(this.motDePasse, salt);
  next();
});

utilisateurSchema.methods.comparerMotDePasse = function (mdp) {
  return bcrypt.compare(mdp, this.motDePasse);
};

export default mongoose.model("Utilisateur", utilisateurSchema);
