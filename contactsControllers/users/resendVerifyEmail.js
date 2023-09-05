const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { emailService } = require("../../utils");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if (user.verify) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verificationToken = uuidv4();
  user.verificationToken = verificationToken;

  await user.save();
  await emailService.sendEmail(verificationToken);

  res.status(200).json({ message: "Verification email sent" });
}

module.exports = resendVerifyEmail;


