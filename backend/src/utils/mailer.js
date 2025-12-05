// backend/src/utils/mailer.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, // false = TLS STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envoie un email de confirmation au client
 * @param {Object} param0
 * @returns {Promise<void>}
 */
export async function envoyerMailReservation({ nomClient, emailClient, date, heure }) {
  try {
    const sujet = "Merci pour votre réservation !";

    const texte = `
Bonjour ${nomClient},

Votre séance pour le ${date} à ${heure} est confirmée 🎉

Nous avons hâte de vous rencontrer !

Cordialement,
Chelsea (Coach de vie)
`;

    const html = `
<p>Bonjour <b>${nomClient}</b>,</p>
<p>Votre séance pour le <b>${date}</b> à <b>${heure}</b> est <span style="color:green;font-weight:bold;">confirmée 🎉</span></p>
<p>Nous avons hâte de vous rencontrer.</p>
<br/>
<p>Cordialement,</p>
<p><b>Chelsea — Coach de vie</b></p>
`;

    // Envoi du mail
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"INF1743 Coaching" <${process.env.SMTP_USER}>`,
      to: emailClient,
      subject: sujet,
      text: texte,
      html: html,
    });

    console.log(`📧 Email envoyé à ${emailClient}`);

  } catch (error) {
    console.error("❌ Erreur envoi email :", error);
    throw new Error("Impossible d'envoyer l'email de réservation.");
  }
}
