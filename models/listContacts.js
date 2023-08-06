const { Contact } = require("../schema/index");

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    console.log(contacts);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    });
  } catch (error) {
    console.error("Error getting contacts:", error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal server error"
    });
  }
};

module.exports = listContacts;
