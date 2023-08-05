const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    match: /^\d{10}$/,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });

const joicontactSchema = Joi.object({
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
  favorite: Joi.boolean().default(false),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing  field favorite" }),
});

const Contact = model("Contact", contactSchema);

module.exports = {
  Contact,
  joicontactSchema,
  favoriteJoiSchema,
};
