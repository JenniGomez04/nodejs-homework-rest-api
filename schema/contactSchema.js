const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "El campo nombre es obligatorio" }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "El campo correo electrónico es obligatorio",
      "string.email": "Ingrese un correo electrónico válido",
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "any.required": "El campo teléfono es obligatorio",
      "string.pattern.base": "El teléfono debe contener 10 dígitos",
    }),
});

module.exports = contactSchema;
