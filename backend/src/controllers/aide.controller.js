import AideMessage from "../modeles/AideMessage.js";

/**
 * @route POST /api/aide
 * @desc Permet à un utilisateur d'envoyer un message d'aide
 * @access Public
 */
export const envoyerMessageAide = async (req, res) => {
  try {
    const { nom, email, message } = req.body;

    if (!nom || !email || !message) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont requis." });
    }

    await AideMessage.create({ nom, email, message });

    return res.status(201).json({
      message: "Message reçu. Nous vous répondrons dès que possible.",
    });
  } catch (err) {
    console.error("Erreur envoyerMessageAide:", err.message);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * @route GET /api/aide
 * @desc Lister tous les messages d'aide (admin/coach)
 * @access Privé (authRequired)
 */
export const listerMessagesAide = async (req, res) => {
  try {
    const messages = await AideMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (err) {
    console.error("Erreur listerMessagesAide:", err.message);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};

/**
 * @route PATCH /api/aide/:id/traiter
 * @desc Marquer un message comme traité
 * @access Privé (authRequired)
 */
export const marquerTraitre = async (req, res) => {
  try {
    const { id } = req.params;

    const msg = await AideMessage.findById(id);
    if (!msg) {
      return res.status(404).json({ message: "Message introuvable." });
    }

    msg.statut = "Traité";
    await msg.save();

    return res.json({
      message: "Message marqué comme traité.",
      msg,
    });
  } catch (err) {
    console.error("Erreur marquerTraitre:", err.message);
    return res.status(500).json({ message: "Erreur serveur." });
  }
};
