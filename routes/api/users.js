const express = require('express');

const { validation, ctrlWrapper, authMiddleware } = require('../../middlewares');
const { users: usersCtrl } = require('../../contactsControllers');
const { joiUserSchema } = require('../../schema');

const router = express.Router();

router.post('/signUp', validation(joiUserSchema), ctrlWrapper(usersCtrl.signup));
router.get('/current', authMiddleware, ctrlWrapper(usersCtrl.current));
router.post('/login', validation(joiUserSchema), ctrlWrapper(usersCtrl.login));
router.get('/logout', authMiddleware, ctrlWrapper(usersCtrl.logout));

module.exports = router;
