const { Contact } = require("../../schema");

const createContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;


    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create contact" });
  }
};
