const Message = require("../models/Message");


const deleteManyMessages = async (request,response) =>{
    console.log("the user will delete his messages is "+ request.senderId)
}

module.exports = {deleteManyMessages}