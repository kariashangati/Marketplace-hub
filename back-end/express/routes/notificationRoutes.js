const express = require("express");
const { getNotifications } = require("../controllers/notificationController");

const router = express.Router()

router.get("/getNotifications",getNotifications);

module.exports = router;