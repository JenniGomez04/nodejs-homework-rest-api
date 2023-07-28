const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "The name field is required" }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": "The email field is required",
      "string.email": "Enter a valid email address",
    }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "any.required": "The phone field is required",
      "string.pattern.base": "The phone must contain 10 digits",
    }),
});

module.exports = contactSchema;
