const { Contact } = require("../../schema/index");;

const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contactResult = await Contact.findById(contactId);
  if (!contactResult) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(contactResult);

};

module.exports = getContact;