const auth = require("../middleware/autherization");
const autherize = require("../middleware/authAdmin");
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
router.get("/", [auth, autherize], getMessages); // get all messages endpoint
router.delete("/:id", [auth, autherize], deleteMessage); // Delete a message endpoint
router.get("/:id", [auth, autherize], getMessageById); // Get a message based on Id endpoint
router.post("/unread/:id", [auth, autherize], unreadMessage); //

module.exports = router;
