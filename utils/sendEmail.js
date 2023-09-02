// Importa el módulo 'nodemailer', que permite enviar correos electrónicos.
const nodemailer = require("nodemailer");

// Importa el módulo 'dotenv' para cargar las variables de entorno desde un archivo .env.
require("dotenv").config();

// Obtiene las variables de entorno EMAIL_SENDER y EMAIL_PASSWORD definidas en el archivo .env.
const { EMAIL_SENDER, EMAIL_PASSWORD } = process.env;

// Crea un objeto 'mailTransporter' utilizando nodemailer para configurar el transporte de correo.
const mailTransporter = nodemailer.createTransport({
  service: "gmail", // Utiliza el servicio de Gmail para enviar correos.
  auth: {
    user: EMAIL_SENDER, // Utiliza el correo electrónico del remitente definido en las variables de entorno.
    pass: EMAIL_PASSWORD, // Utiliza la contraseña del remitente definida en las variables de entorno.
  },
});

// Define un objeto 'emailService' que contiene una función 'sendEmail'.
const emailService = {
  sendEmail(verificationToken) {
    // Utiliza el 'mailTransporter' para enviar un correo electrónico.
    mailTransporter.sendMail(
      {
        from: EMAIL_SENDER, // Establece el remitente del correo.
        to: "jennigomez040@gmail.com", // Establece el destinatario del correo.
        subject: "Authenticate your email", // Establece el asunto del correo.
        html: `<a href='http://localhost:3000/verify/${verificationToken}'>Verification email</a>`, // Establece el contenido HTML del correo, que incluye un enlace de verificación con el token proporcionado.
      },
      (err, data) => {
        if (err) {
          console.log(err); // Si hay un error al enviar el correo, se muestra en la consola.
          console.log("An error occurred"); // También muestra un mensaje de error.
        } else {
          console.log("Email sent successfully"); // Si el correo se envía con éxito, muestra un mensaje de éxito en la consola.
        }
      }
    );
  },
};

// Exporta el objeto 'emailService' para que pueda ser utilizado en otros módulos.
module.exports = emailService;
