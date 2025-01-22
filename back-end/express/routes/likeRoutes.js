const express = require("express");
const multer = require("multer");
const { likeProduct, getProductLikes, productAlreadyLiked } = require("../controllers/likeController");
const upload = multer();
const router = express.Router();

router.get("/getProductLikes",getProductLikes);
router.get("/productAlreadyLiked",productAlreadyLiked);
router.post("/likeProduct",upload.none(),likeProduct);

module.exports = router;