const { Contact } = require("../../schema");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: contactId });

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact" });
  }
};

module.exports = deleteContact;