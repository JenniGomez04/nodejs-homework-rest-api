const { Contact } = require("../schema/index");

const removeContact = async (id) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    return deletedContact;
  } catch (error) {
    return null;
  }
};

module.exports = { removeContact };
