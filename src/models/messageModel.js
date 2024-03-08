const Joi = require("joi");
const mongoose = require("mongoose");

const Message = mongoose.model(
  "Message",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 255,
      },
      message: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 255,
        minlength: 5,
      },
      unread: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
function validateMessage(message) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required().min(5).max(255),
  });
  return schema.validate(message);
}
module.exports = { Message, validateMessage };
