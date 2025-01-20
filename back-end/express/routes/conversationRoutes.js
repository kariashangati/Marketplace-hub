const express = require("express");
const multer = require("multer");
const { getConversations, postConversation, searchConversations } = require("../controllers/conversationController");
const upload = multer();
const router = express.Router();

router.get("/getConversations",getConversations);
router.get("/searchConversations",searchConversations)
router.post("/postConversation",upload.none(),postConversation);
module.exports = router;