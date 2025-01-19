const Comment = require("../models/Comment");
const Conversation = require("../models/Conversation");
const Like = require("../models/Like");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

const deleteUserDeletedData = async (request,response) =>{
    try{
        const userDeleted = parseInt(request.body.userDeleted);

        await Comment.deleteMany({commenterId:userDeleted});
        await Notification.deleteMany({receiverId:userDeleted});
        await Like.deleteMany({likerId:userDeleted});
        await Conversation.deleteMany({$or:[{user1Id:userDeleted},{user2Id:userDeleted},]});
        await Message.deleteMany({receiverId:userDeleted});

    }catch(error){
        return response.status(500).json({
            'message' : 'An error occured'
        })
    }
}


module.exports = {deleteUserDeletedData};