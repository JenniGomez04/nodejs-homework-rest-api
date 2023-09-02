const express = require('express');

const { validation, ctrlWrapper, authMiddleware } = require('../../middlewares');
const { users: usersCtrl } = require('../../contactsControllers');
const { joiUserSchema } = require('../../schema');
const { upload } = require('../../middlewares/index')

const router = express.Router();

router.post('/signUp', validation(joiUserSchema), ctrlWrapper(usersCtrl.signup));
router.get('/current', authMiddleware, ctrlWrapper(usersCtrl.current));
router.post('/login', validation(joiUserSchema), ctrlWrapper(usersCtrl.login));
router.get('/logout', authMiddleware, ctrlWrapper(usersCtrl.logout));
router.patch('/avatars', authMiddleware, upload.single('avatar'), ctrlWrapper(usersCtrl.uploadAvatar));

// Nuevas rutas para la verificación y el reenvío de correo electrónico
router.get("/verify/:verificationToken", ctrlWrapper(usersCtrl.verifyEmail)); // Ruta para la verificación de correo electrónico
router.post("/verify", ctrlWrapper(usersCtrl.resendVerifyEmail)); // Ruta para el reenvío de correo electrónico de verificación

module.exports = router;