const Comment = require("../models/Comment");

const getProductComments = async (request,response) =>{
    try{
        const {productId} = parseInt(request.query);

        const comments = await Comment.find({productId:productId});
        if(comments){
            return response.json({
                "comments" : comments,
            });
        }else{
            return response.status(404).json({
                "message" : "No comments founded"
            });
        }
    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}


module.exports = {getProductComments};