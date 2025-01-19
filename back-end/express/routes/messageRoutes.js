const express = require("express");
const multer = require("multer");
const { getMessages, deleteMessage, postMessage } = require("../controllers/messageController");
const upload = multer();
const router = express.Router();

router.get("/getMessages",getMessages);
router.post("/postMessage",upload.none(),postMessage);
router.delete("/deleteMessage/:messageId",deleteMessage)
module.exports = router;