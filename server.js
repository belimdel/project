const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;  // Le port est défini dynamiquement ou 3000 par défaut.

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const corsOptions = {
    origin: 'https://belimdel.github.io/project/',  // Remplace par ton domaine GitHub Pages
    methods: ['GET', 'POST'],  // Méthodes autorisées
    allowedHeaders: ['Content-Type'],  // Headers autorisés
    optionsSuccessStatus: 200  // Pour compatibilité avec certains anciens navigateurs
};

// Route pour envoyer un email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    // Configuration du transporteur pour envoyer des emails via Gmail
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hmher866@gmail.com',  // Ton email
            pass: 'jtxtoxmjefdcamet'    // Ton mot de passe (évite de l'exposer)
        }
    });

    // Options de l'email
    let mailOptions = {
        from: 'hmher866@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    // Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erreur lors de l\'envoi de l\'email :', error);
            return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email' });
        }
        console.log('Email envoyé avec succès :', info.response);
        res.status(200).json({ message: 'Email envoyé avec succès', info });
    });
});

app.use(cors(corsOptions));

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Le serveur tourne sur http://localhost:${PORT} ou sur le port de déploiement`);
});
