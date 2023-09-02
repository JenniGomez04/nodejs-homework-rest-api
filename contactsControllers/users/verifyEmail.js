// Importa el modelo 'User' desde un directorio específico (presumiblemente, donde se encuentra la definición del modelo).
const { User } = require("../../schema");

// Importa un módulo llamado 'ctrlWrapper' que probablemente contenga una función para envolver controladores de ruta.
const ctrlWrapper = require("../ctrlWrapper");

// Define un controlador llamado 'verifyEmail' utilizando 'ctrlWrapper' para manejar la lógica de la ruta.
const verifyEmail = ctrlWrapper(async (req, res) => {
  // Obtiene el token de verificación del objeto 'params' en la solicitud HTTP.
  const { verificationToken } = req.params;

  // Busca un usuario en la base de datos que tenga el 'verificationToken' proporcionado.
  const user = await User.findOne({ verificationToken });

  // Si no se encuentra un usuario con el 'verificationToken' proporcionado, responde con un error 404 y un mensaje.
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Si se encuentra un usuario con el 'verificationToken', marca la propiedad 'verify' como verdadera y elimina el 'verificationToken'.
  user.verify = true;
  user.verificationToken = null;

  // Guarda los cambios en el usuario en la base de datos.
  await user.save();

  // Responde con un estado 200 (éxito) y un mensaje indicando que la verificación se ha realizado con éxito.
  res.status(200).json({ message: "Verification successful" });
});

// Exporta la función 'verifyEmail' para que pueda ser utilizada como controlador en una ruta de la aplicación.
module.exports = verifyEmail;
