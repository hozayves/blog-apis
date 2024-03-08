const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  deleteMessage,
  getMessageById,
  unreadMessage,
} = require("../controllers/messages");

router.post("/", sendMessage); // sending a messsage endpoint
router.get("/", getMessages); // get all messages endpoint
router.delete("/:id", deleteMessage); // Delete a message endpoint
router.get("/:id", getMessageById); // Get a message based on Id endpoint
router.post("/unread/:id", unreadMessage); //

module.exports = router;
