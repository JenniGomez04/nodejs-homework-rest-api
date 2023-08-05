const { Contact }= require("../schema/index"); 

const addContact = async (name, email, phone) => {
  const newContact = new Contact({ name, email, phone });
  await newContact.save();
  return newContact;
};

module.exports = addContact;

