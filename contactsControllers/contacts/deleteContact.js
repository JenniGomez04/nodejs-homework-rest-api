
const { removeContact } = require('../../models/contacts');

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);

  if (!deletedContact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json({ message: 'contact deleted' });
};

module.exports = deleteContact;
