const mongoose = require("mongoose")

const messageShema = new mongoose.Schema({
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    senderId : {type: Number, required:true},
    receiverId : {type: Number, required:true},
    productId : {type: Number},
    messageContent : {type: String, required: true},
},{timestamps:true});

module.exports = mongoose.model("Message",messageShema);