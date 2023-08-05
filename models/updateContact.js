
const { Contact } = require('../schema/index');

const updateContact = async (id, name, email, phone) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone },
      { new: true }
    );
    console.log(updatedContact);
    return updatedContact;
  } catch (error) {
    return null;
  }
};

module.exports = { updateContact };



