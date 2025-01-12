const mongoose = require("mongoose");

const notificationShema = new mongoose.Schema({
    senderId : {type:Number, required:true},
    receiverId : {type:Number, required:true},
    notificationContent : {type:String, required:true},
},{timestamps:true});

module.exports = mongoose.model("Notification",notificationShema);