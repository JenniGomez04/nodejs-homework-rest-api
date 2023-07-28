const { updateContact } = require('../../models/contacts');

const updateContactInfo = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const updatedContact = await updateContact(contactId, { name, email, phone });

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(updatedContact);
};

module.exports = updateContactInfo;
