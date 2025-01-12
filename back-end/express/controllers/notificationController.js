const Notification = require("../models/Notification");


const getNotifications = async (request,response) =>{
    const authenticatedUserId = request.id;
    return response.json({
        "id" : authenticatedUserId
    })
}

module.exports = {getNotifications}