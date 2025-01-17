const express = require("express");
const multer = require("multer")
const { getNotifications,postNotification } = require("../controllers/notificationController");
const upload = multer();
const router = express.Router()


router.get("/getNotifications",getNotifications);
router.post("/postNotification",upload.none(),postNotification);

module.exports = router;