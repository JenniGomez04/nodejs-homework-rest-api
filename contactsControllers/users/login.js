const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../schema/index");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    await User.findByIdAndUpdate(user._id, { token });

    user.token = token;
    await user.save();

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
