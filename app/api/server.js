const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "preneus11@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

app.post("/api/send-email", async (req, res) => {
  const { username } = req.body;

  const mailOptions = {
    from: "preneuscliford@gmail.com",
    to: "preneus11@gmail.com",
    subject: "Utilisateur Signalé",
    text: `L'utilisateur ${username} a été signalé pour des raisons spécifiques.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail envoyé avec succès");
    res.status(200).send("E-mail envoyé avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail", error);
    res
      .status(500)
      .send("Une erreur s'est produite lors de l'envoi de l'e-mail");
  }
});

app.listen(3001, () => {
  console.log("Serveur en cours d'écoute sur le port 3001");
});
