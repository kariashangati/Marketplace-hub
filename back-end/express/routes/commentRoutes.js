const express = require("express");
const { getProductComments } = require("../controllers/commentController");

const router = express.Router();


router.get("/getComments/:productId",getProductComments);

module.exports = router;