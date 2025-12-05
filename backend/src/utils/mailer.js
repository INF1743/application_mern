import nodemailer from "nodemailer";
 
const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,

  port: process.env.SMTP_PORT,

  auth: {

    user: process.env.SMTP_USER,

    pass: process.env.SMTP_PASS

  }

});
 
// =======================

// 📩 Réservation : mail à l’admin

// =======================

export const envoyerMailAdminReservation = async ({

  nomClient,

  emailClient,

  date,

  heure,

  type

}) => {

  await transporter.sendMail({

    from: `"Nouveau rendez-vous" <${process.env.SMTP_USER}>`,

    to: process.env.EMAIL_ADMIN,

    subject: "📅 Nouvelle réservation confirmée",

    html: `
<h2>Nouvelle réservation confirmée</h2>
<p><strong>Client :</strong> ${nomClient}</p>
<p><strong>Email :</strong> ${emailClient}</p>
<p><strong>Date :</strong> ${date}</p>
<p><strong>Heure :</strong> ${heure}</p>
<p><strong>Type :</strong> ${type}</p>

    `

  });

};
 
// =======================

// 📩 Réservation : mail au client

// =======================

export const envoyerMailConfirmationClient = async ({

  nomClient,

  emailClient,

  date,

  heure,

  type

}) => {

  if (!emailClient) return;
 
  await transporter.sendMail({

    from: `"Chelsea Coaching" <${process.env.SMTP_USER}>`,

    to: emailClient,

    subject: "✨ Votre rendez-vous est confirmé",

    html: `
<h2>Bonjour ${nomClient},</h2>
<p>Merci pour votre confiance.</p>
<p>Votre rendez-vous est bien confirmé avec <strong>Chelsea Coaching</strong>.</p>
 
      <p><strong>Date :</strong> ${date}</p>
<p><strong>Heure :</strong> ${heure}</p>
<p><strong>Type de rendez-vous :</strong> ${type}</p>
 
      <p>Si vous avez une question avant la séance, vous pouvez répondre directement à ce courriel.</p>
 
      <p>À très bientôt,<br>

      Chelsea</p>

    `

  });

};
 
// =======================

// 📩 Aide : mail de confirmation au client

// =======================

export const envoyerMailConfirmationAide = async ({ nom, email }) => {

  if (!email) return;
 
  await transporter.sendMail({

    from: `"Chelsea Coaching" <${process.env.SMTP_USER}>`,

    to: email,

    subject: "📬 Nous avons bien reçu votre message",

    html: `
<h2>Bonjour ${nom || "cher client"},</h2>
<p>Merci d'avoir pris contact avec <strong>Chelsea Coaching</strong>.</p>
<p>Nous avons bien reçu votre message et nous vous répondrons dès que possible.</p>
 
      <p>En attendant, merci pour votre confiance.</p>
 
      <p>Chaleureusement,<br>

      Chelsea</p>

    `

  });

};

 
