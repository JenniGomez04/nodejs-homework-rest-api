const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');
const { joicontactSchema } = require('../../schema/contactSchema')
const { contacts: ctrl } = require("../../contactsControllers/index");
const validateMiddleware = validation(joicontactSchema);

router.get('/', ctrlWrapper(ctrl.getAllContactsList));

router.get('/:contactId', ctrlWrapper(ctrl.getContact));

//router.post('/', validation(joicontactSchema), ctrlWrapper(ctrl.createContact));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.createContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validation(joicontactSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:contactId/favorite', validation(joicontactSchema), ctrlWrapper(ctrl.updateFavorite));

module.exports = router;
