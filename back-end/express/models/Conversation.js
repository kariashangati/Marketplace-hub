const mongoose = require("mongoose")


const conversationShema = new mongoose.Schema({
    user1Id : {type:Number, required:true},
    user1ProfilePic : {type:String, required:true},
    user1Username : {type:String, required:true},
    user2Id : {type:Number, required:true},
    user2ProfilePic : {type:String, required:true},
    user2Username : {type:String, required:true},
    productId : {type:Number, required:true},
    lastMessage : {type:String},
},{timestamps:true});


module.exports = mongoose.model("Conversation",conversationShema);