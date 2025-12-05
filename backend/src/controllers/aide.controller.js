import AideMessage from "../modeles/AideMessage.js";

import { envoyerMailConfirmationAide } from "../utils/mailer.js";
 
// 📨 POST /api/aide  — un utilisateur envoie une demande d’aide

export const envoyerMessageAide = async (req, res) => {

  try {

    const { nom, email, message } = req.body;
 
    if (!nom || !email || !message) {

      return res

        .status(400)

        .json({ message: "Nom, email et message sont obligatoires." });

    }
 
    // Enregistrer dans MongoDB

    const aide = await AideMessage.create({

      nom,

      email,

      message

    });
 
    // Envoyer un mail de confirmation au client

    try {

      await envoyerMailConfirmationAide({ nom, email });

    } catch (err) {

      console.error("❌ Erreur lors de l’envoi du mail d’aide au client :", err);

      // On ne bloque pas la réponse pour une erreur de mail

    }
 
    return res.status(201).json({

      message:

        "Votre message a bien été envoyé. Vous recevrez un courriel de confirmation.",

      aide

    });

  } catch (err) {

    console.error("❌ ERREUR AIDE :", err);

    return res

      .status(500)

      .json({ message: "Erreur serveur lors de l’envoi du message." });

  }

};
 
// (Optionnel) GET /api/aide/messages — pour la page admin

export const listerMessagesAide = async (req, res) => {

  try {

    const messages = await AideMessage.find().sort({ createdAt: -1 });

    res.json(messages);

  } catch (err) {

    console.error("❌ ERREUR LISTE AIDE :", err);

    res

      .status(500)

      .json({ message: "Erreur serveur lors du chargement des messages." });

  }

};

 