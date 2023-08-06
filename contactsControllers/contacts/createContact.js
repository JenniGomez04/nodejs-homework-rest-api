const { Contact } = require("../../schema");

const createContact = async (req, res) => {
  const result = await await Contact.create(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
};

module.exports = createContact;




