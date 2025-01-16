const mongoose = require("mongoose")

const commentShema = new mongoose.Schema({
    commenterId : {type: Number, required: true},
    commenterProfilePic : {type: String, rquired:true},
    commenterUsername : {type: String, required: true},
    productId : {type: Number, required: true},
    commentContent : {type: String, required: true, maxlength:300}
},{timestamps:true});

module.exports = mongoose.model("Comment",commentShema);