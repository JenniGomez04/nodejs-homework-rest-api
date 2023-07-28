const express = require('express');
const router = express.Router();
const { validation, ctrlWrapper } = require('../../middlewares');
const { contactSchema } = require('../../schema');
const validateMiddleware = validation(contactSchema);
const { contacts: ctrl } = require("../../contactsControllers/index");


router.get('/', ctrlWrapper(ctrl.getAllContactsList));

router.get('/:contactId', ctrlWrapper(ctrl.getContact));

router.post('/', validateMiddleware, ctrlWrapper(ctrl.createContact));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateContact));

module.exports = router;

