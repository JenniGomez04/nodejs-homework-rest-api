const { Contact } = require("../../schema/index")

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  try {
    const contacts = await Contact.find({ owner });

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error",
    });
  }
};

module.exports = listContacts;