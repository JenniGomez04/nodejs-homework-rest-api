const express = require('express');

const { validation, ctrlWrapper, authMiddleware } = require('../../middlewares');
const { joicontactSchema, favoriteJoiSchema } = require('../../schema/contactSchema');
const { contacts: ctrl } = require("../../contactsControllers/index");

const router = express.Router();

router.get('/', authMiddleware, ctrlWrapper(ctrl.getAllContactsList));
router.get('/:contactId', ctrlWrapper(ctrl.getContact));
router.post('/', authMiddleware, validation(joicontactSchema), ctrlWrapper(ctrl.createContact));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));
router.put('/:contactId', validation(joicontactSchema), ctrlWrapper(ctrl.updateContact));
router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;

