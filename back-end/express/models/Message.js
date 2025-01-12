const mongoose = require("mongoose")

const messageShema = new mongoose.Schema({
    senderId : {type: Number, required:true},
    receiverId : {type: Number, required:true},
    messageContent : {type: String, required: true},
},{timestamps:true});

module.exports = mongoose.model("Message",messageShema);