# Occhialeria Antonelli - E-commerce di Occhiali da Sole

Benvenuto nel repository del progetto **Occhialeria Antonelli**, un sito e-commerce completo per la vendita di occhiali da sole personalizzati e di marca. Il progetto è sviluppato con **React**, **Redux**, **Tailwind CSS**, e utilizza **JSON statici** per la simulazione di database.

---

## 🚀 Funzionalità Principali

- Vetrina prodotti (con filtro per categoria e ricerca)
- Dettaglio prodotto
- Login/Registrazione utente (con gestione password in SHA256)
- Carrello con Redux
- Gestione ruoli (Customer/Admin)
- Pagina Servizi generata da JSON
- Pagina Chi Siamo (in modale)
- Pagina Contatti con form e Google Maps
- Invio email tramite Nodemailer e Gmail SMTP
- 404 Page Not Found

---

## 📦 Struttura del Progetto

```
src/
├── assets/
│   └── data/               # File JSON statici: prodotti, servizi, utenti
├── components/            # Componenti riutilizzabili (Header, Footer, ecc.)
├── pages/                 # Route principali (ServiziPage, ecc.)
├── redux/                 # Stato globale utente & carrello
└── utils/                 # hashPassword, userService, ecc.
```

---

## 🔧 Installazione

```bash
git clone https://github.com/tuo-utente/occhialeria-ecommerce.git
cd occhialeria-ecommerce
npm install
```

### Ambiente SMTP (opzionale per invio email)

Crea un file `.env.local` e inserisci:

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=tuo@gmail.com
SMTP_PASS=la-tua-app-password
```

> **Nota**: Gmail richiede l'autenticazione a due fattori attiva e la generazione di una **App Password**.

---

## ▶️ Avvio in sviluppo

```bash
npm run dev
```

---

## 📬 Invio Email Contatti

- Il form nella pagina Contatti invia i dati a `/api/contact`
- Backend gestito con Next.js API Route (`pages/api/contact.js`)
- Usa `nodemailer` per inviare l'email al tuo indirizzo configurato

---

## 📜 Licenza

Questo progetto è open-source e disponibile sotto la licenza MIT.

---

## 🙋‍♂️ Autore

**Walter Antonelli**  
[walterantonelli95@gmail.com](mailto:walterantonelli95@gmail.com)  
LinkedIn | Portfolio | GitHub

---
