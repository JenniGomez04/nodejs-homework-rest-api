const { User } = require("../../schema");
const ctrlWrapper = require("../ctrlWrapper");

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.verify = true;
  user.verificationToken = null;

  await user.save();

  res.status(200).json({ message: "Verification successful" });
});

module.exports = verifyEmail;
