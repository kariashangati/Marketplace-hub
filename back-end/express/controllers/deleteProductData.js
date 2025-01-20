const Comment = require("../models/Comment");
const Conversation = require("../models/Conversation");
const Like = require("../models/Like");
const Message = require("../models/Message");
const Notification = require("../models/Notification");

const deleteProductData = async (request,response) =>{
    try{
        const productDeleted = parseInt(request.body.productDeleted);

        await Comment.deleteMany({productId:productDeleted});
        await Notification.deleteMany({productId:productDeleted});
        await Like.deleteMany({productIdLiked:productDeleted});
        await Message.deleteMany({productId:productDeleted});

    }catch(error){
        return response.status(500).json({
            'message' : 'An error occured'
        })
    }
}


module.exports = {deleteProductData};