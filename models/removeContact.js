const { fs, contactsPath } = require('./fsPromise');
const listContacts = require('./listContacts');

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deletedContact;
};

module.exports = removeContact;
