const express = require("express");
const multer = require("multer")
const { getProductComments, postComment, deleteComment } = require("../controllers/commentController");
const upload = multer();
const router = express.Router();


router.get("/getComments",getProductComments);
router.post("/postComment",upload.none(),postComment);
router.delete("/deleteComment/:commentId",deleteComment);


module.exports = router;