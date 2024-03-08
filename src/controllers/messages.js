const { validateMessage, Message } = require("../models/messageModel");
const _ = require("lodash");

// Sending a message controller
const sendMessage = async (req, res) => {
  const { error } = validateMessage(req.body);
  if (error)
    return res
      .status(400)
      .json({ ok: false, message: error.details[0].message });
  try {
    const message = new Message(_.pick(req.body, ["name", "email", "message"]));
    await message.save();
    res.status(200).json({ ok: true, message });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};

// Get all messages
const getMessages = async (req, res) => {
  const messages = await Message.find().select("-__v");
  if (!messages)
    return res.status(400).json({ ok: false, message: "No Messages Found!" });

  res.status(200).json({ ok: true, messages });
};
// Get a message based on id
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).select(
      "name message _id unread"
    );
    if (!message)
      return res.status(400).json({ ok: false, message: "No message found" });

    res.status(200).json({ ok: true, message });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Delete a message
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message)
      return res.status(400).json({ ok: false, message: "No message found" });

    res.status(200).json({ ok: true, message: "Message dropped." });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error" });
  }
};
// Unread message
const unreadMessage = async (req, res) => {
  try {
    let message = await Message.findById(req.params.id).select("unread");
    if (message.unread) {
      message.unread = !message.unread;
      await message.save();
      res.status(200).json({ ok: true, message: "read", read: message.unread });
    }
    res.status(400).json({ ok: false, message: "Message already readed." });
  } catch (error) {
    res.status(500).json({ ok: false, message: "Internal Server Error." });
  }
};
module.exports = {
  sendMessage,
  getMessages,
  deleteMessage,
  getMessageById,
  unreadMessage,
};
