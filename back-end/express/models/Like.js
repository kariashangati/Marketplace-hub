const mongoose = require("mongoose")

const likeShema = new mongoose.Schema({
    likerId : {type: Number,required: true},
    productIdLiked : {type: Number, required: true},
});

module.exports = mongoose.model("Like",likeShema);