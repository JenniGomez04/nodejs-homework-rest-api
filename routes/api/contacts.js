const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');
const { joicontactSchema, favoriteJoiSchema } = require('../../schema/contactSchema')
const { contacts: ctrl } = require("../../contactsControllers/index");
const validateMiddleware = validation(joicontactSchema);

router.get('/', ctrlWrapper(ctrl.getAllContactsList));

router.get('/:contactId', ctrlWrapper(ctrl.getContact));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.createContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validation(joicontactSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
