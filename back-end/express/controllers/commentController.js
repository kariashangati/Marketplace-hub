const Comment = require("../models/Comment");
const mongoose = require("mongoose")

const getProductComments = async (request,response) =>{
    try{
        const comments = await Comment.find({productId:parseInt(request.query.productId)}).sort({createdAt:-1});

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

const postComment = async (request,response) =>{
    try{
        const {commentContent,productId} = request.body;    

        const newComment = new Comment({commenterId:request.userId,
            commenterProfilePic:request.profile_picture,
            commenterUsername:request.username,
            productId:parseInt(productId),
            commentContent:commentContent,
        });

        await newComment.save();

        return response.json({
            "message" : "New comment posted!"
        });

    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}


const deleteComment = async (request,response) =>{
    try {
        const {commentId} = request.params;
        const userId = parseInt(request.userId);

        const comment = await Comment.findById(new mongoose.Types.ObjectId(commentId));

        if(!comment){
            return response.status(404).json({
                "message" : "Comment not found"
            });
        }
        
        if(comment.commenterId !== userId){
            return response.status(401).json({
                "message" : "Unauthorized to delete this comment" 
            });
        }

        await Comment.findByIdAndDelete(commentId);
        return response.json({
            "message" : "Comment deleted successfull!y"
        });

    } catch (error) {
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}

module.exports = {getProductComments,postComment,deleteComment};