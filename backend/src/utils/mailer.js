import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function envoyerMailReservation({ nomClient, emailClient, date, heure }) {
  const sujet = "Merci pour votre réservation !";

  const texte = `
Bonjour ${nomClient},

Votre séance pour le ${date} à ${heure} est confirmée 🎉

Nous avons hâte de vous rencontrer !

Cordialement,
Chelsea (Coach de vie)
`;

  const html = `
<p>Merci pour votre réservation !</p>
<p>Bonjour ${nomClient},</p>
<p>Votre séance pour le <b>${date}</b> à <b>${heure}</b> est confirmée 🎉</p>
<p>Nous avons hâte de vous rencontrer !</p>
<br/>
<p>Cordialement,</p>
<p>Chelsea (Coach de vie)</p>
`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || `"INF1743 Coaching" <${process.env.SMTP_USER}>`,
    to: emailClient,
    subject: sujet,
    text: texte,
    html: html,
  });
}
