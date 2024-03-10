const asyncHandler = require("express-async-handler");
const { validateMessage, Message } = require("../models/messageModel");
const _ = require("lodash");

// Sending a message controller
const sendMessage = asyncHandler(async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });

  const message = new Message(_.pick(req.body, ["name", "email", "message"]));
  await message.save();
  res.status(200).json({ ok: true, message });
});

// Function to get all messages
const getMessages = asyncHandler(async (req, res) => {
  const messages = await Message.find().select("-__v");
  if (!messages)
    return res.status(400).json({ ok: false, message: "No Messages Found!" });

  res.status(200).json({ ok: true, messages });
});
// Function to get message based on Id
const getMessageById = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id).select(
    "name message _id unread"
  );
  if (!message)
    return res.status(400).json({ ok: false, message: "No message found" });

  res.status(200).json({ ok: true, message });
});
// Function to delete a message
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message)
    return res.status(400).json({ ok: false, message: "No message found" });

  res.status(200).json({ ok: true, message: "Message dropped." });
});
// Unread message
const unreadMessage = asyncHandler(async (req, res) => {
  let message = await Message.findById(req.params.id).select("unread");
  if (message.unread) {
    message.unread = !message.unread;
    await message.save();
    res.status(200).json({ ok: true, message: "read", read: message.unread });
  }
  res.status(400).json({ ok: false, message: "Message already readed." });
});
module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
  getMessageById,
  unreadMessage,
};
