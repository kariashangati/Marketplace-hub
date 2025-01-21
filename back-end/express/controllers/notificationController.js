const Notification = require("../models/Notification");


const getNotifications = async (request,response) =>{
    try{
        const notifications = await Notification.find({receiverId:parseInt(request.userId)}).sort({createdAt:-1});

        if(notifications){
            return response.json({
                "notifications" : notifications ,
            })
        }else{
            return response.status(404).json({
                "message" : "No notification founded"
            });
        }
    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}

const postNotification = async (request,response) =>{
    try{
        const {notificationContent,productId,receiverId} = request.body ;

       
        const newNotification = new Notification({senderId:request.userId,
            senderProfilePic:request.profile_picture,
            senderUsername:request.username,
            productId,
            receiverId,
            notificationContent,
        });
        if(receiverId !== request.userId){
            await newNotification.save();
        }

        return response.json({
            "message" : "posted successfully"
        })
        
    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}


module.exports = {getNotifications,postNotification}