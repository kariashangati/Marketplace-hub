const mongoose = require("mongoose")

const commentShema = new mongoose.Schema({
    commenterId : {type: Number, required: true},
    productId : {type: Number, required: true},
    commentContent : {type: String, required: true}
},{timestamps:true});

module.exports = mongoose.model("Comment",commentShema);