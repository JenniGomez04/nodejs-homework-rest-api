const { v4: uuidv4 } = require("uuid");
const { addContact } = require("../../models/contacts");

const createContact = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name) {
    return res.status(400).json({ message: "missing required name field" });
  }

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  await addContact(newContact);

  res.status(201).json(newContact);
};

module.exports = createContact;
