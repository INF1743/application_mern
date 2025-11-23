import Utilisateur from "../modeles/Utilisateur.js";
import jwt from "jsonwebtoken";

const genererToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const register = async (req, res) => {
  try {
    const { nom, email, motDePasse } = req.body;

    const existe = await Utilisateur.findOne({ email });
    if (existe)
      return res.status(400).json({ message: "Email déjà utilisé." });

    const user = await Utilisateur.create({ nom, email, motDePasse });

    res.status(201).json({
      user: { id: user._id, nom: user.nom, email: user.email },
      token: genererToken(user._id)
    });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const user = await Utilisateur.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur introuvable." });

    const ok = await user.comparerMotDePasse(motDePasse);
    if (!ok)
      return res.status(400).json({ message: "Mot de passe incorrect." });

    res.json({
      user: { id: user._id, nom: user.nom, email: user.email },
      token: genererToken(user._id)
    });
  } catch (e) {
    res.status(500).json({ message: "Erreur serveur." });
  }
};
