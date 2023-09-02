// Importa el modelo de usuario desde el archivo "models"
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");

// Define la función "resendVerifyEmail" que manejará la lógica de reenvío de correo electrónico de verificación
const resendVerifyEmail = async (req, res) => {
  // Obtiene el campo "email" del cuerpo de la solicitud
  const { email } = req.body;

  // Verifica si el campo "email" está presente en la solicitud
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  // Busca un usuario en la base de datos que coincida con el correo electrónico proporcionado
  const user = await User.findOne({ email });

  // Si no se encuentra un usuario con ese correo electrónico, responde con un error
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Verifica si el usuario ya ha pasado por el proceso de verificación
  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  // Genera un nuevo token de verificación utilizando uuidv4
  const verificationToken = uuidv4();

  // Actualiza el campo "verificationToken" en el documento del usuario
  user.verificationToken = verificationToken;

  // Guarda los cambios en el documento del usuario
  await user.save();

  // Simula el envío de correo electrónico de verificación (debes implementar tu propia función de envío de correo electrónico)
  simulateEmailSending(verificationToken);

  // Responde con un mensaje de éxito
  res.status(200).json({ message: "Verification email sent" });
}

// Exporta la función "resendVerifyEmail" para que esté disponible en otros módulos
module.exports = resendVerifyEmail;

// Función de simulación de envío de correo electrónico (debes implementar tu propia función)
function simulateEmailSending(verificationToken) {
  console.log("Simulating email sending...");
  console.log("Verification Token:", verificationToken);
  // Aquí deberías implementar la lógica real de envío de correo electrónico
}



// Importa el modelo de usuario desde el archivo "schema"
// const { User } = require("../../schema");

// // Importa el middleware "ctrlWrapper" que envuelve una función asincrónica
// const ctrlWrapper = require("../ctrlWrapper");

// // Importa el servicio de envío de correo electrónico desde el archivo "service" en la carpeta "utils"
// const emailService = require("../../utils/sendEmail");

// // Define la función "resendVerifyEmail" que manejará la lógica de reenvío de correo electrónico de verificación
// const resendVerifyEmail = ctrlWrapper(async (req, res) => {
//   // Obtiene el campo "email" del cuerpo de la solicitud
//   const { email } = req.body;

//   // Verifica si el campo "email" está presente en la solicitud
//   if (!email) {
//     return res.status(400).json({ message: "missing required field email" });
//   }

//   // Busca un usuario en la base de datos que coincida con el correo electrónico proporcionado
//   const user = await User.findOne({ email });

//   // Si no se encuentra un usuario con ese correo electrónico, responde con un error
//   if (!user) {
//     return res.status(400).json({ message: "User not found" });
//   }

//   // Verifica si el usuario ya ha pasado por el proceso de verificación
//   if (user.verify) {
//     return res.status(400).json({ message: "Verification has already been passed" });
//   }

//   // Genera un nuevo token de verificación y actualiza el campo "verificationToken" en el documento del usuario
//   const verificationToken = generateVerificationToken(); // Implementa la generación del token (puede usar uuid o nanoid)

//   user.verificationToken = verificationToken;
  
//   // Guarda los cambios en el documento del usuario
//   await user.save();

//   // Envía un correo electrónico de verificación al usuario utilizando el servicio de envío de correo electrónico
//   emailService.sendEmail(verificationToken);

//   // Responde con un mensaje de éxito
//   res.status(200).json({ message: "Verification email sent" });
// });

// // Exporta la función "resendVerifyEmail" para que esté disponible en otros módulos
// module.exports = resendVerifyEmail;
