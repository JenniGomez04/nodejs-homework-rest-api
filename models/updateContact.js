const { fs, contactsPath } = require("./fsPromise");
const listContacts = require("./listContacts");

const updateContact = async (id, name, email, phone) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
};

module.exports = updateContact;