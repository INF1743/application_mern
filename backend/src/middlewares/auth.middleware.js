import jwt from "jsonwebtoken";
import Utilisateur from "../modeles/Utilisateur.js";

export const authRequired = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant." });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Charger l'utilisateur complet
    const user = await Utilisateur.findById(decoded.id).select("-motDePasse");

    if (!user) {
      return res.status(401).json({ message: "Utilisateur introuvable." });
    }

    req.user = user; // ⬅️ Maintenant req.user._id existe
    next();
  } catch (err) {
    console.error("❌ ERREUR AUTH :", err);
    return res.status(401).json({ message: "Token invalide." });
  }
};
