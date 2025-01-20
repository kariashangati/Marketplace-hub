const Message = require("../models/Message");
const mongoose = require("mongoose");

const getMessages = async (request,response) =>{
    try{
        const {conversationId} = request.query;
        const messages = await Message.find({ conversationId }).sort({ createdAt: 1 });
        return response.status(200).json(messages);
    }catch(error){
        return response.status(500).json({
            'message' : error.message || "Try again later"
        })
    }
}

const postMessage = async (request,response) =>{
    try{
        const { conversationId, receiverId, productId, messageContent } = request.body;
        
        const message = new Message({
            conversationId,
            senderId : parseInt(request.userId),
            receiverId : parseInt(receiverId),
            productId : parseInt(productId),
            messageContent,
        });

        await message.save();
        return response.status(200).json({
            message : "Message sent successfully", 
            messageCon : message
        });

    }catch(error){
        return response.status(500).json({
            'message' : error.message || "Try again later"
        })
    }
}


const deleteMessage = async (request,response) =>{
    try{            
        
        const {messageId} = request.params;
        const userId = parseInt(request.userId);

        const message = await Message.findById(new mongoose.Types.ObjectId(messageId));

        if(!message){
            return response.status(404).json({
                "message" : "Message not found"
            });
        }
        
        if(message.senderId !== userId){
            return response.status(401).json({
                "message" : "Unauthorized to delete this comment" 
            });
        }

        await Message.findByIdAndDelete(messageId);
        return response.json({
            "message" : "Message deleted successfull!y"
        });
    }catch(error){
        return response.status(500).json({
            'message' : error.message || "Try again later"
        })
    }
}
module.exports = {getMessages, postMessage, deleteMessage};