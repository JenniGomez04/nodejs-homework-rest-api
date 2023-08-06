const { Contact } = require("../../schema");

const updateContactInfo = async (req, res) => {
  const { contactId } = req.params;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );

    if (!updatedContact) {
      throw new Error(`Id ${contactId} not found`);
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    console.error("Error updating contact:", error.message);
    return res.status(404).json({ message: "Contact not found" });
  }
};

module.exports = updateContactInfo;
