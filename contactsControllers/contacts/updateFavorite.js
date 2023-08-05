const { Contact } = require("../../schema/index");

const updateFavorite = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    
    // Utiliza Mongoose para buscar y actualizar el contacto por su _id
    const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

    if (!result) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: `Contacto con el id ${contactId} no encontrado`,
      });
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    // Maneja cualquier error inesperado que pueda ocurrir durante el procesamiento de la solicitud
    console.error("Error al actualizar favorito:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "Error interno del servidor",
    });
  }
};

module.exports = updateFavorite;
