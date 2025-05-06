// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  // configura il transporter SMTP (usa variabili d’ambiente)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'walterantonelli95@gmail.com',
      subject: `Nuovo messaggio dal sito Occhialeriaantonlli.com da ${name}`,
      text: message,
      html: `<p>${message.replace(/\n/g, '<br>')}</p><p>Contatto: ${email}</p>`
    });
    console.log('Email inviata, id=', info.messageId);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Mail error', err);
    return res.status(500).json({ success: false, error: 'Impossibile inviare email' });
  }
}
