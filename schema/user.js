const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

const joiUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(8).required(),
  token: Joi.string(),
});

module.exports = {
  User: model("User", userSchema),
  joiUserSchema,
};
