const { User } = require("../../schema");
const ctrlWrapper = require("../ctrlWrapper");

const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.verify) {
    return res.status(400).json({ message: "Verification has already been passed" });
  }

  user.verify = true;
  user.verificationToken = null;
  await user.save();

  res.status(200).json({ message: "Verification successful" });
});

module.exports = verifyEmail;
