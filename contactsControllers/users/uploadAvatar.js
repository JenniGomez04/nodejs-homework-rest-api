const fs = require('fs/promises');
const path = require('path');
const { User } = require('../../schema/index');
const Jimp = require('jimp');

const updateAvatar = async (req, response, next) => {
  try {
    const { userId } = req.user;

    if (!req.file) {
      return response.status(400).json({ message: 'No file uploaded' });
    }

    const { filename } = req.file;
    const avatarPath = path.join(__dirname, '../../public/avatars', filename);
    // const newFilename = 'avatar_' + userId + path.extname(filename);

    await Jimp.read(req.file.path)
      .then((avatar) => {
        return avatar
          .resize(250, 250)
          .write(avatarPath);
      })
      .catch((error) => {
        console.error(error);
      });

    await fs.rename(req.file.path, avatarPath);

    const user = await User.findByIdAndUpdate(userId, { avatarURL: `/avatars/${filename}` }, { new: true });

    response.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = updateAvatar;



