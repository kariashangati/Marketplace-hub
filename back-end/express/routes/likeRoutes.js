const express = require("express");
const multer = require("multer");
const { likeProduct, getProductLikes } = require("../controllers/likeController");
const upload = multer();
const router = express.Router();

router.get("/getProductLikes",getProductLikes);
router.post("/likeProduct",upload.none(),likeProduct);

module.exports = router;