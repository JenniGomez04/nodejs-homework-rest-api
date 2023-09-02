const bcrypt = require("bcryptjs");
const { User } = require("../../schema/index");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const avatarURL = gravatar.url(email, {
      s: "250",
      d: "identicon",
      r: "pg",
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Genera un nuevo verificationToken
    const verificationToken = uuidv4();

    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription: "starter",
      avatarURL,
      verificationToken,
    });

    // Envía el correo electrónico de verificación
    emailService.sendEmail(verificationToken); // Utiliza el servicio de envío de correo electrónico

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
