const Like = require("../models/Like");

const getProductLikes = async (request,response) =>{
    try{
        const likesCount = await Like.find({productIdLiked:parseInt(request.query.productId)}).countDocuments();

        if(likesCount){
            return response.json({
                'likes' : likesCount
            });
        }
    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}

const likeProduct = async (request,response) =>{
    try{
        const productId = parseInt(request.body.productId);

        const alreadyLiked = await Like.findOne({ productIdLiked: productId, likerId: request.userId});
          
        if (alreadyLiked) {
            await Like.deleteOne({ productIdLiked: productId, likerId: request.userId});
            return response.json({
                'message' : 'Already liked'
            });
        }

        const newLike = new Like({
            likerId:request.userId,
            productIdLiked:productId
        });

        await newLike.save();
        return response.json({
            'message' : 'successfully you liked the product',
            'success' : true
        })

    }catch(error){
        return response.status(500).json({
            "message" : error.message || "Try again later"
        })
    }
}

module.exports = {getProductLikes,likeProduct};