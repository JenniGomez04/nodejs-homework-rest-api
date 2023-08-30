const { Contact } = require("../schema/index");

const getContactById = async (id) => {
  try {
    const contactIds = await Contact.find({}, "id");

    const result = contactIds.find((contactId) => contactId.equals(id));

    return result;
  } catch (error) {
    return null;
  }
};

module.exports = getContactById;