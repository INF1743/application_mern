import jwt from "jsonwebtoken";
import Utilisateur from "../modeles/Utilisateur.js";

export const authRequired = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer "))
    return res.status(401).json({ message: "Accès refusé." });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Utilisateur.findById(decoded.id).select("-motDePasse");
    next();
  } catch (e) {
    res.status(401).json({ message: "Token invalide." });
  }
};
