const bcrypt = require('bcryptjs');
const { User } = require('../../schema/index');

const signUp = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verifica si el correo ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      subscription: 'starter' // Valor predeterminado
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signUp;
