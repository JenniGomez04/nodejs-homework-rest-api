const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../schema/index');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Busca al usuario por correo electrónico
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Compara las contraseñas
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    // Genera un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Guarda el token en el usuario y responde
    user.token = token;
    await user.save();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
