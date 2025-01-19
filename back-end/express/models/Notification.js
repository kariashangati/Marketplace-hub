const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema({
    senderId : {type:Number},
    senderProfilePic : {type: String},
    senderUsername : {type: String},
    productId : {type: String, required:true},
    receiverId : {type:Number, required:true},
    notificationContent : {type:String, required:true},
    createdAt: { type: Date, default: Date.now, index: { expires: '10d' } }
});

module.exports = mongoose.model("Notification",notificationShema);